"use client";

import { createContext, useState, ReactNode } from "react";
import { X } from "lucide-react";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export type ToastContextType = {
  toast: (toast: Omit<Toast, "id">) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

let idCounter = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (toastData: Omit<Toast, "id">) => {
    const id = idCounter++;
    setToasts((prev) => [...prev, { id, ...toastData }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-xl shadow-lg border ${
              t.variant === "destructive"
                ? "bg-red-50 border-red-300 text-red-800"
                : "bg-white border-gray-200 text-gray-900"
            } flex items-center justify-between min-w-[250px] max-w-sm`}
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              {t.description && <p className="text-sm">{t.description}</p>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
