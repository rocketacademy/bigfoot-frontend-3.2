import logo from "/logo.png";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/sightings");
  }, []);

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>
      <div className="card">
        <p>
          Welcome to Bigfoot Sightings.com! Click on a sighting to find out more
          about it. Saw Bigfoot recently? Click the link below!
        </p>

        <Link to="/sightings/new">Enter Bigfoot Sighting</Link>
        <Outlet />
      </div>
    </>
  );
}

export default App;
