// Usuario
export interface User {
  id: string;
  username: string;
}

// Credenciales de login/register
export interface AuthCredentials {
  username: string;
  password: string;
}

// Respuesta del backend en login (SIN data anidado)
export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: string;
}

// Respuesta del backend en register (SIN data anidado)
export interface RegisterResponse {
  message: string;
}

// Context de autenticación
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}