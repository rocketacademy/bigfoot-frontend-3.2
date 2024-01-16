import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../db";
import { useParams } from "react-router-dom";

function Sightings() {
  const [BFSightings, setBFSightings] = useState([]);

  const { sightingIndex } = useParams();
  console.log("page id", sightingIndex);

  // pull data from localhost 3000
  // use async and await
  useEffect(() => {
    const bigfootdata = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/sightings/${sightingIndex}`
        );
        const bigFootData = response.data;
        // store data in states
        setBFSightings(bigFootData);
        console.log(`bigfoot sightings`, bigFootData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    bigfootdata();
  }, [sightingIndex]);

  //display all sightings
  const SightingsList = ({ sightings }) => {
    console.log("logged sights", sightings);
    return (
      <ul>
        <li>
          <strong>Sighting {Number(sightingIndex) + 1}:</strong>
          <ul>
            <li>
              <strong>Date: </strong> {sightings.DATE} {sightings.MONTH},{" "}
              {sightings.YEAR}
            </li>
            <li>
              <strong>Season:</strong> {sightings.SEASON}
            </li>
            <li>
              <strong>Location:</strong> {sightings.LOCATION_DETAILS},{" "}
              {sightings.STATE}
            </li>
            <li>
              <strong>Observation:</strong> {sightings.OBSERVED}
            </li>
            <br />
          </ul>
        </li>
      </ul>
    );
  };

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

export default Sightings;
