import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const IndividualSightingInfo = () => {
  const [individualsightingdata, setIndividualSightingData] = useState({});
  const navigate = useNavigate();

  //make a get request here?
  const params = useParams();
  const index = params.sightingIndex;

  useEffect(() => {
    const getData = async () => {
      try {
        //Makes a http get request to the backend.
        let data = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${index}`
        );

        console.log(
          "I am the data.data you got from the database: ",
          data.data
        );
        let unPacked = data.data;

        console.log("unPacked:", unPacked);
        setIndividualSightingData(unPacked);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="sighting-info">
      <div className="sighting-observed-info">
        <p>{individualsightingdata.notes}</p>
      </div>

      <div className="sighting-observed-year">
        <p>Year:</p>
        <p>{individualsightingdata.date}</p>
      </div>

      <div className="sighting-observed-season">
        <p>Location:</p>
        <p>{individualsightingdata.location}</p>
      </div>

      <div className="sighting-observed-go-back-button">
        <button
          onClick={() => {
            navigate(`/sightings`);
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default IndividualSightingInfo;
