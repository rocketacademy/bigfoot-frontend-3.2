import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const IndividualSightingInfo = () => {
  const [individualsightingdata, setIndividualSightingData] = useState({});
  const [sightingcomments, setSightingComments] = useState([]);
  const [newcomment, setNewComment] = useState({});

  const navigate = useNavigate();

  const params = useParams();
  const sightingId = params.sightingId;

  useEffect(() => {
    const getData = async () => {
      try {
        //Makes a http get request to the backend.
        let data = await axios.get(
          `${import.meta.env.VITE_SOME_BACKEND_URL}/sightings/${sightingId}`
        );

        let unPacked = data.data;

        setIndividualSightingData(unPacked);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    console.log("individual sighting data:", individualsightingdata);
  }, []);

  const getCommentData = async () => {
    try {
      let data = await axios.get(
        `${
          import.meta.env.VITE_SOME_BACKEND_URL
        }/sightings/${sightingId}/comments`
      );

      let unPacked = data.data;

      console.log("comment data:", unPacked);
      setSightingComments(unPacked);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCommentData();
  }, []);

  let allcomments = sightingcomments.map((comment) => (
    <>
      <div className="comments">
        <p>{comment.content}</p>
      </div>
    </>
  ));

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const sendCommentData = async () => {
      console.log("sendCommentData is being called.");
      console.log("sightingId:", sightingId);
      console.log("newcomment's content:", newcomment.content);
      try {
        //make a http POST request to the backend.
        let response = await axios.post(
          `${
            import.meta.env.VITE_SOME_BACKEND_URL
          }/sightings/${sightingId}/comments`,
          newcomment
        );

        console.log("response:", response);
      } catch (err) {
        console.log(err);
      }
    };

    sendCommentData();
    setNewComment({
      content: "",
    });

    alert("Frontend submit comment success!");
    getCommentData();
  };

  useEffect(() => {
    console.log(newcomment.content);
  }, [newcomment]);

  const handleComment = (e) => {
    e.preventDefault();

    console.log("e.target.name: ", e.target.name);
    console.log("e.target.value: ", e.target.value);

    setNewComment(() => {
      return { [e.target.name]: [e.target.value] };
    });
  };

  return (
    <div className="sighting-info">
      <div className="sighting-observed-info">
        <p>{individualsightingdata.notes}</p>
      </div>

      <div className="sighting-observed-year">
        <p>Year:</p>
        <p>{individualsightingdata.date}</p>
      </div>

      <div className="sighting-observed-">
        <p>Location:</p>
        <p>{individualsightingdata.location}</p>
      </div>

      <div className="sighting-observed-go-back-button">
        <button
          onClick={() => {
            navigate(`/sightings`);
          }}
        >
          Return
        </button>

        {/*map all the comments and return them here.*/}

        <form onSubmit={handleSubmitComment}>
          <p>Have an a question? Let us know your thoughts!</p>

          <label htmlFor="comment-box">Your Comment:</label>
          <input
            type="text"
            id="comment-box"
            value={newcomment.content}
            name="content"
            onChange={handleComment}
          ></input>

          <button type="submit">Submit Comment</button>
        </form>

        <h2>Comments:</h2>
        {allcomments}
      </div>
    </div>
  );
};

export default IndividualSightingInfo;
