"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Caso } from "@/types/caso.types";
import { Button } from "../ui/Button";
import { deleteCaso } from "@/lib/api/casos.api";
import { Trash2, Pencil, Eye } from "lucide-react";
import DeleteCasoModal from "@/components/casos/DeleteCasoModal";

interface CasosTableProps {
  casos: Caso[];
  refresh?: () => void; // Para recargar la lista tras eliminar
}

export const CasosTable: React.FC<CasosTableProps> = ({ casos, refresh }) => {
  const router = useRouter();

  // Modal states
  const [openDelete, setOpenDelete] = React.useState(false);
  const [casoToDelete, setCasoToDelete] = React.useState<Caso | null>(null);

  // Abrir modal
  const handleDelete = (caso: Caso) => {
    setCasoToDelete(caso);
    setOpenDelete(true);
  };

  // Confirmar eliminación
  const confirmDelete = async () => {
    if (!casoToDelete) return;

    try {
      await deleteCaso(casoToDelete.id);
      refresh?.();
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDelete(false);
      setCasoToDelete(null);
    }
  };

  // --- ESTILO DEL ESTADO ---
  const estadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      Abierto: "bg-green-100 text-green-700",
      "En Proceso": "bg-yellow-100 text-yellow-700",
      Cerrado: "bg-red-100 text-red-700",
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[estado]}`}>
        {estado}
      </span>
    );
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {casos.map((caso) => (
              <tr key={caso.id} className="hover:bg-gray-50 transition">
                
                {/* Nombre */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {caso.nombre}
                </td>

                {/* Descripción */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {caso.descripcion}
                </td>

                {/* Estado */}
                <td className="px-6 py-4 text-sm">
                  {estadoBadge(caso.estado)}
                </td>

                {/* Acciones */}
                <td className="px-6 py-4 text-right text-sm space-x-2 flex justify-end">

                  {/* Ver */}
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/dashboard/casos/${caso.id}`)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> Ver
                  </Button>

                  {/* Editar */}
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/dashboard/casos/${caso.id}/editar`)}
                    className="flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Editar
                  </Button>

                  {/* Eliminar */}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(caso)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <DeleteCasoModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
        caso={casoToDelete}
      />
    </>
  );
};
