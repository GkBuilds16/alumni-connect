import { jwtDecode } from 'jwt-decode';

export function getRoleFromToken(): string | null {

  const token = localStorage.getItem('token');

  if (!token) return null;

  try {

    const decoded: any = jwtDecode(token);

    return decoded.role;

  } catch {

    return null;
  }
}