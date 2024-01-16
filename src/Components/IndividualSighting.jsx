import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";

function IndividualSighting(props) {

  let {sightings} = props;

  let { sightingIndex } = useParams()
  const [individualSightingData, setIndividualSightingData] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/sightings/${sightingIndex}`)
    .then((res)=>{
      setIndividualSightingData(res.data)
    })
    .catch(err => console.log(err))
  },[sightingIndex])

  let {
    YEAR,
    SEASON,
    STATE,
    COUNTY,
    LOCATION_DETAILS,
    OBSERVED,
    OTHER_WITNESSES,
    TIME_AND_CONDITIONS,
    REPORT_NUMBER,
    REPORT_CLASS,
  } = individualSightingData;

  return (
    <>
    <button onClick={()=>navigate(`/`)}>Home</button>
      <h1>
        {STATE}
        <br></br> {COUNTY}
      </h1>
      <h2>
        Report Number: {REPORT_NUMBER} <br /> {LOCATION_DETAILS}
      </h2>
      <br />
      <h2>
        Year: {YEAR} | Report Class: {REPORT_CLASS}{" "}
      </h2>
      <h4>
        <em>{SEASON}, {TIME_AND_CONDITIONS}</em>
      </h4>
      <hr />
      <h3 className="report__content-header">Report:</h3>
      <p className="observed">{OBSERVED}</p>
      <p className="witnesses">Other witnesses: {OTHER_WITNESSES} </p>
      <div className="container__btn-nav">
        {sightingIndex == 0 ? null : <button  onClick={()=>navigate(`/sightings/${Number(sightingIndex)-1}`)} >previous</button>}
        {sightingIndex == sightings.length - 1 ? null : <button onClick={()=>navigate(`/sightings/${Number(sightingIndex)+1}`)}>next</button>}
      </div>
    </>
  );
}

export default IndividualSighting;