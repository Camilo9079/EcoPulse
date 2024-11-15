// FooterComponent.tsx
import React from 'react';


const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
        {/* Nombre de la empresa */}
        <h2 className="text-xl font-semibold">Grupo Empresarial Panacea SAS</h2>
        <h3 className="text-xs text-gray-200">
          Desarrollando soluciones tecnológicas al servicio de la naturaleza y la sociedad.
        </h3>

        

        {/* Derechos reservados */}
        <p className="text-xs text-gray-200 mt-4">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>
        <p className="text-xs text-gray-400">
          Powered by <a href="#" className="text-gray-300 hover:text-white">Panacea SAS</a>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
