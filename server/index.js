import express from "express";
import config from "config";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config.get('firebaseConfig');
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

//read all items
app.get("/api/all", async (req, res) => {
    let response = [];
    const itemsRef = collection(db, "items");
    const q = query(itemsRef);
    const snap = await getDocs(q); //if this is not null, then return

    snap.forEach((doc) => {
        response.push(doc.data());
    });
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

//delete a specific item
app.delete("/api/delete/:item", async (req, res) => {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("name", "==", req.params.item));
    const snap = await getDocs(q);
    snap.forEach((doc) => {
        deleteDoc(doc.ref);
    });
    res.status(200).json({ "message": "Item Deleted!" });
});

//create an item
app.post("/api/create", async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(500).json({ "message": "Item is empty" });
    }
    const itemsRef = collection(db, "items");
    await setDoc(doc(db, "items", req.body.id), { ...req.body });
});

//update an item
app.patch("/api/update", async (req, res) => {
    if (!req.body) {
        return res.status(500).json({ "message": "Item is empty" });
    }
    const itemsRef = collection(db, "items");
    await updateDoc(doc(db, "items", req.body.id), { ...req.body});
    res.status(200).json({ "message": "Item Updated!" });
});

// Default response for any other request
app.use((req, res) => {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
})