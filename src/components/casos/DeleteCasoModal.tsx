"use client";

import { Caso } from "@/types/caso.types";
import { Button } from "../ui/Button";

interface DeleteCasoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  caso?: Caso | null;
}

export default function DeleteCasoModal({
  open,
  onClose,
  onConfirm,
  caso,
}: DeleteCasoModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          ¿Eliminar caso?
        </h2>

        <p className="text-gray-600 mb-6">
          Estás a punto de eliminar el caso:  
          <span className="font-semibold text-gray-800">
            {caso?.nombre}
          </span>
          .  
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-3">
          <Button 
            variant="outline"
            className="border-gray-300"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </Button>
        </div>

      </div>
    </div>
  );
}
