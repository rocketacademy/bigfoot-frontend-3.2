import { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./constants";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";

function Home(props) {
  let { sightings, setSightings } = props;
  const [dateValue, setDateValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [sightingEdit, setSightingEdit] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryInputValue, setCategoryInputValue] = useState([]);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setEditing(false);
    setDateValue("");
    setLocationValue("");
    setNoteValue("");
    setSightingEdit({});
  };
  const handleShow = () => setShow(true);

  const getSightings = async () => {
    await axios
      .get(`${BACKEND_URL}/sightings`)
      .then((res) => {
        console.log(res.data);
        setSightings(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    axios
      .post(`${BACKEND_URL}/sightings`, {
        date: dateValue,
        location: locationValue,
        notes: noteValue,
				categories: categoryInputValue
      })
      .then((res) => {
        console.log(res);
        handleClose();
        getSightings();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    axios
      .delete(`${BACKEND_URL}/sightings/${id}`)
      .then(() => {
        console.log("Successfully deleted");
        getSightings();
      })
      .catch((err) => console.log(err));
  };

  const handleStartEdit = (id) => {
    setEditing(true);
    axios
      .get(`${BACKEND_URL}/sightings/${id}`)
      .then((res) => {
        console.log(res.data);
        setSightingEdit(res.data);
      })
      .catch((err) => console.log(err));
    setShow(true);
  };
  const handleUpdate = (id) => {
    axios
      .put(`${BACKEND_URL}/sightings/${id}`, {
        date: dateValue,
        location: locationValue,
        notes: noteValue,
      })
      .then((res) => {
        console.log("updated successfully");
        handleClose();
        getSightings();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(sightingEdit.id);
    if (editing) {
      setDateValue(sightingEdit.date);
      setLocationValue(sightingEdit.location);
      setNoteValue(sightingEdit.notes);
    }
  }, [sightingEdit, editing]);

  const getCategories = () => {
    axios
      .get(`${BACKEND_URL}/categories`)
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    getSightings();
    getCategories();
  }, []);

  const handleSelectChange = (categories) => {
		console.log(categories)
		let selectedCategoryArr=categories.map((category) =>{
			return category.value
		})
		setCategoryInputValue(selectedCategoryArr)
	};

	useEffect(()=>{
		console.log("Selected categoryInputValue's ID", categoryInputValue)
	},[categoryInputValue])


  const sightingArr = sightings.map((sighting) => (
    <li key={sighting.id} className="report-list__item">
      <div className="list__item-container">
        <div className="container__report-detail">
          <p className="report-detail">{sighting.location}</p>
        </div>
        <div className="container__report-detail">
          <p className="report-detail">
            {new Date(sighting.date).toLocaleDateString()}
          </p>
        </div>
        <button onClick={() => navigate(`/sightings/${sighting.id}`)}>
          View
        </button>
        <button onClick={() => handleDelete(sighting.id)}>Delete</button>
        <button onClick={() => handleStartEdit(sighting.id)}>Edit</button>
      </div>
    </li>
  ));

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
      <div>
        <button onClick={handleShow}>Add Sighting</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a sighting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={locationValue}
                  onChange={(e) => {
                    setLocationValue(e.target.value);
                  }}
                  placeholder="Anywhere, Anyplace"
                />
              </Form.Group>

              <Select
                // defaultValue={[options[2], options[3]]}
                isMulti
                name="colors"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectChange}
              />

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateValue}
                  onChange={(e) => {
                    setDateValue(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  value={noteValue}
                  onChange={(e) => {
                    setNoteValue(e.target.value);
                  }}
                  rows={3}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Close</button>
            {editing ? (
              <button onClick={() => handleUpdate(sightingEdit.id)}>
                Update
              </button>
            ) : (
              <button onClick={handleSubmit}>Submit</button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
      <h1>Bigfoot Frontend </h1>
      <p>
        <small>You know what they say about big feet...</small>
      </p>
      <div className="card">
        <ul className="report-list">{sightingArr}</ul>
      </div>
    </>
  );
}

export default Home;
