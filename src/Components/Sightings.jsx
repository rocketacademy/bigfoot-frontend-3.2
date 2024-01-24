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

  const handlePrevPage = async () => {
    let prevPage = page - 1;

    while (prevPage >= 1) {
      try {
        // Fetch data for the next page
        const response = await axios.get(`${backendURL}/sightings/${prevPage}`);
        const nextSightings = response.data;

        // Check if valid data exists for the next page
        if (nextSightings && Object.keys(nextSightings).length > 0) {
          setPage(prevPage);
          console.log("Prev page:", prevPage);
          nav(`/${prevPage}`);
          break; // Exit the loop if valid data is found
        } else {
          console.log("No content in the next index");
          prevPage -= 1; // Update nextPage and continue the loop
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show user feedback, etc.
        break; // Exit the loop in case of an error
      }
    }
  };

  const handleNextPage = async () => {
    let nextPage = page + 1;

    while (nextPage >= 1) {
      try {
        // Fetch data for the next page
        const response = await axios.get(`${backendURL}/sightings/${nextPage}`);
        const nextSightings = response.data;

        // Check if valid data exists for the next page
        if (nextSightings && Object.keys(nextSightings).length > 0) {
          setPage(nextPage);
          console.log("Next page:", nextPage);
          nav(`/${nextPage}`);
          break; // Exit the loop if valid data is found
        } else {
          console.log("No content in the next index");
          nextPage += 1; // Update nextPage and continue the loop
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show user feedback, etc.
        break; // Exit the loop in case of an error
      }
    }
  };

  const handlePageOne = () => {
    nav(`/2`);
    setPage(Number(2));
  };

  const handleForm = () => {
    nav(`/reportbigfoot`);
  };

  return (
    <>
      {sightingIndex ? (
        <>
          <div className="card">
            <h3>Bigfoot Sightings</h3>
            <SightingsList sightings={BFSightings} />
          </div>
          {sightingIndex >= 2 ? (
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
          <button onClick={handleForm}>Report Bigfoot!</button>
          <AllSightings />
          <br />
          <button onClick={handlePageOne}>View Sightings</button>
        </div>
      )}
    </>
  );
}

export default Sightings;
