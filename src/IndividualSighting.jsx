import { useNavigate } from "react-router-dom";

const IndividualSighting = ({ year, season, state, county, index }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/sightings/${index}`);
  };

  return (
    <>
      <>
        <div
          onClick={handleClick}
          //eslint-disable-next-line react/no-unknown-property
          index={index}
          className="sightings-all"
        >
          <div className="sighting-info-preview">
            <p>Year:</p>
            <p>{year}</p>
          </div>

          <div className="sighting-info-preview">
            <p>Season:</p>
            <p>{season}</p>
          </div>

          <div className="sighting-info-preview">
            <p>State:</p>
            <p>{state}</p>
          </div>

          <div className="sighting-info-preview">
            <p>County:</p>
            <p>{county}</p>
          </div>
        </div>
      </>
    </>
  );
};

export default IndividualSighting;
