import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { pink, red, blue, green } from '@mui/material/colors';
import Leaflet from 'leaflet'






class Map extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      lat:48.85684313434485,
      lng:2.342601532133899,
      map:{}
    }
  }
   handleClick(e)
  {
    this.state.lat=e.latlng.lat;
    this.state.lng=e.latlng.lng;
    this.state.map.target.flyTo([this.state.lat,this.state.lng],16);
    console.log(this.state.map);
  }

  reset()
  {
    this.state.lat=48.85684313434485;
    this.state.lng=2.342601532133899;
    
    this.state.map.target.setView([this.state.lat,this.state.lng],12);
  }

  render() {

    return (
      <MapContainer center={[this.state.lat,this.state.lng]} zoom={12} scrollWheelZoom={false} whenReady={map => this.setState({ map:map })}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.dates.map((object, i)=> {
         
          var markerHtmlStyles = `
          background-color: ${this.chooseColor(i+1).color[500]};
          width: 3rem;
          height: 3rem;
          display: block;
          left: -1.5rem;
          top: -1.5rem;
          position: relative;
          border-radius: 3rem 3rem 0;
          transform: rotate(45deg);
          border: 1px solid #FFFFFF`
          var icon = Leaflet.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            popupAnchor: [0, -36],
            html: `<span style="${markerHtmlStyles}" />`
          })
       
          return (
            <Marker number={i+1} icon={icon} position={[object.geopoint.latitude, object.geopoint.longitude]} eventHandlers={{
              click: this.handleClick.bind(this),
            }}>
            </Marker>
          )
        })}
      </MapContainer>


    );
  }
  chooseColor(number)
  {
    switch (number) {
      case 1:
        return { color: pink };
      case 2:
        return { color: red };
      case 3:
        return { color: blue };
      case 4:
        return { color: green };

    }
  }

}

 

export default Map;