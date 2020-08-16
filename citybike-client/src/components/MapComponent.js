import React, { Component, Fragment } from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer } from "react-leaflet";
import GroupMarkersComponent from "./GroupMarkersComponent";
import AddToHistory from "../actions/Actions";

class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      lat: 25.790654,
      lng: -80.1300455,
      zoom: 13,
      markers: [],
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", this.socketResponse);
  }
  socketResponse = (data) => {
    const { stations } = data;
    let newMarkers = [];
    stations.map((element) => {
      newMarkers.push({
        key: element.id,
        name: element.name,
        position: [element.latitude, element.longitude],
        empty_slots: element.empty_slots,
        free_bikes: element.free_bikes,
      });
    });
    this.setState({ markers: newMarkers });
  };
  render() {
    const { markers } = this.state;
    const position = [this.state.lat, this.state.lng];
    return (
        <div className="map">
          <h1> City Bikes in Miami </h1>
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GroupMarkersComponent list={markers} />
          </Map>
        </div>
    );
  }
}
export default MapComponent;
