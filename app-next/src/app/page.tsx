'use client';
import React, { useState } from 'react';
import { json } from 'stream/consumers';

const LoginForm = () => {
  // State variables to store login credentials and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct the request body
    const formData = {
      email,
      password,
    };

    try {
      // Send POST request to the login API endpoint
      const response = await fetch('http://20.175.202.147/user/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response.body)

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Redirect to the home page after successful login
      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "/profile";
    } catch (error) {
      console.error('Error:', error);
      // setLoginError('Invalid_email_or_password');
    }
  };
  const handleRegister = () => {
    window.location.href = "/register"
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default LoginForm;
