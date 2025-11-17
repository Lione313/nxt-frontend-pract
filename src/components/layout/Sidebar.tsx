"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, FileText, PlusCircle, BarChart2 } from "lucide-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard/homeDashboard", icon: <Home size={20} /> },
    { name: "Todos los Casos", href: "/dashboard/casos", icon: <FileText size={20} /> },
    { name: "Nuevo Caso", href: "/dashboard/casos/nuevo", icon: <PlusCircle size={20} /> },
    
  ];

  return (
    <>
      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg text-gray-800">Menú</h2>
          <button
            className="md:hidden p-1 rounded hover:bg-gray-200 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navegación */}
        <nav className="mt-6 flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;


            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group"
              >
                {item.icon}

                {/* TEXTO con efectos */}
                <span className="relative text-gray-700 group-hover:text-blue-600 transition-colors">
                  
                  {/* BEFORE para hover bonito */}
                  <span
                    className="
                      absolute inset-0 -z-10
                      before:content-[''] before:absolute before:inset-0 
                    before:rounded-md before:opacity-0 
                      before:transition-all before:duration-300
                      group-hover:before:opacity-100
                    "
                  ></span>

                  {/* Línea de abajo (hover + activo) */}
                  <span
                    className={`
                      absolute left-0 -bottom-[2px] h-[2px] bg-blue-600
                      transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  ></span>

                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Botón móvil */}
      <button
        className="fixed bottom-6 left-6 bg-blue-500 text-white p-3 rounded-full shadow-lg md:hidden z-50 hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>
    </>
  );
};
