import React, { useState } from 'react';
import ApiService from './ApiService';

const DeveloperLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };
    try {
      const response = await ApiService.registerDeveloper(loginData);
      // Handle successful login (e.g., set user authentication token in local storage, redirect, etc.)
      console.log('Developer logged in successfully!', response);
      // Reset form fields or any necessary state variables here
    } catch (error) {
      // Handle error (e.g., show error message to the user)
      console.error('Error logging in:', error.message);
      // Perform actions like displaying an error message or logging the error
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Developer Login</h2>
      <input
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default DeveloperLoginForm;
