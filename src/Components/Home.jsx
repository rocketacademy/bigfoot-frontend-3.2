import { useEffect } from "react";
import axios from "axios";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

function Home(props) {
  let { sightings, setSightings } = props;

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3001/sightings")
      .then((res) => {
        console.log(res.data);
        setSightings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sightingArr = sightings.map((sighting, index) => (
    <li key={index} className="report-list__item">
      <div className="list__item-container" onClick={()=>navigate(`/sightings/${index}`)} >
        <div className="container__report-detail">
          <p className="report-detail">{sighting.REPORT_NUMBER}</p>
        </div>
        <div className="container__report-detail">
          <p className="report-detail">{sighting.STATE}</p>
        </div>
        <div className="container__report-detail">
          <p className="report-detail">{sighting.COUNTY}</p>
        </div>
        <div className="container__report-detail">
          <p className="report-detail">{sighting.YEAR}</p>
        </div>
        <div className="container__report-detail">
          <p className="report-detail">{sighting.REPORT_CLASS}</p>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>
      <p>
        <small>You know what they say about big feet...</small>
      </p>
      <div className="card">
        <ol className="report-list">
          <div className="report-list__header">
            <div className="list__item-container">
              <div className="container__report-detail">
                <p className="report-detail">REPORT NUMBER</p>
              </div>
              <div className="container__report-detail">
                <p className="report-detail">STATE</p>
              </div>
              <div className="container__report-detail">
                <p className="report-detail">COUNTY</p>
              </div>
              <div className="container__report-detail">
                <p className="report-detail">YEAR</p>
              </div>
              <div className="container__report-detail">
                <p className="report-detail">REPORT CLASS</p>
              </div>
            </div>
          </div>
          {sightingArr}
        </ol>
      </div>
    </>
  );
}

export default Home;