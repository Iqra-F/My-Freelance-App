'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, role }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      toast.success('Signup successful!');
      toast.success('Welcome email sent to your inbox.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(`${err.message}`);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        toast('⚠️ You are already logged in. Redirecting to your dashboard...', {
          position: 'top-center',
        });
        router.push('/dashboard');
      }
    };
    checkAuth();
  }, [router]);

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Role</option>
          <option value="candidate">Candidate</option>
          <option value="employee">Employee</option>
        </select>

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
