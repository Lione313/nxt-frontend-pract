const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || "auth_token";

/**
 * Guardar token en localStorage Y cookies
 */
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    // Guardar en localStorage
    localStorage.setItem(TOKEN_KEY, token);
    
    // Guardar en cookies (para que el middleware pueda leerlo)
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 días
  }
};

/**
 * Obtener token de localStorage o cookies
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Primero intentar localStorage
    const tokenFromStorage = localStorage.getItem(TOKEN_KEY);
    if (tokenFromStorage) return tokenFromStorage;

    // Si no está en localStorage, buscar en cookies
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((c) => c.startsWith(`${TOKEN_KEY}=`));
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
  }
  return null;
};

/**
 * Eliminar token de localStorage Y cookies
 */
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    // Eliminar de localStorage
    localStorage.removeItem(TOKEN_KEY);
    
    // Eliminar de cookies
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  }
};

/**
 * Verificar si existe un token
 */
export const hasToken = (): boolean => {
  return !!getToken();
};