import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


class User extends Component {
  position = [51.505, -0.09];
  fullname="";

  constructor(props) {
    super(props);

    this.position=[props.positionlat,props.positionlng];
    this.fullname=props.lastname+" "+props.firstname;
  }

  render() {

    const position = this.position;
    const fullname = this.fullname;
    return (
      <MapContainer style={{ width: '400px' }} center={position} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {fullname}
          </Popup>
        </Marker>
      </MapContainer>
    )
  }
}

export default User;

