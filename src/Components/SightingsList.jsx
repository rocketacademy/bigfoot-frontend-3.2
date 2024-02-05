import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { BACKEND_URL } from "../constants.jsx";

export default function SightingsList() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setSightings(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Year</th>
            <th>Season</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {sightings.map((sighting, index) => (
            <tr key={sighting.data}>
              <td>{index}</td>
              <td>{sighting.YEAR}</td>
              <td>{sighting.SEASON}</td>
              <td>{sighting.MONTH}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
