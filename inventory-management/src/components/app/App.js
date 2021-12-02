import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "../../mock-data.json";
import ReadOnlyRow from "../ReadOnlyRow";
import EditableRow from "../EditableRow";

const App = () => {
  useEffect(() => {
    fetch("/api/all").then(res => res.json()).then(data => { console.log(data); setItems(data) });
  }, []);
  const [items, setItems] = useState([]);
  const [test, setTest] = useState(null);
  const [addFormData, setAddFormData] = useState({
    name: "",
    amount: 0,
    price: 0,
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    amount: 0,
    price: 0,
  });

  const [editItemId, setEditItemId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: nanoid(),
      name: addFormData.name,
      amount: addFormData.amount,
      price: addFormData.price,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedItem = {
      id: editItemId,
      name: editFormData.name,
      amount: editFormData.amount,
      price: editFormData.price,
    };

    const newItems = [...items];

    const index = items.findIndex((item) => item.id === editItemId);

    newItems[index] = editedItem;

    setItems(newItems);
    setEditItemId(null);
  };

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditItemId(item.id);

    const formValues = {
      name: item.name,
      amount: item.amount,
      price: item.price,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditItemId(null);
  };

  const handleDeleteClick = (itemId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === itemId);

    newItems.splice(index, 1);

    setItems(newItems);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Fragment>
                {editItemId === item.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    key={item.id}
                    item={item}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add an Item</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="amount"
          required="required"
          placeholder="Enter an amount..."
          onChange={handleAddFormChange}
        />
        <span class="currencyinput">$
          <input
            type="number"
            class="currency"
            step="0.01"
            name="price"
            required="required"
            placeholder="0.00"
            onChange={handleAddFormChange}
          />
        </span>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
