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

  // ⬅️ AHORA INCLUIMOS refetch
  const { casos, isLoading, lastPage, refetch } = useCasos(page);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando expedientes..." />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expedientes</h1>
          <p className="text-gray-600 mt-1">Gestión y control de casos legales.</p>
        </div>

        <Link href="/dashboard/casos/nuevo">
          <Button variant="primary" className="flex items-center gap-2 px-4 py-2">
            <FilePlus className="w-5 h-5" />
            Crear expediente
          </Button>
        </Link>
      </div>

      {/* CONTENT */}
      {casos.length > 0 ? (
        <>
          <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 border border-gray-100 overflow-x-auto">
            
            {/* 🔥 Ahora se pasa refresh */}
            <CasosTable casos={casos} refresh={refetch} />
          </div>

          <div className="mt-6">
            <Pagination
              page={page}
              lastPage={lastPage}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <FolderOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            No hay expedientes registrados
          </h2>
          <p className="text-gray-500 mt-2 mb-6">
            Empieza creando tu primer caso.
          </p>

          <Link href="/dashboard/casos/nuevo">
            <Button variant="primary" className="flex items-center gap-2 px-4 py-2">
              <FilePlus className="w-5 h-5" />
              Crear expediente
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
