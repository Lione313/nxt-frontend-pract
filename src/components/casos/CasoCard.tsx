"use client";

import React from "react";
import { Caso } from "@/types/caso.types";
import { Button } from "../ui/Button";
import Link from "next/link";

interface CasoCardProps {
  caso: Caso;
}

export const CasoCard: React.FC<CasoCardProps> = ({ caso }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{caso.nombre}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {caso.descripcion.length > 100
            ? caso.descripcion.substring(0, 100) + "..."
            : caso.descripcion}
        </p>
        <p className="text-sm font-medium text-gray-700">
          Estado: <span className="font-semibold">{caso.estado}</span>
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link href={`/dashboard/casos/${caso.id}`}>
          <Button variant="secondary" >
            Ver Detalle
          </Button>
        </Link>
        <Button
          variant="danger"
        
          onClick={() => alert(`Eliminar caso ${caso.id}`)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
