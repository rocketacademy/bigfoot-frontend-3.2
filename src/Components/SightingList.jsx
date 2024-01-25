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

  //comment

  const [comment, setComment] = useState(""); //comment content
  const [commentData, setCommentData] = useState(""); //comment data from axios

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

    // fetch comments too
    axios
      .get(`${backendURL}/sightings/${sightingIndex}/comments`)
      .then((response) => {
        setCommentData(response.data);
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

  const handleSubmit = () => {
    // post to api
    axios
      .post(`${backendURL}/sightings/${sightingIndex}/comments`, {
        // post content
        content: comment,
      })
      .then(() => {
        // clear content state
        setComment("");
        // show all content, pull out data first
        return axios.get(`${backendURL}/sightings/${sightingIndex}/comments`);
      })
      // update state
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((error) => {
        console.error("Error showing content", error);
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

            <h3>Comments:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Say something here:
                <br />
                <textarea
                  type="text"
                  name="comments"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>
              <br />
              <button>Submit Comment</button>
            </form>
            <h3>Hear what they say...</h3>
            <div>
              {commentData
                ? commentData.map((comment) => (
                    <ul key={comment.id}>
                      <li>
                        {comment.createdAt}
                        <br />
                        {comment.content}
                      </li>
                    </ul>
                  ))
                : null}
            </div>
          </>
        )}
      </li>
    </ul>
  );
};

export default SightingsList;
