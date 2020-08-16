import React, { Component} from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import { Map, TileLayer } from "react-leaflet";
import GroupMarkersComponent from "./GroupMarkersComponent";
import AddToHistory, { setDate } from "../actions/Actions";
import {
  getHistory,
  getMarkersDataFromDates,
} from "../reducers/HistoryReducer";
import TableComponet from "./TableComponent";
import Select from "react-select";
import NoDataComponent from './NoDataComponent'
import "./style.css";
class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001",
      lat: 25.790654,
      lng: -80.1300455,
      zoom: 13,
      valueSelect: null
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", this.socketResponse);
  }
  socketResponse = (data) => {
    const date = new Date();
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
    this.props.setHistory({ date, markers: newMarkers });
  };
  handleChange = (value) => {
    this.setState({valueSelect: value})
    this.props.setDate(value.value);
  };
  handleClick = () =>{
    this.props.setDate(null);
    this.setState({valueSelect: null})
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    const { dates, getMarkersDataFromDates } = this.props;
    const data = (getMarkersDataFromDates) ? {markers: getMarkersDataFromDates} : dates.length > 0 ? dates[dates.length - 1] : null;

    return ((data) ? <div>
        <div className="header">
          <h1> City Bikes in Miami </h1>
        </div>
        <div className="select">
          <label>History</label>
          <Select value={this.state.valueSelect} options={dates} onChange={this.handleChange}></Select>
          <button disabled={(getMarkersDataFromDates) ? false: true} onClick={this.handleClick}>Clear</button>
        </div>
        <div className="content">
          <div className="map">
            <Map center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GroupMarkersComponent list={data.markers} />
            </Map>
          </div>
          <div className="content-table">
            <TableComponet list={data.markers}></TableComponet>
          </div>
        </div>
      </div>: <NoDataComponent/>
      
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setHistory: (value) => dispatch(AddToHistory(value)),
  setDate: (value) => dispatch(setDate(value)),
});
const mapStateToProps = (state) => ({
  dates: getHistory(state),
  getMarkersDataFromDates: getMarkersDataFromDates(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
