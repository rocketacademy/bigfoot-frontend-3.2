import axios from "axios";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Sightings() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let data = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/sightings`
        );
        let unPacked = data.data;
        console.log(unPacked);
        setSightings(unPacked);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h2>Bigfoot Sightings</h2>
      {sightings && sightings.length > 0 ? (
        sightings.map((element, index) => {
          return (
            <Link to={`/sightings/${index}`} key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {element.YEAR} {element.SEASON} {element.MONTH}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          );
        })
      ) : (
        <p>No sightings</p>
      )}
    </>
  );
}

export default Sightings;
