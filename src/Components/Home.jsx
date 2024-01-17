import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "./constants";
import Dropdown from "react-bootstrap/Dropdown";

function Home(props) {
  let { sightings, setSightings } = props;
  // const [searchParams, setSearchParams] = useState('')

  // let { query } = useSearchParams

  const navigate = useNavigate();

  // useEffect(()=>{
  //   console.log(query)
  // },[])

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/sightings`)
      .then((res) => {
        setSightings(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const sightingArr = sightings.map((sighting, index) => (
    <li key={index} className="report-list__item">
      <div
        className="list__item-container"
        onClick={() => navigate(`/sightings/${index}`)}
      >
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-caret-down-fill"
        viewBox="0 0 16 16"
      >
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg>
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {/* <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          /> */}
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <>
      <div>
        <img
          src={logo}
          className="logo react"
          alt="React logo"
          onClick={() => navigate("/")}
        />
      </div>
      <h1>Bigfoot Frontend </h1>
      <p>
        <small>You know what they say about big feet...</small>
      </p>
      <div className="card">
        <ol className="report-list">
          <div className="report-list__header">
            <div className="list__item-container">
              <div className="container__report-detail report-header">
                <p className="report-header">Report Number</p>
              </div>
              <div className="container__report-detail report-header">
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    STATE
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    {[
                      ...new Set(sightings.map((sighting) => sighting.STATE)),
                    ].map((uniq, index) => (
                      <Dropdown.Item
                        onClick={() => {
                          navigate(`/sightings/filter?STATE=${uniq}`);
                          axios
                            .get(
                              `${BACKEND_URL}/sightings/filter?STATE=${uniq}`
                            )
                            .then((res) => {
                              setSightings(res.data);
                            });
                        }}
                        key={index}
                      >
                        {uniq}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="container__report-detail report-header">
                <p className="report-header">COUNTY</p>
              </div>
              <div className="container__report-detail report-header">
                <p className="report-header">YEAR</p>
              </div>
              <div className="container__report-detail report-header">
                {/* <p className="report-header">REPORT CLASS</p> */}
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    REPORT CLASS
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    {[
                      ...new Set(
                        sightings.map((sighting) => sighting.REPORT_CLASS)
                      ),
                    ].map((uniq, index) => (
                      <Dropdown.Item
                        onClick={() => {
                          navigate(`/sightings/filter?REPORT_CLASS=${uniq}`);
                          axios
                            .get(
                              `${BACKEND_URL}/sightings/filter?REPORT_CLASS=${uniq}`
                            )
                            .then((res) => {
                              setSightings(res.data);
                            });
                        }}
                        key={index}
                      >
                        {uniq}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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
