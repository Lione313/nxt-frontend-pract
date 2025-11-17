"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/api/auth.api";
import { setToken, getToken, removeToken } from "./authHelpers";
import { AuthContextType, AuthCredentials, User } from "@/types/auth.types";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

 useEffect(() => {
  const storedToken = getToken();
  if (storedToken) {
    setTokenState(storedToken);

    try {
      const decoded: { username: string; id?: string } = jwtDecode(storedToken);
      setUser({
        id: decoded.id || "",
        username: decoded.username,
      });
    } catch (error) {
      console.error("Token inválido", error);
      setUser(null);
    }
  }
  setIsLoading(false);
}, []);

  const login = async (credentials: AuthCredentials) => {
    try {
      // loginUser devuelve directamente: { message, token, expiresIn }
      const response = await loginUser(credentials);

      console.log("Response del login:", response);

      // El token viene directamente en response.token (NO response.data.token)
      const tokenFromBackend = response.token;

      if (!tokenFromBackend) {
        throw new Error("Token no recibido del servidor");
      }

      // Guardar token
      setToken(tokenFromBackend);
      setTokenState(tokenFromBackend);

      // Guardar usuario (creamos uno básico con el username)
      const userData: User = {
        id: "",
        username: credentials.username,
      };
      setUser(userData);

      console.log("✅ Login exitoso, redirigiendo a dashboard...");

      // Forzar recarga y redirección
      setTimeout(() => {
        router.push("/dashboard/homeDashboard");
        router.refresh();
      }, 100);
    } catch (error: any) {
      console.error("❌ Error en login:", error);
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión"
      );
    }
  };

  const register = async (credentials: AuthCredentials) => {
    try {
      // registerUser devuelve: { message }
      const response = await registerUser(credentials);
      console.log("✅ Registro exitoso:", response.message);

      // Login automático después de registrar
      await login(credentials);
    } catch (error: any) {
      console.error("❌ Error en register:", error);
      throw new Error(
        error.response?.data?.message || "Error al registrar usuario"
      );
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};