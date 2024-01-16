import { useParams } from "react-router-dom";

const SightingsList = ({ sightings }) => {
  console.log("logged sights", sightings);
  const { sightingIndex } = useParams();

  return (
    <ul>
      <li>
        <strong>Sighting {Number(sightingIndex) + 1}:</strong>
        <ul>
          <li>
            <strong>Date: </strong> {sightings.DATE} {sightings.MONTH},{" "}
            {sightings.YEAR}
          </li>
          <li>
            <strong>Season:</strong> {sightings.SEASON}
          </li>
          <li>
            <strong>Location:</strong> {sightings.LOCATION_DETAILS},{" "}
            {sightings.STATE}
          </li>
          <li>
            <strong>Observation:</strong> {sightings.OBSERVED}
          </li>
          <br />
        </ul>
      </li>
    </ul>
  );
};

export default SightingsList;
