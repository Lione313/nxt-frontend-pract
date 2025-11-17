"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { isRequired, minLength } from "@/lib/utils/validators";
import { capitalize } from "@/lib/utils/formatters";

interface FormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Validación usando validators.ts
  const validate = (): boolean => {
    if (!isRequired(formData.username)) {
      toast({ title: "Usuario requerido", description: "Por favor ingresa tu usuario o email.", variant: "destructive" });
      return false;
    }
    if (!isRequired(formData.password)) {
      toast({ title: "Contraseña requerida", description: "Por favor ingresa tu contraseña.", variant: "destructive" });
      return false;
    }
    if (!minLength(formData.password, 6)) {
      toast({ title: "Contraseña muy corta", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await login(formData);

      toast({
        title: "¡Inicio de sesión exitoso!",
        description: `Bienvenido, ${capitalize(formData.username)}!`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error?.message || "Ocurrió un error inesperado. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E0BAQE1p45-Zu0Gqg/company-logo_200_200/B4EZdNeVo1HgAI-/0/1749351488642?e=1764806400&v=beta&t=ufhs81tvjWxqfmhngFWIBibXQh8oul9JGPuhXSOShKE"
                alt="Logo"
                width={64}
                height={64}
                className="rounded-2xl object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
            <p className="text-gray-500">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Formulario */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Usuario o Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="usuario@ejemplo.com"
                  autoComplete="username"
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Crear cuenta
          </a>
        </p>
      </div>
    </div>
  );
}
