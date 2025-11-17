import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/authContext";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NXT-ABOGADOS-CASOS",
  description: "Sistema legal-tech para gestión de casos y expedientes",
  icons: {
    icon: "https://media.licdn.com/dms/image/v2/D4E0BAQE1p45-Zu0Gqg/company-logo_200_200/B4EZdNeVo1HgAI-/0/1749351488642?e=1764806400&v=beta&t=ufhs81tvjWxqfmhngFWIBibXQh8oul9JGPuhXSOShKE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`bg-gray-50 ${inter.className}`}>
        <AuthProvider>
          <ToastProvider>
            {/* Aquí NO se colocan Sidebar ni Navbar */}
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
