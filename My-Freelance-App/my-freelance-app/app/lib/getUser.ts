export const getUser = async () => {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Unauthorized');
  return data;
};
