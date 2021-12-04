import { initializeApp } from "@firebase/app";
import { getFirestore, getDoc, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, setPersistence, browserSessionPersistence, deleteUser } from 'firebase/auth';
import config from "../config/default.json"

const firebaseConfig = config.firebaseConfig;

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

setPersistence(auth, browserSessionPersistence).then().catch(err => {
    console.log(err.message)
});

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
        console.log("registered user as doc");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const signOut = () => {
    auth.signOut();
}

const deleteProfile = async () => {
    const user = auth.currentUser;
    await fetch(`/app/delete/${user.uid}`);
    await deleteUser(user);
}

export { auth, signIn, registerWithEmailAndPassword, signOut, deleteProfile }