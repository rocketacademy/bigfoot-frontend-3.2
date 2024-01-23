import axios from "axios";
// import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL } from "../db";

const SightingsList = ({ sightings }) => {
  console.log("logged sights", sightings);

  const { sightingIndex } = useParams();

  console.log("sighting index", sightingIndex);

  const nav = useNavigate();

  //delete sightings

  const handleDelete = () => {
    axios
      .delete(`${backendURL}/sightings/${sightingIndex}`)
      .then(() => {
        // Go to the previous page or homepage
        nav(`/`);
      })
      .catch((error) => {
        console.error("Error deleting sighting:", error);
        // Handle error, show user feedback, etc.
      });
  };

  return (
    <ul>
      <li>
        <strong>Sighting {Number(sightingIndex)}:</strong>
        <ul>
          <li>
            <strong>Date:</strong> {sightings.date}
          </li>
          <li>
            <strong>Location:</strong> {sightings.location}
          </li>
          <li>
            <strong>Notes:</strong> {sightings.notes}
          </li>
          <br />
        </ul>
        {/* <button onClick={handleEdit}>Edit</button> */}
        <button onClick={handleDelete}>Delete</button>
      </li>
    </ul>
  );
};

export default SightingsList;
