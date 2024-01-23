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
        <p>{individualsightingdata.OBSERVED}</p>
      </div>

      <div className="sighting-observed-year">
        <p>YEAR:</p>
        <p>{individualsightingdata.YEAR}</p>
      </div>

      <div className="sighting-observed-season">
        <p>SEASON:</p>
        <p>{individualsightingdata.SEASON}</p>
        <p>YEAR:</p>
        <p>{individualsightingdata.YEAR}</p>
      </div>

      <div className="sighting-observed-county">
        <p>COUNTY:</p>
        <p>{individualsightingdata.STATE}</p>
      </div>

      <div className="sighting-observed-location-details">
        <p>LOCATION DETAILS:</p>
        <p>{individualsightingdata.LOCATION_DETAILS}</p>
      </div>

      <div className="sighting-observed-other-witnesses">
        <p>OTHER WITNESSES:</p>
        <p>{individualsightingdata.OTHER_WITNESSES}</p>
      </div>

      <div className="sighting-observed-time-and-conditions">
        <p>TIME AND CONDITIONS:</p>
        <p>{individualsightingdata.TIME_AND_CONDITIONS}</p>
      </div>

      <div className="sighting-observed-report-number">
        <p>REPORT NUMBER:</p>
        <p>{individualsightingdata.REPORT_NUMBER}</p>
      </div>

      <div className="sighting-observed-report-class">
        <p>REPORT CLASS:</p>
        <p>{individualsightingdata.REPORT_CLASS}</p>
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
