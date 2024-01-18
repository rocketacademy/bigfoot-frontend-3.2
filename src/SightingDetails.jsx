import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SightingDetails({setViewSighting}) {
  const [sighting, setSighting] = useState(null)
  const { sightingIndex } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/sightings/${sightingIndex}`);
      const jsonData = await response.json();
      setSighting(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const returnHome = () => {
    setViewSighting(false); 
    navigate("/");
  }

  return (
    <>
      {sighting ? (
        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "16px",
            color: "#333",
          }}
        >
          <div>
            <h4 style={{ textAlign: "center", color: "#4a4a4a" }}>
              Bigfoot Sighting Report
            </h4>
            <p>
              <strong>Year:</strong> {sighting.YEAR}
            </p>
            <p>
              <strong>Season:</strong> {sighting.SEASON}
            </p>
            <p>
              <strong>State:</strong> {sighting.STATE}
            </p>
            <p>
              <strong>County:</strong> {sighting.COUNTY}
            </p>
            <p>
              <strong>Location Details:</strong> {sighting.LOCATION_DETAILS}
            </p>
            <p>
              <strong>Observed:</strong> {sighting.OBSERVED}
            </p>
            <p>
              <strong>Other Witnesses:</strong> {sighting.OTHER_WITNESSES}
            </p>
            <p>
              <strong>Time and Conditions:</strong>{" "}
              {sighting.TIME_AND_CONDITIONS}
            </p>
            <p>
              <strong>Report Number:</strong> {sighting.REPORT_NUMBER}
            </p>
            <p>
              <strong>Report Class:</strong> {sighting.REPORT_CLASS}
            </p>
          </div>
          <button
            onClick={returnHome}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "20px",
              backgroundColor: "#4a90e2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {" "}
            Go Back{" "}
          </button>
        </div>
      ) : (
        <div>No sighting</div>
      )}
    </>
  );
}

export default SightingDetails;
