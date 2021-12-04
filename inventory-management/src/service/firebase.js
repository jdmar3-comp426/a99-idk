import { initializeApp } from "@firebase/app";
import { getFirestore, setDoc, doc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import config from "../config/default.json"

const firebaseConfig = config.firebaseConfig;

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "items", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            items: [],
            authProvider: "local",
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