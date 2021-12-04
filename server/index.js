import express from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, query, where, deleteDoc, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

import config from "../config/default.json";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

// Set server port
const PORT = process.env.PORT || 3001;
const app = express();

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// GET Endpoint: Default endpoint on which the Express app is running on. Port 3001
app.get("/app", (req, res) => {
    res.json({ "message": "API working!" });
});

// GET Endpoint: Returns a JSON response of all the items in the current user's document in Firebase
// "items" collection based on the user UID
app.get("/app/:uid", async (req, res) => {
    let response = {};
    const userRef = doc(db, "items", req.params.uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
        response = { ...snap.data() };
        res.status(200).json(response);
    } else {
        res.status(200).json({ items: [] });
    }
});

// POST Endpoint: Adds an item to the user document in Firebase by updating the document with new array
// received from the frontend based on user UID
app.post("/app/create/:uid", async (req, res) => {
    if (!req.body) {
        return res.status(500).json({ "message": "Item is empty" });
    }
    const uid = req.params.uid;
    const data = { ...req.body };
    data.amount = parseInt(data.amount);
    data.price = parseFloat(data.price);
    await updateDoc(doc(db, "items", uid), { items: arrayUnion(data) });
    res.status(200).json({ "message": "Successfully added item to user doc." });
});

// PATCH Endpoint: Updates items in user document based on parameters changed in the frontend by updating
// the document with updated array received from frontend based on user UID
app.patch("/app/update/:uid", async (req, res) => {
    if (!req.body) {
        return res.status(500).json({ "message": "Item is empty" });
    }
    const uid = req.params.uid;
    const userRef = doc(db, "items", uid);
    const data = [...req.body];
    data.forEach(d => { d.price = parseFloat(d.price); d.amount = parseInt(d.amount); });
    await updateDoc(userRef, { items: data });
    res.status(200).json({ "message": "Item Updated!" });
});

// DELETE Endpoint: Deletes the current user from the database and removes its document in Firestore
// based on user UID
app.delete("/app/delete/:uid", async (req, res) => {
    const uid = req.params.uid;
    const userRef = doc(db, "items", uid);
    await deleteDoc(userRef);
    res.status(200).json({ "message": "User deleted" });
});

// USE Endpoint: Default response for any other request
app.use((req, res) => {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
})