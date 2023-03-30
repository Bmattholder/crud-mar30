import React, { Fragment, useState } from "react";
import axios from "axios";

import "./Person.css";

function Person({ id, firstName, lastName, address, toggleHelper }) {
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    praenomens: firstName,
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } = editForm;

  const resetFormData = () => {
    setEditForm({
      praenomens: firstName,
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  const editModeHelper = () => {
    setEditMode(!editMode);
  };

  const cancelHelper = () => {
    editModeHelper();
    resetFormData();
  };

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditForm((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8080/api/v1/people/${id}`, editForm);
    editModeHelper();
    toggleHelper();
  };

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    toggleHelper();
  };

  return (
    <div className="card">
      {!editMode ? (
        <Fragment>
          <h4>
            {id}: {firstName} {lastName}
          </h4>
          <h5>
            {address.number} {address.street}
          </h5>
          <h5>
            {address.city} {address.state} {address.zip}
          </h5>
          <button onClick={editModeHelper}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </Fragment>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="input-field"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="Praenomens"
            required
          />
          <input
            type="text"
            className="input-field"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="Cognomen"
            required
          />
          <input
            type="text"
            className="input-field"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="Number"
            required
          />
          <input
            type="text"
            className="input-field"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="Street"
            required
          />
          <input
            type="text"
            className="input-field"
            name="city"
            id="city"
            value={city}
            onChange={onChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            className="input-field"
            name="state"
            id="state"
            value={state}
            onChange={onChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            className="input-field"
            name="zip"
            id="zip"
            value={zip}
            onChange={onChange}
            placeholder="Zip"
            required
          />
          <button onClick={(e) => onSubmit(e, id)}>Submit Edit</button>
          <button onClick={cancelHelper}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default Person;
