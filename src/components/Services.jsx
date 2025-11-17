import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Componente Services - Muestra los servicios que ofrece la empresa
 * 
 * TODO: Actualizar con los servicios específicos que ofrece tu hermano
 * Para agregar/quitar servicios, simplemente edita el array 'services'
 */
export default function Services() {
  const { t } = useTranslation();
  
  /**
   * Array de servicios ofrecidos
   * INSTRUCCIONES PARA MODIFICAR:
   * - name: Nombre del servicio
   * - description: Descripción breve del servicio
   * 
   * Para agregar un nuevo servicio, copia este formato:
   * { name: 'Nombre del servicio', description: 'Descripción del servicio' }
   */
  const services = [
    { 
      name: t('services.service1.name'),
      description: t('services.service1.description'),
      icon: '/Patio.png'
    },
    { 
      name: t('services.service2.name'),
      description: t('services.service2.description'),
      icon: '/driveway.png'
    },
    { 
      name: t('services.service3.name'),
      description: t('services.service3.description'),
      icon: '/Walkway.png'
    },
    { 
      name: t('services.service4.name'),
      description: t('services.service4.description'),
      icon: '/Sidewalk.png'
    },
    { 
      name: t('services.service5.name'),
      description: t('services.service5.description'),
      icon: '/ConcreteReinforced.png'
    },
    { 
      name: t('services.service6.name'),
      description: t('services.service6.description'),
      icon: '/StampedConcrete.png'
    },
    { 
      name: t('services.service7.name'),
      description: t('services.service7.description'),
      icon: '/More.png'
    }
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16 bg-black/40 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {t('services.title')}
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-black/40 backdrop-blur-md border border-white/30 rounded-2xl p-8 hover:bg-black/50 hover:border-red-600 hover:shadow-xl transition-all duration-300"
            >
              {/* Icono del servicio */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img 
                  src={`${import.meta.env.BASE_URL}${service.icon.replace('/', '')}`} 
                  alt={service.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Nombre del servicio */}
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {service.name}
              </h3>
              {/* Descripción del servicio */}
              <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}