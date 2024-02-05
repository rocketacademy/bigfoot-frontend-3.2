import logo from "/logo.png";
import "./App.css";
import SightingsList from "./Components/SightingsList";
// import SightingsDetail from "./Components/SightingsDetail";

function App() {
  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="logo" />
      </div>
      <h1>Bigfoot Sightings</h1>
      <p>Click a ID number to get more information on that bigfoot sighting.</p>
      <SightingsList />
      {/* <SightingsDetail /> */}
    </>
  );
}

export default App;
