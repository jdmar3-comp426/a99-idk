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

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//default api response
app.get("/api", (req, res) => {
    res.json({ "message": "API working!" });
});

// Read user
app.get("/api/:uid", async (req, res) => {
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

//create an item
app.post("/api/create/:uid", async (req, res) => {
    if (!req.body) {
        return res.status(500).json({ "message": "Item is empty" });
    }
    console.log(req.body);
    const uid = req.params.uid;
    await updateDoc(doc(db, "items", uid), { items: arrayUnion(req.body) });
});

//update an item
app.patch("/api/update/:uid", async (req, res) => {
    if (!req.body) {
        return res.status(500).json({ "message": "Item is empty" });
    }
    const uid = req.params.uid;
    const userRef = doc(db, "items", uid);
    await updateDoc(userRef, { items: req.body });
    res.status(200).json({ "message": "Item Updated!" });
});

// Default response for any other request
app.use((req, res) => {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
})