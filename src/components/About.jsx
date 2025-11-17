import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Componente About - Sección "Acerca de nosotros"
 * Muestra información de la empresa y sus valores
 * 
 * TODO: Actualizar con información real:
 * - Año de inicio de la empresa
 * - Años de experiencia
 * - Historia de la empresa
 */
export default function About() {
  const { t } = useTranslation();
  
  // Características destacadas de la empresa
  const features = [
    {
      title: t('about.feature1.title'),
      description: t('about.feature1.description')
    },
    {
      title: t('about.feature2.title'),
      description: t('about.feature2.description')
    },
    {
      title: t('about.feature3.title'),
      description: t('about.feature3.description')
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Columna izquierda - Texto */}
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8">
            {/* Título principal - ACTUALIZAR CON INFO REAL */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              {t('about.title')}
            </h2>
            
            {/* Descripción - ACTUALIZAR CON INFO REAL */}
            <p className="text-lg text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {t('about.description')}
            </p>
            
            {/* Lista de características */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{feature.title}</h3>
                    <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Columna derecha - Imagen */}
          <div className="bg-black/40 backdrop-blur-md border border-white/30 rounded-3xl h-96 max-w-[520px] mx-auto flex items-center justify-center">
            <img 
              src={`${import.meta.env.BASE_URL}Tools.jpeg`}
              alt="Equipo Padilla's Concrete" 
              className="h-[370px] max-w-[95%] rounded-3xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}