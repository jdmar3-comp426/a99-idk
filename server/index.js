import express from "express";
import config from "config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config.get('firebaseConfig');
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

export const db = getFirestore();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({ "message": "API working!" });
});

//read all items
app.get("/api/all", async (req, res) => {
    let response = [];
    const itemsRef = collection(db, "items");
    const q = query(itemsRef);
    const snap = await getDocs(q); //if this is not null, then return

    snap.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        response.push(doc.data());
    })
    res.status(200).json(response);
});

//read specific item
app.get("/api/:item", async (req, res) => {
    let response = [];
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("name", "==", req.params.item));
    const snap = await getDocs(q); //if this is not null, then return

    snap.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        response.push(doc.data());
    })
    res.status(200).json(response);
});


//app.post to set data

// Default response for any other request
app.use((req, res) => {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
})

