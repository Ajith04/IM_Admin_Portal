import jwt_decode from 'jwt-decode';

export function getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = jwt_decode(token);
    return decodedToken.Role || null;
}
