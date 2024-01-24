import axios from "axios";
// import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL } from "../db";
import { useState, useEffect } from "react";
import EditSightingForm from "./EditSightingForm";

const SightingsList = ({ sightings }) => {
  const { sightingIndex } = useParams();

  const nav = useNavigate();

  const [sighting, setSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  //delete sightings

  const handleDelete = () => {
    axios
      .delete(`${backendURL}/sightings/${sightingIndex}`)
      .then(() => {
        // go to the homepage
        nav(`/`);
      })
      .catch((error) => {
        console.error("Error deleting sighting:", error);
      });
  };

  useEffect(() => {
    // fetch the current sighting details using the sightingIndex
    axios.get(`${backendURL}/sightings/${sightingIndex}`).then((response) => {
      setSighting(response.data);
    });
  }, [sightingIndex, sighting]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateSighting = (updatedSighting) => {
    // Send a PUT request to update the sighting details
    axios
      .put(`${backendURL}/sightings/${sightingIndex}`, updatedSighting)
      .then(() => {
        // after successful update, navigate back to the details page
        nav(`/${sightingIndex}`);
      })
      .catch((error) => {
        console.error("Error updating sighting:", error);
        // Handle error, show user feedback, etc.
      });
  };

  return (
    <ul>
      <li>
        {isEditing ? (
          <EditSightingForm
            sighting={sighting}
            onUpdate={handleUpdateSighting}
          />
        ) : (
          <>
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

            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </li>
    </ul>
  );
};

export default SightingsList;
