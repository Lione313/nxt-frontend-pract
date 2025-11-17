"use client";

export const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} NXT-ABOGADOS. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
            Política de Privacidad
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
            Términos y Condiciones
          </a>
        </div>
      </div>
    </footer>
  );
};
