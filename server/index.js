import express from "express";
import config from "config";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = config.get('firebaseConfig');
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

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

// Default response for any other request
app.use((req, res) => {
    res.json({ "message": "Endpoint not found. (404)" });
    res.status(404);
})
