import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../db";
import { useSearchParams } from "react-router-dom";

function AllSightings() {
  const [BFSightings, setBFSightings] = useState([]);
  //search terms
  const [term, setTerm] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({
    //query = q
    q: "",
    data: false,
  });

  const q = searchParams.get("q");
  const data = searchParams.get("data") === "true";

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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the query parameter in the URL when the form is submitted
    setSearchParams({ q: term });
  };

  const filteredSightings = BFSightings.filter((sighting) =>
    `${sighting.DATE} ${sighting.MONTH} ${sighting.YEAR} ${sighting.SEASON} ${sighting.LOCATION_DETAILS} ${sighting.STATE} ${sighting.OBSERVED}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

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
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            onChange={(e) => setTerm(e.target.value)}
          />
        </form>
        {q && (
          <div>
            <h4>Search Results for "{q}"</h4>
            {filteredSightings.length > 0 ? (
              <SightingsList sightings={filteredSightings} />
            ) : (
              <p>Opps! No footprint for search term "{q}".</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AllSightings;
