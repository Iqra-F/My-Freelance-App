'use client';

import { useLogout } from '@/utils/logout';
import { useEffect, useState } from 'react';
import { getUser } from '@/app/lib/getUser';
import { error } from 'node:console';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const logout = useLogout();
  useEffect(() => {
    getUser()
      .then(setUser)
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h1 className="text-2xl font-bold mb-4">
      <div className='text-pink-700'>{user?.email ? `Welcome ${user.email}` : 'Loading...'}</div>
      </h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
