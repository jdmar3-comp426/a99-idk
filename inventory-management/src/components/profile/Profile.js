import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, updateProfileNameEmail, deleteProfile } from "../../service/firebase";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    })
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const fetchUser = async () => {
        try {
            const uid = user?.uid;
            if (uid) {
                await fetch(`api/${uid}`).then(res => res.json()).then(data => { setUserData(data) });

            }
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) {
            navigate('/');
        }
        fetchUser();
    }, [user, loading]);

    const handleFormSubmit = async e => {
        // await updateProfileNameEmail(userData.name, userData.email);
        // const requestOptions = {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userData),
        // }

        // await fetch(`/api/profile/${user.uid}/update`, requestOptions).then(navigate('/inventory'));

    }
    const handleNameChange = e => {
        setUserData({
            ...userData,
            name: e.target.value,
        });
    }
    const handleEmailChange = e => {
        setUserData({
            ...userData,
            email: e.target.value,
        });
    }
    // const handleDeleteUser = async e => {
    //     await deleteProfile(userData.name, userData.email);
    //     await fetch(`/api/profile/${user.uid}/delete`)
    //     navigate('/');
    // }
    return (
        <div class="profile-container">
            <Link to="/inventory">Back to Inventory</Link>
            <form onSubmit={handleFormSubmit}>
                <input value={userData.name} onChange={handleNameChange}></input>
                <input value={userData.email} onChange={handleEmailChange}></input>
                <button type="submit">Save Changes</button>
            </form>
            {/* <button onClick={handleDeleteUser}>Delete User</button> */}
        </div>
    );
}
export default Profile;