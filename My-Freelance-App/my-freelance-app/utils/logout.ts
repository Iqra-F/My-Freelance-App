'use client';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        toast.success('Logged out');
        router.push('/login');
      } else {
        toast.error('Failed to log out');
      }
    } catch (err: any) {
      toast.error('Error logging out');
    }
  };

  return logout;
}
