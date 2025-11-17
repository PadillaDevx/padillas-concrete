import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

/**
 * Componente de barra de navegación
 * Incluye:
 * - Logo de la empresa
 * - Menú de navegación centrado
 * - Botón de contacto a la derecha
 * - Detección de sección activa con efecto visual
 */
export default function Navbar() {
  const { t } = useTranslation();
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);
  // Estado para saber qué sección está actualmente visible
  const [activeSection, setActiveSection] = useState('hero');

  /**
   * useEffect para detectar qué sección está visible en el viewport
   * Se ejecuta cuando el usuario hace scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      // Obtener todas las secciones
      const sections = ['hero', 'about', 'services', 'gallery', 'contact'];
      
      // Encontrar qué sección está más visible
      let current = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Si la sección está en el viewport (con un margen de 100px)
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    // Agregar el evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Limpiar el evento cuando el componente se desmonte
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Función para hacer scroll suave a una sección específica
   * @param {string} id - El ID de la sección a la que queremos ir
   */
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false); // Cerrar el menú móvil después de hacer clic
  };

  /**
   * Función helper para aplicar estilos cuando una sección está activa
   * @param {string} section - El nombre de la sección
   * @returns {string} - Las clases de Tailwind CSS
   */
  const getNavLinkClass = (section) => {
    const baseClass = "text-white transition px-4 py-2 rounded-lg";
    const activeClass = "bg-red-600 text-white font-semibold";
    const inactiveClass = "hover:text-red-400 hover:bg-white/10";
    
    return `${baseClass} ${activeSection === section ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md border-b border-white/20 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo y nombre de la empresa */}
          <div className="flex items-center space-x-3 cursor-pointer md:-ml-16 ml-0" onClick={() => scrollToSection('hero')}>
  {/* Logo del guerrero azteca */}
          <img 
              src={`${import.meta.env.BASE_URL}PCLLC.png`} 
              alt="Padilla's Concrete LLC Logo" 
              className="w-[220px] h-[220px] object-contain"
            />
            <div className="text-xl font-bold text-gray-900">
  
            </div>
          </div>

          {/* Menú de navegación - Desktop (CENTRADO) */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-2">
            <button 
              onClick={() => scrollToSection('about')} 
              className={getNavLinkClass('about')}
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={getNavLinkClass('services')}
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className={getNavLinkClass('gallery')}
            >
              {t('nav.gallery')}
            </button>
          </div>

          {/* Selector de idioma y botón Contact */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-red-600 text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>{t('nav.contact')}</span>
            </button>
          </div>

          {/* Botón para abrir/cerrar menú móvil */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú de navegación - Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/20">
          <div className="px-4 py-4 space-y-2">
            <button 
              onClick={() => scrollToSection('about')} 
              className={`block w-full text-left py-3 px-4 rounded-lg ${
                activeSection === 'about' 
                  ? 'bg-red-600 text-white font-semibold' 
                  : 'text-white hover:text-red-400 hover:bg-white/10'
              }`}
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={`block w-full text-left py-3 px-4 rounded-lg ${
                activeSection === 'services' 
                  ? 'bg-red-600 text-white font-semibold' 
                  : 'text-white hover:text-red-400 hover:bg-white/10'
              }`}
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className={`block w-full text-left py-3 px-4 rounded-lg ${
                activeSection === 'gallery' 
                  ? 'bg-red-600 text-white font-semibold' 
                  : 'text-white hover:text-red-400 hover:bg-white/10'
              }`}
            >
              {t('nav.gallery')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full text-left py-3 px-4 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              {t('nav.contact')}
            </button>
            <div className="pt-2 border-t border-white/20 mt-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}