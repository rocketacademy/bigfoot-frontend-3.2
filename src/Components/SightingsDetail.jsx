import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { BACKEND_URL } from "../constants.jsx";

export default function SightingsDetail() {
  const [sightingsDetail, setSightingsDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setSightingsDetail(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <>
      {sightingsDetail.map((sighting, index) => (
        <Card key={sighting.data}>
          <Card.Body>
            <Card.Title>{index}</Card.Title>
            <Card.Text>Year: {sighting.YEAR}</Card.Text>
            <Card.Text>Season: {sighting.SEASON}</Card.Text>
            <Card.Text>Month: {sighting.MONTH}</Card.Text>
            <Card.Text>Date: {sighting.DATE}</Card.Text>
            <Card.Text>State: {sighting.STATE}</Card.Text>
            <Card.Text>County: {sighting.COUNTY}</Card.Text>
            <Card.Text>Location Details: {sighting.LOCATION_DETAILS}</Card.Text>
            <Card.Text>Nearest Town: {sighting.NEAREST_TOWN}</Card.Text>
            <Card.Text>Nearest Road: {sighting.NEAREST_ROAD}</Card.Text>
            <Card.Text>Observed: {sighting.OBSERVED}</Card.Text>
            <Card.Text>Also Noticed: {sighting.ALSO_NOTICED}</Card.Text>
            <Card.Text>Other Witnesses: {sighting.OTHER_WITNESSES}</Card.Text>
            <Card.Text>Other Stories: {sighting.OTHER_STORIES}</Card.Text>
            <Card.Text>
              Time and Conditions: {sighting.TIME_AND_CONDITIONS}
            </Card.Text>
            <Card.Text>Environment: {sighting.ENVIRONMENT}</Card.Text>
            <Card.Text>Report Number: {sighting.REPORT_NUMBER}</Card.Text>
            <Card.Text>Report Class: {sighting.REPORT_CLASS}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
