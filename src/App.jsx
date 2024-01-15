import logo from "/logo.png";
import axios from "axios"
import "./App.css";
import { useEffect, useState } from "react";


function App() {

  const [sightings, setSightings] = useState({})

  useEffect(()=>{
    axios.get("http://localhost:3001/sightings")
      .then(res => {
        console.log(res.data)
        setSightings(res.data)
      })
      .catch(err=>console.log(err))
  },[])

  // const SightingArr = sightings.map((sightings.data)=>(
  //   <div>
  //     <p>{sighting.data}</p>
  //   </div>
  // ))

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>
      <div className="card">
        <p>{sightings[0]?.YEAR}</p>
        <p>
          <small>You know what they say about big feet...</small>
        </p>
      </div>
    </>
  );
}

export default App;
