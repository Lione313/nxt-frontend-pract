"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isRequired, minLength } from "@/lib/utils/validators";
import { capitalize } from "@/lib/utils/formatters";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    if (!isRequired(formData.username)) {
      toast({ title: "Usuario requerido", description: "Por favor ingresa un nombre de usuario.", variant: "destructive" });
      return false;
    }

    if (!isRequired(formData.password)) {
      toast({ title: "Contraseña requerida", description: "Por favor ingresa una contraseña.", variant: "destructive" });
      return false;
    }

    if (!minLength(formData.password, 6)) {
      toast({ title: "Contraseña muy corta", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({ title: "Contraseñas no coinciden", description: "Revisa que la confirmación coincida con la contraseña.", variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        password: formData.password,
      });

      toast({
        title: "Registro exitoso",
        description: `Usuario ${capitalize(formData.username)} registrado correctamente.`,
        variant: "default",
      });

     
    } catch (error: any) {
      toast({
        title: "Error al registrar usuario",
        description: error?.message || "Ocurrió un error inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Usuario"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Elige un nombre de usuario"
        disabled={isLoading}
      />

      <Input
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Crea una contraseña"
        disabled={isLoading}
      />

      <Input
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Repite tu contraseña"
        disabled={isLoading}
      />

      <Button type="submit" fullWidth isLoading={isLoading}>
        Registrarse
      </Button>

      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Inicia sesión aquí
        </Link>
      </p>
    </form>
  );
};
