"use client";

import { useEffect, useState, useCallback } from "react";
import { Caso } from "@/types/caso.types";
import { getCasos } from "../lib/api/casos.api";

export const useCasos = (page: number) => {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);

  // ⬅ Esta función se puede llamar desde afuera (refetch)
  const fetchCasos = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getCasos({ page, limit: 10 });

      setCasos(res.data);
      setLastPage(res.meta.lastPage ?? 1);
    } catch (error) {
      console.error("Error cargando casos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // Fetch automático al cambiar la página
  useEffect(() => {
    fetchCasos();
  }, [fetchCasos]);

  return {
    casos,
    isLoading,
    lastPage,
    refetch: fetchCasos, // ⬅ EXPORTADO
  };
};
