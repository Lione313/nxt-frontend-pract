import { useContext } from "react";
import { ToastContext, ToastContextType } from "@/components/ui/Toast";

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }
  return context;
};
