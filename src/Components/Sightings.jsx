import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../db";
import { useNavigate, useParams } from "react-router-dom";
import SightingsList from "./SightingList";
import AllSightings from "./AllSightings";

function Sightings() {
  const { sightingIndex } = useParams();

  const [BFSightings, setBFSightings] = useState([]);
  const [page, setPage] = useState(Number(sightingIndex));

  console.log("page id", sightingIndex);
  console.log("current page", page);

  const nav = useNavigate();

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

  const handlePrevPage = () => {
    const updatedPage = page - 1;
    setPage(updatedPage);
    console.log("prev page", updatedPage);
    nav(`/${updatedPage}`);
  };

  const handleNextPage = () => {
    const updatedPage = page + 1;
    setPage(updatedPage);
    console.log("next page", updatedPage);
    nav(`/${updatedPage}`);
  };

  const handlePageOne = () => {
    nav(`/0`);
    setPage(Number(0));
  };

  return (
    <>
      {sightingIndex ? (
        <>
          <div className="card">
            <h3>Bigfoot Sightings</h3>
            <SightingsList sightings={BFSightings} />
          </div>
          {sightingIndex >= 1 ? (
            <button onClick={handlePrevPage}>Previous Sighting</button>
          ) : null}
          <button onClick={handleNextPage}>Next Sighting</button>

          <br />
          <button onClick={() => nav("/")}>Home</button>
        </>
      ) : (
        <div>
          <h1>Hello World</h1>
          <h3>Welcome to Bigfoot Sightings!</h3>
          <AllSightings />
          <br />
          <button onClick={handlePageOne}>View Sightings</button>
        </div>
      )}
    </>
  );
}

export default Sightings;
