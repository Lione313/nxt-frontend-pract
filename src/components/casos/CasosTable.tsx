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
  refresh?: () => void;
}

export const CasosTable: React.FC<CasosTableProps> = ({ casos, refresh }) => {
  const router = useRouter();

  const [openDelete, setOpenDelete] = React.useState(false);
  const [casoToDelete, setCasoToDelete] = React.useState<Caso | null>(null);

  const handleDelete = (caso: Caso) => {
    setCasoToDelete(caso);
    setOpenDelete(true);
  };

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

  const estadoBadge = (estado: string) => {
    const colors: Record<string, string> = {
      Abierto: "bg-green-100 text-green-700",
      "En Proceso": "bg-yellow-100 text-yellow-700",
      Cerrado: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${colors[estado]}`}
      >
        {estado}
      </span>
    );
  };

  return (
    <>
     <div className="bg-white shadow-md rounded-xl border border-gray-100">
  {/* Contenedor con altura fija y scroll */}
  <div className="max-h-[500px] overflow-y-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            Nombre
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            Descripción
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
            Estado
          </th>
          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
            Acciones
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {casos.map((caso) => (
          <tr key={caso.id} className="hover:bg-gray-50 transition">
            {/* Nombre */}
            <td className="px-4 py-3 text-sm font-medium text-gray-900">{caso.nombre}</td>

            {/* Descripción */}
            <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs">{caso.descripcion}</td>

            {/* Estado */}
            <td className="px-4 py-3 text-sm">{estadoBadge(caso.estado)}</td>

            {/* Acciones */}
            <td className="px-4 py-3 text-sm">
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/dashboard/casos/${caso.id}`)}
                  className="flex items-center gap-1 px-2 py-1 text-xs"
                >
                  <Eye className="w-4 h-4" /> Ver
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/dashboard/casos/${caso.id}/editar`)}
                  className="flex items-center gap-1 px-2 py-1 text-xs"
                >
                  <Pencil className="w-4 h-4" /> Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(caso)}
                  className="flex items-center gap-1 px-2 py-1 text-xs"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Modal de eliminación */}
      <DeleteCasoModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
        caso={casoToDelete}
      />
    </>
  );
};
