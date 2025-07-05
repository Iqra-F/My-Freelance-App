'use client'
import { useLogout } from '@/utils/logout';
import { useEffect, useState } from 'react';
import { getUser } from '@/app/lib/getUser';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Session expired. Please log in again.');
        router.push('/login');
      });
  }, [router]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="animate-pulse text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-pink-700 mb-2">Welcome, {user.fullName || user.email}</p>
      <p className="text-gray-600 text-sm mb-6">Role: <span className="font-semibold">{user.role}</span></p>

      {user.role === 'candidate' && (
        <div className="bg-blue-100 p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold mb-2">Candidate Panel</h2>
          <p>You can create your CV, view jobs, and apply.</p>
        </div>
      )}

      {user.role === 'employee' && (
        <div className="bg-green-100 p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold mb-2">Employee Panel</h2>
          <p>You can post jobs and manage applications.</p>
        </div>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
