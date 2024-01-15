import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "./db";

function App() {
  const [BFSightings, setBFSightings] = useState([]);

  // pull data from localhost 3000
  // use async and await
  useEffect(() => {
    const bigfootdata = async () => {
      try {
        const response = await axios.get(`${backendURL}/sightings/`);
        const bigFootData = response.data;
        // store data in states
        setBFSightings(bigFootData);
        console.log(`bigfoot sightings`, bigFootData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    bigfootdata();
  }, []);

  //display all sightings
  const SightingsList = ({ sightings }) => (
    <ul>
      {sightings.map((sighting, index) => (
        <li key={index}>
          <strong>Sighting {index + 1}:</strong>
          <ul>
            <li>
              <strong>Date: </strong> {sighting.DATE} {sighting.MONTH},{" "}
              {sighting.YEAR}
            </li>
            <li>
              <strong>Season:</strong> {sighting.SEASON}
            </li>
            <li>
              <strong>Location:</strong> {sighting.LOCATION_DETAILS},{" "}
              {sighting.STATE}
            </li>
            <li>
              <strong>Observation:</strong> {sighting.OBSERVED}
            </li>
            <br />
          </ul>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h1>Bigfoot Frontend </h1>
      <div className="card">
        <h3>Bigfoot Sightings</h3>
        <SightingsList sightings={BFSightings} />
      </div>
    </>
  );
}

export default App;
