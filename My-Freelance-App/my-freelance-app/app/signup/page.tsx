'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
        credentials: 'include' // Important for cookies
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      
      toast.success('Signup successful!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(` ${err.message}`);
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

       
      </form>
    </div>
  );
}