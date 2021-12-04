import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "../../mock-data.json";
import ReadOnlyRow from "../ReadOnlyRow";
import EditableRow from "../EditableRow";
import Item from "../../models/item";


//Define App component to display and manage a table of inventory items (editable and read only rows)
// and provides a form for adding new inventory items

const App = () => {
  useEffect(() => {
    fetch("/api/all").then(res => res.json()).then(data => { console.log(data); setItems(data) });
  }, []);
  const [items, setItems] = useState([]);
  const [test, setTest] = useState(null);

  //Declare a new state variable for added item
  const [addFormData, setAddFormData] = useState({
    name: "",
    amount: 0,
    price: 0,
  });

  //Declare a new state variable for edited item
  const [editFormData, setEditFormData] = useState({
    name: "",
    amount: 0,
    price: 0,
  });

  //Declare a new state varaible for Id of edited data
  const [editItemId, setEditItemId] = useState(null);

  // Event handler to add item
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  // Event handler to edit item
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  // Event handler for submit when adding
  const handleAddFormSubmit = async (event) => {
    event.preventDefault();

    const newItem = Item.toDB(nanoid(), addFormData.name, addFormData.amount, addFormData.price);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    }

    await fetch('/api/create', requestOptions).then(res => res.json()).then(setItems([...items, newItem]));
  };

  // Event handler for submit when editing
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

  // Event handler for edit button
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

  // Event handler to cancel edit item
  const handleCancelClick = () => {
    setEditItemId(null);
  };

  // Event handler for delete button
  const handleDeleteClick = (itemId) => {
    const newItems = [...items];

    const index = items.findIndex((item) => item.id === itemId);

    newItems.splice(index, 1);

    setItems(newItems);
  };

  // returns a table of inventory items in database
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Price($)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              // Determine whether row should be editable
              // Editable rows are front end for editing database entries
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
      {/* Form to add items to inventory */}
      {/* Takes input for name, amount, and price*/}
      {/* This is front end for new database entry*/}
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
