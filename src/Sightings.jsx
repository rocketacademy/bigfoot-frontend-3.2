import axios from "axios";
import { useState, useEffect } from "react";
import IndividualSighting from "./IndividualSighting";

const Sightings = () => {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
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
    getData();
  }, []);

  useEffect(() => {
    console.log("sightings:", sightings);
    //the value is
  }, [sightings]);

  let allsightings = sightings.map((sighting) => (
    <IndividualSighting
      key={sightings.indexOf(sighting)}
      index={sightings.indexOf(sighting)}
      year={sighting.YEAR}
      season={sighting.SEASON}
      state={sighting.STATE}
      county={sighting.COUNTY}
    />
  ));

  return allsightings;
};

export default Sightings;
