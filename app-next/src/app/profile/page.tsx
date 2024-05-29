'use client'
import { useState } from 'react';
import Header from '../../../components/Header';

const Profile = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
    const [editing, setEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({ ...userData });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleSave = () => {
        console.log("Updated User Data:", editedUserData);
        localStorage.setItem("user", JSON.stringify(editedUserData));
        fetch("http://20.175.202.147/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: editedUserData.userid,
                email: editedUserData.email,
                password: editedUserData.password,
                first_name: editedUserData.first_name,
                last_name: editedUserData.last_name,
                business_operating_number: editedUserData.business_operating_number,
                business_number: editedUserData.business_number,
                business_legal_name: editedUserData.business_legal_name,
                contact_number: editedUserData.contact_number,
                business_address: editedUserData.business_address,
                mailing_address: editedUserData.mailing_address
            })
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

        setUserData(editedUserData);
        setEditing(false);
    };

    return (
        <div>
            <Header />
            <h1>Profile</h1>
            <p>This is the Profile page.</p>
            {userData && (
                <>
                    {!editing ? (
                        <div>
                            <h2>User Information:</h2>
                            <ul>
                                <li>Email: {userData.email}</li>
                                <li>Password: {userData.password}</li>
                                <li>First Name: {userData.first_name}</li>
                                <li>Last Name: {userData.last_name}</li>
                                <li>Business Operating Number: {userData.business_operating_number}</li>
                                <li>Business Number: {userData.business_number}</li>
                                <li>Business Legal Name: {userData.business_legal_name}</li>
                                <li>Contact Number: {userData.contact_number}</li>
                                <li>Business Address: {userData.business_address}</li>
                                <li>Mailing Address: {userData.mailing_address}</li>
                            </ul>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                        </div>
                    ) : (
                        <div>
                            <h2>Edit Profile Information:</h2>
                            <form>
                            Email: {userData.email}
                            <br />
                                <label>Password:</label>
                                <input type="password" name="password" value={editedUserData.password} onChange={handleInputChange} /><br />
                                <label>First Name:</label>
                                <input type="text" name="first_name" value={editedUserData.first_name} onChange={handleInputChange} /><br />
                                <label>Last Name:</label>
                                <input type="text" name="last_name" value={editedUserData.last_name} onChange={handleInputChange} /><br />
                                <label>Business Operating Number:</label>
                                <input type="text" name="business_operating_number" value={editedUserData.business_operating_number} onChange={handleInputChange} /><br />
                                <label>Business Number:</label>
                                <input type="text" name="business_number" value={editedUserData.business_number} onChange={handleInputChange} /><br />
                                <label>Business Legal Name:</label>
                                <input type="text" name="business_legal_name" value={editedUserData.business_legal_name} onChange={handleInputChange} /><br />
                                <label>Contact Number:</label>
                                <input type="text" name="contact_number" value={editedUserData.contact_number} onChange={handleInputChange} /><br />
                                <label>Business Address:</label>
                                <input type="text" name="business_address" value={editedUserData.business_address} onChange={handleInputChange} /><br />
                                <label>Mailing Address:</label>
                                <input type="text" name="mailing_address" value={editedUserData.mailing_address} onChange={handleInputChange} /><br />
                            </form>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setEditing(false)}>Cancel</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Profile;
