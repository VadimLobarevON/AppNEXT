'use client';
import React, { useState } from 'react';

const RegistrationForm = () => {
    // State variables to store form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [businessOperatingNumber, setBusinessOperatingNumber] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');
    const [businessLegalName, setBusinessLegalName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [mailingAddress, setMailingAddress] = useState('');

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState(null);
    // Add more state variables for other form fields

    // Event handler function to handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Construct the request body
        const formData = {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            business_operating_number: businessOperatingNumber,
            business_number: businessNumber,
            business_legal_name: businessLegalName,
            contact_number: contactNumber,
            business_address: businessAddress,
            mailing_address: mailingAddress
        };

        try {
            // Send POST request to the API endpoint
            const response = await fetch('http://20.175.202.147/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response)

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            // Registration successful
            setRegistrationSuccess(true);
            setError(null);

            // Redirect to the home page after successful registration
            window.location.href = "/";
        } catch (error) {
            console.error('Error:', error);
            setRegistrationSuccess(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <br />
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <br />
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <label>Business Operating Number:</label>
            <input type="text" value={businessOperatingNumber} onChange={(e) => setBusinessOperatingNumber(e.target.value)} required />
            <br />
            <label>Business Number:</label>
            <input type="text" value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)} required />
            <br />
            <label>Business Legal Name:</label>
            <input type="text" value={businessLegalName} onChange={(e) => setBusinessLegalName(e.target.value)} required />
            <br />
            <label>Contact Number:</label>
            <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
            <br />
            <label>Business Address:</label>
            <input type="text" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} required />
            <br />
            <label>Mailing Address:</label>
            <input type="text" value={mailingAddress} onChange={(e) => setMailingAddress(e.target.value)} required />
            <br />
            <button type="submit">Register</button>
        </form>

    );
};

export default RegistrationForm;
