'use client';

import { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/signup', {
        fullName,
        email,
        password,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="p-6 bg-white shadow-md rounded space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Sign Up
        </button>

        {message && (
          <p className="text-sm text-center text-gray-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
