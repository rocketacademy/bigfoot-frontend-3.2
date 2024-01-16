import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../db";
import { useParams } from "react-router-dom";
import SightingsList from "./SightingList";

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

  return (
    <>
      {sightingIndex ? (
        <>
          <h1>Bigfoot Frontend</h1>
          <div className="card">
            <h3>Bigfoot Sightings</h3>
            <SightingsList sightings={BFSightings} />
          </div>
        </>
      ) : (
        <div>
          <h1>Hello World</h1>
          <h3>Welcome to Big Foot Sightings!</h3>
        </div>
      )}
    </>
  );
}

export default Sightings;
