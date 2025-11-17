"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

interface NavbarProps {
  username?: string;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-r-4 border-gray-300"
          : "bg-white border-r-4 border-gray-300"
      }`}
    >
      {/* Contenedor centrado */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 group pointer-events-auto">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E0BAQE1p45-Zu0Gqg/company-logo_200_200/B4EZdNeVo1HgAI-/0/1749351488642?e=1764806400&v=beta&t=ufhs81tvjWxqfmhngFWIBibXQh8oul9JGPuhXSOShKE"
              alt="Logo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-y-180"
            />
          </div>

          {/* TEXTO FLIP */}
          <div className="relative w-36 h-6 perspective-500 hidden sm:block">
            <span className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold text-xl transition-all duration-500 group-hover:rotate-y-180 opacity-100 group-hover:opacity-0">
              NXT
            </span>

            <span className="absolute inset-0 flex items-center  text-gray-800 font-bold text-xl rotate-y-180 transition-all duration-500 group-hover:rotate-y-0 opacity-0 group-hover:opacity-100">
              NXT-ABOGADOS
            </span>
          </div>
        </div>
      </div>

      {/* Menú usuario a la derecha */}
      <div className="ml-auto relative z-50">
        {username && (
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
          >
            <User size={22} />
            <span className="hidden sm:inline font-medium">{username}</span>
          </button>
        )}

        {showUserMenu && (
          <div className="absolute right-0 mt-2 bg-white shadow-xl border rounded-xl w-40 py-2 z-50">
           
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
