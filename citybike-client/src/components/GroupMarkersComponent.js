import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function GroupMarkersComponent({ list }) {
  return list.map((element) => {
    return (
      <Marker key={element.key} position={element.position}>
        <Popup>
          <b>{element.name}</b>
          <br />
          <span>
            Availability: <code>{element.free_bikes}</code>
          </span>
          <br />
          <span>
            Amount: <code>{element.empty_slots + element.free_bikes}</code>
          </span>
        </Popup>
      </Marker>
    );
  });
}
