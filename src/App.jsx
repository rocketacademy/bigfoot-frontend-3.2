import logo from "/logo.png";
import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SightingDetails from "./SightingDetails";
import SightingForm from "./SightingForm";
import { useNavigate } from "react-router-dom";

function App() {
  const [sightings, setSightings] = useState([])
  const [viewSighting, setViewSighting] = useState(false)
  const [viewForm, setViewForm] = useState(false);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [filterYear, setFilterYear] = useState("All Years");
  const [filteredSightings, setFilteredSightings] = useState([])
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/sightings");
      const jsonData = await response.json();
      const indexedSightings = jsonData.map((item, index) => ({
        ...item,
        index: index, 
      }));
      setSightings(indexedSightings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => { 
    fetchData();
  }, []); 

  useEffect(() => {
    const years = sightings.map((sighting) => sighting.YEAR);
    const uniqueSortedYears = [...new Set(years)].sort((a, b) => a - b);
    setUniqueYears(uniqueSortedYears);
  }, [sightings]);

  useEffect(() => {
    const filteredSightings =
      filterYear !== "All Years"
        ? sightings.filter((sighting) => sighting.YEAR === filterYear)
        : [...sightings];
    filteredSightings.sort((a, b) => a.YEAR - b.YEAR);
    setFilteredSightings(filteredSightings);
  }, [sightings, filterYear]);  

  const handleYearChange = (event) => {
    setFilterYear(event.target.value);
  };

  const handleAddSighting = () => {
    setViewForm(true); 
    navigate("/add-sightings");
  }

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>

      {viewSighting == false && viewForm == false ? (
        <div className="card">
          <button onClick={handleAddSighting} style={{marginBottom: "1rem"}}>Add a Sighting!</button>
          <div
            style={{
              textAlign: "center",
              padding: "5px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            List of Sightings:
          </div>
          <div>
            <label>Filter by Year: </label>
            <select value={filterYear} onChange={handleYearChange}>
              <option value="All Years">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr>
                <th className="borderStyle">Month</th>
                <th className="borderStyle">Year</th>
                <th className="borderStyle">Season</th>
                <th className="borderStyle">Click to View</th>
              </tr>
            </thead>
            <tbody>
              {filteredSightings.map((sighting) => (
                <tr key={sighting.index}>
                  <td className="borderStyle">{sighting.MONTH}</td>
                  <td className="borderStyle">{sighting.YEAR}</td>
                  <td className="borderStyle">{sighting.SEASON}</td>
                  <td className="borderStyle">
                    <Link
                      to={`/sightings/${sighting.index}`}
                      onClick={() => setViewSighting(true)}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <Routes>
        <Route
          path="/sightings/:sightingIndex"
          element={<SightingDetails setViewSighting={setViewSighting} />}
        />
        <Route
          path="/add-sightings"
          element={<SightingForm setViewForm={setViewForm} />}
        />
      </Routes>
    </>
  );
}

export default App;
