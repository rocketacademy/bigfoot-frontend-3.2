import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function IndividualSightings() {
  const { sightingIndex } = useParams();
  const [sightingCase, setsightingCase] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/sightings/${sightingIndex}`
        );
        let unPacked = data.data;
        console.log(unPacked);
        setsightingCase(unPacked);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [sightingIndex]);

  return (
    <div>
      {sightingCase ? (
        Object.entries(sightingCase).map(([key, value], index) => (
          <div key={index} className="sighting_info">
            <strong>{key.replace(/_/g, " ")}:</strong> {value}
          </div>
        ))
      ) : (
        <p>No case exists</p>
      )}
    </div>
  );
}

export default IndividualSightings;
