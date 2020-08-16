import React from "react";

export default function TableComponent({ list }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Availability</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>{strToTr(list.sort((x, y) => y.free_bikes - x.free_bikes))}</tbody>
    </table>
  );
}
const strToTr = list => {
  return list.map((element) => {
    return (
      <tr key={element.key} position={element.position}>
          <td>{element.name}</td>
          <td>
            Availability: {element.free_bikes}
          </td>
          <td>
            Amount: {element.empty_slots + element.free_bikes}
          </td>
      </tr>
    );
  });
};
