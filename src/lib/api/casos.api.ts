import api from "./axios";
import {
  Caso,
  CasosResponse,
  CasoResponse,
  CasoFormData,
  EstadoCaso,
} from "@/types/caso.types";
import { PaginationParams } from "@/types/api.types";

// Obtener lista de casos activos con paginación
export const getCasos = async (
  params: PaginationParams = { page: 1, limit: 10 }
): Promise<CasosResponse> => {
  const response = await api.get<CasosResponse>("/casos", { params });
  return response.data;
};

// Obtener un caso activo por ID
export const getCasoById = async (id: string): Promise<Caso> => {
  const response = await api.get<CasoResponse>(`/casos/${id}`);
  return response.data; // <- aquí quitamos ".data"
};


// Crear un nuevo caso
export const createCaso = async (data: CasoFormData): Promise<Caso> => {
  const response = await api.post<CasoResponse>("/casos", data);
  return response.data.data;
};

// Actualizar un caso existente (solo campos permitidos)
export const updateCaso = async (
  id: string,
  data: Partial<CasoFormData> & { estado?: EstadoCaso }
): Promise<Caso> => {
  const response = await api.put<CasoResponse>(`/casos/${id}`, data);
  return response.data.data;
};

// Eliminación lógica de un caso
export const deleteCaso = async (id: string): Promise<void> => {
  await api.delete(`/casos/${id}`);
};
