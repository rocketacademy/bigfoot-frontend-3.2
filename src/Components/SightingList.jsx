import { useParams } from "react-router-dom";

const SightingsList = ({ sightings }) => {
  console.log("logged sights", sightings);
  const { sightingIndex } = useParams();

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
      </li>
    </ul>
  );
};

export default SightingsList;
