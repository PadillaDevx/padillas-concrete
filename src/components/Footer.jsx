import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Componente Footer - Pie de página
 * Muestra información de copyright y logo de la empresa
 */
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Logo y nombre de la empresa */}
        <div className="flex items-center justify-center mb-2">
          <img 
            src={`${import.meta.env.BASE_URL}PCLLC.png`} 
            alt="Padilla's Concrete LLC Logo" 
            className="w-[135px] h-[135px] object-contain"
          />
        </div>
        
        {/* Descripción */}
        <p className="text-gray-400 mb-3 text-sm">
          {t('footer.description')}
        </p>
        
        {/* Copyright */}
        <p className="text-gray-500 text-xs">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}