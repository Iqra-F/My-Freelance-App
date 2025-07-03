// components/LogoutButton.tsx
'use client';

import { logoutUser } from '@/utils/logout';

export default function LogoutButton() {
  return <button onClick={logoutUser}>Logout</button>;
}
