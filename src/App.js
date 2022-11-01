import './App.css';
import React from 'react';
import { Autocomplete, Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import MetroAutoComplete from './MetroAutoComplete';
import CardDate from './CardDate';
import Map from './Map';
import { pink, red, blue, green } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import * as turf from '@turf/turf'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';

const dataDate = require("./output.json");
const apiResponse = require("./apiResponse.json");

const theme = createTheme({
  palette: {
    primary: { main: '#f03861', },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dates: [], datesListSelected: [], search: false };
    this.calculateDates();
    this.station1 = React.createRef();
    this.station2 = React.createRef();
    this.map = React.createRef();
  }
  render() {
    let buttonIcon;
    if (!this.state.search)
      buttonIcon = <SearchIcon></SearchIcon>;
    else
      buttonIcon = <RefreshIcon></RefreshIcon>;

    return (
      <div className="App">
        <ThemeProvider theme={theme}>


          <Grid container style={{ height: '100vh' }}>
            <Grid container sx={{ minHeight: '5%' }}>
              <Grid item xs={12} md={1}>
                <img src='./logo.png' height='100px'></img>

              </Grid>
              <Grid item xs={12} md={11} sx={{ textAlign: 'left' }}>
                <Typography variant="h3" component="h1">
                  Datin'Paris
                </Typography>
                <Typography variant="body">
                  Datin'Paris : Essayez notre nouvelle application de rencontre : Des idées de rendez-vous générées instantanément pour vous et votre partenaire, gratuitement.<br /> Vous cherchez l'inspiration ? Saisissez simplement deux stations de métro parisiennes et nous trouverons une activité amusante à mi-chemin entre les deux.
                </Typography>
              </Grid>

            </Grid>
            <Grid container spacing={6} sx={{ minHeight: '18%' }}>
              <Grid item md={6} xs={12}>
                <Box sx={{ minWidth: 275 }}>
                  <MetroAutoComplete ref={this.station1} />
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box sx={{ minWidth: 275 }}>
                  <MetroAutoComplete ref={this.station2} />
                </Box>
              </Grid>
              <Grid item xs={12} >
                <Button variant="contained" onClick={this.handleClick.bind(this)}>Rechercher {buttonIcon} </Button>
              </Grid>
            </Grid>
            <Grid container >

            </Grid>
            <Grid container spacing={6} sx={{ minHeight: '60%' }}>
              <Grid item md={6} xs={12} sx={{ minHeight: '100%' }}>
                <Map dates={this.state.dates} ref={this.map} />
              </Grid>
              <Grid item md={6} xs={12} className="">
                <Stack>
                  <CardDate number={1} item xs={6} date={this.state.dates[0]} />
                  <CardDate number={2} item xs={6} date={this.state.dates[1]} />
                  <CardDate number={3} item xs={6} date={this.state.dates[2]} />
                  <CardDate number={4} item xs={6} date={this.state.dates[3]} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }


  calculateDates() {

    this.state.dates[0] = dataDate[Math.floor(Math.random() * dataDate.length)];
    this.state.dates[1] = dataDate[Math.floor(Math.random() * dataDate.length)];
    this.state.dates[2] = dataDate[Math.floor(Math.random() * dataDate.length)];
    this.state.dates[3] = dataDate[Math.floor(Math.random() * dataDate.length)];
  }


  handleClick(e) {


    if(this.state.search)
    {
      var datesListSelected = this.state.datesListSelected;
      this.setState({
        dates: [datesListSelected[Math.floor(Math.random() * datesListSelected.length)],
        datesListSelected[Math.floor(Math.random() * datesListSelected.length)],
        datesListSelected[Math.floor(Math.random() * datesListSelected.length)],
        datesListSelected[Math.floor(Math.random() * datesListSelected.length)]]
      });
      return;
    }
    this.state.search = true;
    

    //appel a l'API
    var bodyFormData = new FormData();

    bodyFormData.append('X1', this.station1.current.state.choosenMetro.long);
    bodyFormData.append('X2', this.station2.current.state.choosenMetro.long);
    bodyFormData.append('Y1', this.station1.current.state.choosenMetro.lat);
    bodyFormData.append('Y2', this.station2.current.state.choosenMetro.lat);
    console.log(bodyFormData);
    var config = {
      method: 'post',
      url: 'https://datinparis.herokuapp.com/login',
      headers: { "Content-Type": "multipart/form-data" },
      data: bodyFormData
    };

    axios(config).then((response) => {
      console.log(response);
      var apiResponse = response.data;
      for (var j = 0; j < apiResponse.length; j++) {
        var isochrone=JSON.parse(apiResponse[j]);

        var polygonZone = turf.multiPolygon(isochrone.features);

        var metrosListSelected = [];
        var datesListSelected = this.state.datesListSelected;
        var stationsMetro = this.station1.current.state.stationsMetro;
        // console.log(polygonZone.geometry.coordinates[0]);
        for (var metro of stationsMetro) {

          var pointMetro = turf.point([metro.long, metro.lat]);
          // console.log(polygonZone.geometry.coordinates[0]);
          // console.log(pointMetro);
          for (var i = 0; i < polygonZone.geometry.coordinates.length; i++) {
            var inPolygon = turf.pointsWithinPolygon(pointMetro, polygonZone.geometry.coordinates[i]);
            if (inPolygon.features.length > 0)
              metrosListSelected.push(metro);
          }

        }
        console.log(metrosListSelected);

        for (var date of dataDate) {
          for (var i = 0; i < metrosListSelected.length; i++) {
            if (date.metros.includes(metrosListSelected[i].id))
              datesListSelected.push(date);
          }

        }
        this.state.datesListSelected = datesListSelected;
       console.log(datesListSelected);


        if(this.state.datesListSelected.length>8 || j == apiResponse.length-1)
        {
          console.log(j);
          
          this.setState({
            dates: [datesListSelected[Math.floor(Math.random() * datesListSelected.length)],
            datesListSelected[Math.floor(Math.random() * datesListSelected.length)],
            datesListSelected[Math.floor(Math.random() * datesListSelected.length)],
            datesListSelected[Math.floor(Math.random() * datesListSelected.length)]]
          });
          
          this.map.current.reset();
          break;
        }
       
      }

    });
    //retour GEOJSON intersection

  }
}

export default App;
