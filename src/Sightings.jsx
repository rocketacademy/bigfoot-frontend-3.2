import axios from "axios";
import { useState, useEffect } from "react";
import IndividualSighting from "./IndividualSighting";

const Sightings = () => {
  const [sightings, setSightings] = useState([]);

  const getData = async () => {
    try {
      //Makes a http get request to the backend.
      let data = await axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings`
      );

      let unPacked = data.data;
      console.log(unPacked);
      setSightings(unPacked);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
    console.log("getdata is being called");
  }, []);

  useEffect(() => {
    console.log("sightings:", sightings);
    //the value is
  }, [sightings]);

  let allsightings = sightings.map((sighting) => (
    <IndividualSighting
      key={sighting.id}
      sightingid={sighting.id}
      date={sighting.date}
      location={sighting.location}
    />
  ));

  return (
    <>
      <button type="submit" onClick={getData}>
        Refresh Sightings
      </button>
      {allsightings}
    </>
  );
};

export default Sightings;
