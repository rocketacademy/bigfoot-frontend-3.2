import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const NewSightingSubmission = () => {
  const [newSighting, setNewSighting] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //on Submit, make a post request to the backend.
    const sendData = async () => {
      try {
        //make a http POST request to the backend.
        let response = await axios.post(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings`,
          newSighting
        );

        console.log("response:", response);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("I am sending the data!!");
    sendData();
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNewSighting((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Link to="/sightings">Return</Link>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Date:</p>
          <input
            type="date"
            name="date"
            value={newSighting.date}
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <p>Location:</p>
          <input
            type="text"
            name="location"
            value={newSighting.location}
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <p>Additional Comments:</p>
          <input
            type="text"
            name="notes"
            value={newSighting.notes}
            onChange={handleChange}
          ></input>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewSightingSubmission;
