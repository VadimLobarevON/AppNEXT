'use client'
import Header from '../../../components/Header';

const Profile = () => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <Header />
            <h1>Profile</h1>
            <p>This is the Profile page.</p>
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
        </div>
    );
};

export default Profile;
