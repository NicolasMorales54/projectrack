export interface User {
  id: number;
  nombre?: string;
  correoElectronico: string;
  rol?: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

export interface TokenPayload {
  userId: number;
  email: string;
  rol?: string;
  iat: number;
  exp: number;
}
