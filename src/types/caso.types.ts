
export type EstadoCaso = "Abierto" | "En Proceso" | "Cerrado";


export interface Caso {
  id: string;
  nombre: string;
  descripcion: string;
  estado: EstadoCaso;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export interface CasoFormData {
  nombre: string;
  descripcion: string;
  estado: EstadoCaso;
}


export interface CasosResponse {
  status: number;
  data: Caso[];
  meta: {
    total: number;
    page: number;
    limit?: number;
    lastPage?: number;
    totalPages?: number;
  };
}

export interface CasoResponse {
  message: string;
  id: string;
  nombre: string;
  descripcion: string;
  estado: EstadoCaso;
  activo: boolean;
}



export interface CasoResponse {
  status: number;
  message: string;
  data: Caso;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
