"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCasoById } from "@/lib/api/casos.api";
import { Caso } from "@/types/caso.types";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Circle } from "lucide-react"; // icono para estado

export default function PreviewCasoPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [caso, setCaso] = useState<Caso | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCaso = async () => {
    try {
      const data = await getCasoById(id);
      setCaso(data);
    } catch (err) {
      setCaso(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaso();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando expediente..." />
      </div>
    );
  }

  if (!caso) {
    return (
      <div className="text-center mt-24">
        <h1 className="text-3xl font-bold text-gray-800">404</h1>
        <p className="text-gray-600 mt-2">Expediente no encontrado.</p>

        <Button
          className="mt-6"
          variant="primary"
          onClick={() => router.push("/dashboard/casos")}
        >
          Volver a la lista
        </Button>
      </div>
    );
  }

  const estadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      Abierto: "bg-green-100 text-green-800",
      "En Proceso": "bg-yellow-100 text-yellow-800",
      Cerrado: "bg-red-100 text-red-800",
    };

    const iconColors: Record<string, string> = {
      Abierto: "text-green-500",
      "En Proceso": "text-yellow-500",
      Cerrado: "text-red-500",
    };

    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-30 font-medium">
        <Circle className={`w-3 h-3 ${iconColors[estado]}`} />
        <span className={`${colors[estado]} px-2 py-0.5 rounded-full`}>{estado}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Vista del expediente</h1>
      <p className="text-gray-600 mb-8">
        Consulta los detalles del caso sin posibilidad de edición.
      </p>

      <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 space-y-8">
        {/* NOMBRE */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-700">Nombre</h2>
          <p className="text-gray-900 text-lg mt-2 sm:mt-0">{caso.nombre}</p>
        </div>
        <hr className="border-gray-200" />

        {/* DESCRIPCIÓN */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-700">Descripción</h2>
          <p className="text-gray-900 mt-2 sm:mt-0">{caso.descripcion}</p>
        </div>
        <hr className="border-gray-200" />

        {/* ESTADO */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-700">Estado</h2>
          <div className="mt-2 sm:mt-0">{estadoBadge(caso.estado)}</div>
        </div>

        {/* ACCIONES */}
        <div className="flex justify-end pt-4">
          <Button
            variant="secondary"
            onClick={() => router.push("/dashboard/casos")}
          >
            Volver a la lista
          </Button>
        </div>
      </div>
    </div>
  );
}
