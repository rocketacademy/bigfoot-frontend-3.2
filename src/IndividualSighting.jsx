import { useNavigate } from "react-router-dom";

const IndividualSighting = ({ date, location, sightingid }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/sightings/${sightingid}`);
  };

  return (
    <>
      <>
        <div
          onClick={handleClick}
          //eslint-disable-next-line react/no-unknown-property
          sightingId={sightingid}
          className="sightings-all"
        >
          <div className="sighting-info-preview">
            <p>Date:</p>
            <p>{date}</p>
          </div>

          <div className="sighting-info-preview">
            <p>Location:</p>
            <p>{location}</p>
          </div>
        </div>
      </>
    </>
  );
};

export default IndividualSighting;
