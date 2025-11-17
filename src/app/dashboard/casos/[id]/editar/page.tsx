"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCasoById, updateCaso } from "@/lib/api/casos.api";
import { Caso, EstadoCaso } from "@/types/caso.types";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function EditarCasoPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [caso, setCaso] = useState<Caso | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Campos editables
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<EstadoCaso>("Abierto");

  // 🔥 Normalizador para evitar errores de estado
  const normalizeEstado = (estadoStr: string): EstadoCaso => {
    if (estadoStr === "Abierto") return "Abierto";
    if (estadoStr === "En Proceso") return "En Proceso";
    if (estadoStr === "Cerrado") return "Cerrado";
    return "Abierto"; // fallback
  };

 const fetchCaso = async () => {
  try {
    const data = await getCasoById(id);
   
    setCaso(data);

    setNombre(data.nombre);
    setDescripcion(data.descripcion);
    setEstado(normalizeEstado(data.estado));
  } catch (err) {
    console.error("ERROR FETCH CASO:", err);
    setCaso(null);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchCaso();
  }, [id]);

  // GUARDAR CAMBIOS
  const handleSave = async () => {
    setSaving(true);

    try {
      await updateCaso(id, {
        nombre,
        descripcion,
        estado,
      });

      router.push("/dashboard/casos");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el expediente.");
    } finally {
      setSaving(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando expediente..." />
      </div>
    );
  }

  // 404
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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Editar expediente
      </h1>
      <p className="text-gray-600 mb-8">
        Modifica la información del caso.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 space-y-6">

        {/* NOMBRE */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        {/* ESTADO */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as EstadoCaso)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Abierto">Abierto</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>

        {/* ACCIONES */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="secondary"
            onClick={() => router.push("/dashboard/casos")}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}
