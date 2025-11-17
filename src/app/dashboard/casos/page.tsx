"use client";

import { useState } from "react";
import { useCasos } from "@/hooks/useCasos";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { CasosTable } from "@/components/casos/CasosTable";
import { Pagination } from "@/components/ui/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FilePlus, FolderOpen } from "lucide-react";

export default function CasosPage() {
  const [page, setPage] = useState(1);
  const { casos, isLoading, lastPage, refetch } = useCasos(page);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando expedientes..." />
      </div>
    );
  }

  return (
    // Contenedor principal que ocupa toda la altura disponible
    <div className="h-full flex flex-col overflow-hidden">
      {/* HEADER - Fijo arriba */}
      <div className="flex-none px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                Expedientes
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Gestión y control de casos legales.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link href="/dashboard/casos/nuevo" className="block">
                <Button 
                  variant="primary" 
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>Crear expediente</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT - Con flex para distribución vertical */}
      {casos.length > 0 ? (
        <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">
            {/* Tabla - Crece para ocupar el espacio disponible */}
            <div className="flex-1 bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden min-h-0">
              <div className="h-full p-4 sm:p-6 flex flex-col overflow-hidden">
                <CasosTable casos={casos} refresh={refetch} />
              </div>
            </div>

            {/* Paginación - Fija abajo */}
            <div className="flex-none pt-4 sm:pt-6">
              <Pagination
                page={page}
                lastPage={lastPage}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Estado vacío - Centrado en el espacio disponible */
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              No hay expedientes registrados
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-8">
              Empieza creando tu primer caso para gestionar tus expedientes legales.
            </p>

            <Link href="/dashboard/casos/nuevo" className="block">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto mx-auto flex items-center justify-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl transition-all"
              >
                <FilePlus className="w-5 h-5" />
                <span>Crear primer expediente</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}