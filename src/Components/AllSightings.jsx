import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../db";
import { useSearchParams } from "react-router-dom";

function AllSightings() {
  const [BFSightings, setBFSightings] = useState([]);
  //search terms
  const [term, setTerm] = useState("");

  //search items from the URL
  const [searchParams, setSearchParams] = useSearchParams({
    //query = q
    q: "",
  });

  //show query on URL
  const q = searchParams.get("q");
  console.log("query", q);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // update the query parameter in the URL when the form is submitted
    setSearchParams({ q: term });
  };

  //search query based on all sightings' data
  const filteredSightings = BFSightings.filter((sighting) =>
    `${sighting.date} ${sighting.location} ${sighting.notes} ${sighting.updatedAt}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  //display all sightings
  const SightingsList = ({ sightings }) => (
    <ul>
      {sightings.map((sighting) => (
        <li key={sighting.id}>
          <strong>Sighting {sighting.id}:</strong>
          <ul>
            <li>
              <strong>Date: </strong> {sighting.date}
            </li>
            <li>
              <strong>Location</strong> {sighting.location}
            </li>
            <li>
              <strong>Notes:</strong> {sighting.notes}, {sighting.STATE}
            </li>
            <li>
              <strong>Updated At:</strong> {sighting.updatedAt}
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
