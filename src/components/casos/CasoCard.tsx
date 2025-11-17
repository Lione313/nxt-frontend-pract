"use client";

import React from "react";
import { Caso } from "@/types/caso.types";
import Link from "next/link";
import { Button } from "../ui/Button";

interface CasoCardProps {
  caso: Caso;
}

export const CasoCard: React.FC<CasoCardProps> = ({ caso }) => {
  return (
    <div className="bg-white backdrop-blur-sm rounded-2xl border-4 border-purple-50 shadow-md hover:shadow-lg transition-transform duration-400 ease-in-out p-5 flex flex-col justify-between hover:scale-105">
      {/* HEADER */}
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{caso.nombre}</h3>
        <p className="text-gray-500 text-sm">
          {caso.descripcion.length > 100
            ? caso.descripcion.substring(0, 100) + "..."
            : caso.descripcion}
        </p>
      </div>

      {/* ESTADO */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">Estado:</span>
        <span
          className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
            caso.estado.toLowerCase() === "activo"
              ? "bg-green-100 text-green-800"
              : caso.estado.toLowerCase() === "pendiente"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {caso.estado}
        </span>
      </div>

      {/* ACCIÓN */}
      <div className="mt-auto">
        <Link href={`/dashboard/casos/${caso.id}`}>
          <Button
            variant="secondary"
            className="w-full hover:bg-blue-600 hover:text-white transition-colors"
          >
            Ver Detalle
          </Button>
        </Link>
      </div>
    </div>
  );
};
