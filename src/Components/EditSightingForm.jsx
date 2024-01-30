import { useState } from "react";

const EditSightingForm = ({ sighting, onUpdate }) => {
  const [editedSighting, setEditedSighting] = useState({ ...sighting });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSighting((prevSighting) => ({
      ...prevSighting,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(editedSighting);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={editedSighting.location}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Notes:
        <textarea
          name="notes"
          value={editedSighting.notes}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditSightingForm;
