import React, { useState } from 'react';
import ApiService from './ApiService';

const ClientSignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const signupData = {
      email,
      password,
    };
    try {
      const response = await ApiService.registerClient(signupData);
      // Handle successful signup (e.g., show success message, redirect, etc.)
      console.log('Client registered successfully!', response);
      // Reset form fields or any necessary state variables here
    } catch (error) {
      // Handle error (e.g., show error message to the user)
      console.error('Error registering client:', error.message);
      // Perform actions like displaying an error message or logging the error
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Client Login</h2>
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
        onClick={handleSignup}
      >
        Login
      </button>
    </div>
  );
};

export default ClientSignupForm;
