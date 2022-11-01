import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, Chip, Badge, Box, IconButton, Link } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { pink, red, blue, green } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
class CardDate extends React.Component {


  constructor(props) {
    super(props);
    switch (this.props.number) {
      case 1:
        this.state = { color: pink };
        break;
      case 2:
        this.state = { color: red };
        break;
      case 3:
        this.state = { color: blue };
        break;
      case 4:
        this.state = { color: green };
        break;

    }

  }


  render() {
    let color='#F5D97D';
    let colorPhone = 'primary';
    let colorWebsite = 'primary';
    if(this.props.number%2==0)
      color='#FEF1F2';
      
    if(this.props.date.googleExportDataResult.result.website==undefined || this.props.date.googleExportDataResult.result.website=='')
      colorWebsite='disabled';
    
    if(this.props.date.googleExportDataResult.result.international_phone_number==undefined || this.props.date.googleExportDataResult.result.international_phone_number=='')
      colorPhone='disabled';

    return (
      <Card sx={{ maxWidth: '100%', display:'flex',backgroundColor:color }}>
        <Box sx={{width:"20%"}}>
          <CardMedia
            component="img"
            height="140px"
            width="140px"
            image={this.props.date.photo}
            alt="green iguana"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column',flexGrow:"4",textAlign:"left" }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h5" component="span">
              {this.props.date.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary"sx={{display:'flex'}}>
              <PlaceIcon sx={{ color: this.state.color[500] }}></PlaceIcon>
              <span style={{display:'flex',alignSelf:'center'}}>{this.props.date.googleExportDataResult.result.formatted_address}</span>
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ height:"100%", display:"flex", alignSelf:'flex-end'}}>
          <CardActions>
            <Link target="_blank" href={this.props.date.googleExportDataResult.result.website} ><LanguageIcon color={colorWebsite}></LanguageIcon></Link>
            <Link target="_blank" href={"tel:"+this.props.date.googleExportDataResult.result.international_phone_number}><PhoneIcon color={colorPhone}></PhoneIcon></Link>
       
          </CardActions>
        </Box>



      </Card>

    );
  }


}

export default CardDate;