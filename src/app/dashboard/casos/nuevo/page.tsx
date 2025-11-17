"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createCaso } from "@/lib/api/casos.api";
import { toast } from "sonner";

// React Hook Form + Zod
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ICONS
import { FilePlus2, Loader2 } from "lucide-react";

// --- VALIDATION SCHEMA ---
const CasoSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  estado: z.enum(["Abierto", "En Proceso", "Cerrado"]),
});

type CasoSchemaType = z.infer<typeof CasoSchema>;

export default function NuevoCasoPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CasoSchemaType>({
    resolver: zodResolver(CasoSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      estado: "Abierto",
    },
  });

  const onSubmit = async (data: CasoSchemaType) => {
    setIsCreating(true);

    try {
      await createCaso(data);

      toast.success("Caso creado correctamente 🎉", {
        description: "El expediente se registró sin problemas.",
      });

      router.push("/dashboard/casos");
    } catch (err) {
      console.error(err);
      toast.error("Error al crear el caso", {
        description: "Intenta nuevamente.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Expediente</h1>
        <p className="text-gray-600">
          Registra la información del nuevo caso legal.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md border border-gray-100 rounded-xl p-6 sm:p-8 space-y-6"
      >
        {/* NOMBRE */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Nombre</label>
          <input
            {...register("nombre")}
            type="text"
            placeholder="Ej. Caso de propiedad"
            className={`w-full border rounded-lg px-3 py-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* DESCRIPCION */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            {...register("descripcion")}
            rows={4}
            placeholder="Describe brevemente el caso…"
            className={`w-full border rounded-lg px-3 py-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.descripcion ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.descripcion && (
            <p className="text-red-600 text-sm mt-1">
              {errors.descripcion.message}
            </p>
          )}
        </div>

        {/* ESTADO */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">Estado</label>
          <select
            {...register("estado")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Abierto">Abierto</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          fullWidth
          disabled={isCreating}
          className="flex items-center justify-center gap-2"
        >
          {isCreating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creando...
            </>
          ) : (
            <>
              <FilePlus2 className="h-5 w-5" />
              Crear Caso
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
