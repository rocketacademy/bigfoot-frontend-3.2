import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SightingForm({setViewForm}) {
  const [formData, setFormData] = useState({
    YEAR: "",
    SEASON: "",
    MONTH: "",
    DATE: "",
    STATE: "Testing...",
    COUNTY: "Testing...",
    LOCATION_DETAILS: "Testing...",
    NEAREST_TOWN: "Testing...",
    NEAREST_ROAD: "Testing...",
    OBSERVED: "Testing...",
    ALSO_NOTICED: "Testing...",
    OTHER_WITNESSES: "Testing...",
    OTHER_STORIES: "Testing...",
    TIME_AND_CONDITIONS: "Testing...",
    ENVIRONMENT: "Testing...",
    REPORT_NUMBER: "Testing...",
    REPORT_CLASS: "Testing..."
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData) 
        };
        const response = await fetch("http://localhost:3000/sightings", request);
        const data = response.status;
        console.log("Response: "+ data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };

  const returnHome = () => {
    setViewForm(false);
    navigate("/");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ margin: "1rem" }}>
          <label>Year: </label>
          <input name="YEAR" value={formData.YEAR} onChange={handleChange} />
        </div>
        <div style={{ margin: "1rem" }}>
          <label>Season: </label>
          <input
            name="SEASON"
            value={formData.SEASON}
            onChange={handleChange}
          />
        </div>
        <div style={{ margin: "1rem" }}>
          <label>Month: </label>
          <input name="MONTH" value={formData.MONTH} onChange={handleChange} />
        </div>
        <div style={{ margin: "1rem" }}>
          <label>Date: </label>
          <input name="DATE" value={formData.DATE} onChange={handleChange} />
        </div>
        <button type="submit">Submit Sighting</button>
      </form>
      <button
        onClick={returnHome}
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          borderRadius: "5px",
        }}
      >
        Go Back
      </button>
    </>
  );
}

export default SightingForm;
