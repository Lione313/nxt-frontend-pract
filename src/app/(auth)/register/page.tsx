import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <Card>
         
          <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <img
                src="https://media.licdn.com/dms/image/v2/D4E0BAQE1p45-Zu0Gqg/company-logo_200_200/B4EZdNeVo1HgAI-/0/1749351488642?e=1764806400&v=beta&t=ufhs81tvjWxqfmhngFWIBibXQh8oul9JGPuhXSOShKE"
                alt="Logo"
                width={64}
                height={64}
                className="rounded-2xl object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Crear Cuenta
            </h1>
            
            <p className="text-gray-600">Regístrate en el sistema</p>
          </div>

     
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Registrarse - Sistema de Expedientes",
  description: "Crea una cuenta en el sistema de gestión de expedientes",
};