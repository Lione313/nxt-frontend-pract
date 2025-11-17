"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCasos } from "@/hooks/useCasos";
import { CasoCard } from "@/components/casos/CasoCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  FolderOpen,
  FilePlus,
  BarChart2,
  ListChecks,
} from "lucide-react";
import { useState } from "react";

export default function HomeDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [page, setPage] = useState(1);

const {
  casos,
  isLoading: casosLoading,
  lastPage
} = useCasos(page);


  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando dashboard..." />
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full flex flex-col pt-24">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">

        {/* SALUDO */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Hola, {user?.username || "Usuario"}
          </h2>
          <p className="text-gray-600 text-lg">
            Bienvenido al sistema de gestión de expedientes
          </p>
        </div>

        {/* GRID DE CARDS PRINCIPALES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
        

          {/* CARD 2 - NUEVO CASO */}
          <Link href="/dashboard/casos/nuevo" className="block">
            <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all p-6 h-full cursor-pointer flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Nuevo Caso</h3>
                <FilePlus className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-gray-600 text-sm">
                Crear un expediente desde cero.
              </p>
            </div>
          </Link>

          {/* CARD 3 - ESTADÍSTICAS */}
          <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all p-6 h-full cursor-pointer flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Estadísticas</h3>
              <BarChart2 className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-gray-600 text-sm">Reporte y métricas del sistema.</p>
          </div>

          {/* CARD 4 - LISTADO COMPLETO */}
          <Link href="/dashboard/casos" className="block">
            <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all p-6 h-full cursor-pointer flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Todos los Casos</h3>
                <ListChecks className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-gray-600 text-sm">
                Ver el listado completo de expedientes.
              </p>
            </div>
          </Link>
        </div>

        {/* CASOS RECIENTES */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Casos Recientes
          </h3>

          {casosLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" text="Cargando casos recientes..." />
            </div>
          ) : casos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {casos.slice(0, 3).map((caso) => (
                <CasoCard key={caso.id} caso={caso} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              No hay casos registrados.
            </p>
          )}

        </section>

      </main>
    </div>
  );
}
