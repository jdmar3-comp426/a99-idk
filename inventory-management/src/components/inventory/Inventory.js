import React, { useState, useEffect, Fragment } from "react";
import { auth, signOut, fetchUser } from "../../service/firebase";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { nanoid } from "nanoid";

import data from "../../mock-data.json";
import ReadOnlyRow from "../ReadOnlyRow";
import EditableRow from "../EditableRow";
import Item from "../../models/item";


import './Inventory.css';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState({
        email: '',
        items: [],
        name: '',
        uid: '',
        authProvider: '',
    });
    const navigate = useNavigate();
    const fetchUser = async () => {
        try {
            const uid = user?.uid;
            if (uid) {
                await fetch(`api/${uid}`).then(res => res.json()).then(data => { setUserData(data); setItems(data.items) });

            }
        } catch (err) {
            console.error(err);
        }
    }
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
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            navigate('/');
        }
        fetchUser();
        // fetch("/api/all").then(res => res.json()).then(data => { console.log(data); setItems(data) });
    }, [user, loading]);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();

        const newItem = Item.toDB(nanoid(), addFormData.name, addFormData.amount, addFormData.price);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        }

        await fetch(`/api/create/${user.uid}`, requestOptions).then(setItems([...items, newItem]));
    };

    const handleEditFormSubmit = async (event) => {
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

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItems),
        }

        await fetch(`/api/update/${user.uid}`, requestOptions).then(() => {
            setItems(newItems); setEditItemId(null);
        });
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

    const handleDeleteClick = async (itemId) => {
        const newItems = [...items];

        const index = items.findIndex((item) => item.id === itemId);

        newItems.splice(index, 1);
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItems),
        }
        await fetch(`/api/update/${user.uid}`, requestOptions).then(setItems(newItems));
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
                <span className="currencyinput">$
                    <input
                        type="number"
                        className="currency"
                        step="0.01"
                        name="price"
                        required="required"
                        placeholder="0.00"
                        onChange={handleAddFormChange}
                    />
                </span>

                <button type="submit">Add</button>
            </form>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}

export default Inventory;