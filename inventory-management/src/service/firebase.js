import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import config from "../config/default.json"

const firebaseConfig = config.firebaseConfig;

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(email, password);
        const user = res.user;
        const query = await db.collection("items").add({
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const signOut = () => {
    auth.signOut();
}

export { auth, signIn, registerWithEmailAndPassword, signOut }