import api from "./axios";
import { AuthCredentials } from "@/types/auth.types";


export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: string;
}

export interface RegisterResponse {
  message: string;
}

export const loginUser = async (
  credentials: AuthCredentials
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data; 
};

export const registerUser = async (
  credentials: AuthCredentials
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", credentials);
  return data; 
};
