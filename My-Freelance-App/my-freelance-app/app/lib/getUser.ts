
export async function getUser() {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  const data = await res.json();
  return data; // now includes: uid, email, fullName, role
}
