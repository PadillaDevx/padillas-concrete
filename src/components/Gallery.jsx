import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Componente Gallery - Galería de proyectos con antes/después
 * Muestra proyectos con foto de antes y después
 * Al hacer clic en "Ver más" se abre un modal con todas las fotos del proyecto
 * 
 * TODO: Agregar fotos reales de los proyectos
 */
export default function Gallery() {
  const { t } = useTranslation();
  // Estado para controlar qué proyecto está abierto en el modal
  const [selectedProject, setSelectedProject] = useState(null);
  // Estado para controlar qué foto se está viendo en el modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Estado para swipe en móviles
  const [touchStartX, setTouchStartX] = useState(null);

  /**
   * Cierra el modal
   */
  const closeModal = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  }, []);

  /**
   * Navega a la siguiente foto en el modal
   */
  const nextImage = useCallback(() => {
    if (selectedProject && currentImageIndex < selectedProject.allPhotos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }, [selectedProject, currentImageIndex]);

  /**
   * Navega a la foto anterior en el modal
   */
  const prevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }, [currentImageIndex]);

  // Soporte para flechas del teclado en el modal
  React.useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, currentImageIndex, nextImage, prevImage, closeModal]);

  /**
   * Array de proyectos con sus fotos
   * INSTRUCCIONES PARA AGREGAR PROYECTOS:
   * 
   * 1. Guarda las fotos en la carpeta public/projects/
   * 2. Agrega un nuevo objeto al array con este formato:
   * 
   * {
   *   id: número único,
   *   title: 'Nombre del proyecto',
   *   location: 'Ciudad, Estado',
   *   before: '/projects/proyecto1-antes.jpg',
   *   after: '/projects/proyecto1-despues.jpg',
   *   allPhotos: [
   *     '/projects/proyecto1-antes.jpg',
   *     '/projects/proyecto1-proceso1.jpg',
   *     '/projects/proyecto1-proceso2.jpg',
   *     '/projects/proyecto1-despues.jpg'
   *   ]
   * }
   */
  const projects = [
    {
      id: 1,
      title: 'Residential Driveway',
      location: 'Luverne, MN',
      before: `${import.meta.env.BASE_URL}gallery/P1.jpg`,
      after: `${import.meta.env.BASE_URL}gallery/P7.jpg`,
      allPhotos: [
        `${import.meta.env.BASE_URL}gallery/P1.jpg`,
        `${import.meta.env.BASE_URL}gallery/P2.jpg`,
        `${import.meta.env.BASE_URL}gallery/P3.jpg`,
        `${import.meta.env.BASE_URL}gallery/P4.jpg`,
        `${import.meta.env.BASE_URL}gallery/P5.jpg`,
        `${import.meta.env.BASE_URL}gallery/P6.jpg`,
        `${import.meta.env.BASE_URL}gallery/P7.jpg`
      ]
    },
    {
      id: 2,
      title: 'Commercial Sidewalk',
      location: 'Luverne, MN',
      before: null,
      after: null,
      allPhotos: []
    },
    {
      id: 3,
      title: 'Backyard Patio',
      location: 'Luverne, MN',
      before: null,
      after: null,
      allPhotos: []
    },
    {
      id: 4,
      title: 'Stamped Concrete',
      location: 'Luverne, MN',
      before: null,
      after: null,
      allPhotos: []
    },
    {
      id: 5,
      title: 'Foundation Work',
      location: 'Luverne, MN',
      before: null,
      after: null,
      allPhotos: []
    },
    {
      id: 6,
      title: 'Concrete Repair',
      location: 'Luverne, MN',
      before: null,
      after: null,
      allPhotos: []
    }
  ];

  /**
   * Abre el modal con todas las fotos del proyecto
   */
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16 bg-black/40 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-black/40 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Título y descripción del proyecto */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{project.title}</h3>
                <p className="text-white text-sm mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{project.location}</p>
              </div>
              {/* Contenedor de fotos Antes/Después */}
              <div className="grid grid-cols-2">
                {/* Foto ANTES */}
                <div className="relative h-48 bg-black/60">
                  {project.before ? (
                    <img 
                      src={project.before} 
                      alt="Before" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      Foto Antes
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t('gallery.before')}
                  </div>
                </div>

                {/* Foto DESPUÉS */}
                <div className="relative h-48 bg-black/60">
                  {project.after ? (
                    <img 
                      src={project.after} 
                      alt="After" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      Foto Después
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {t('gallery.after')}
                  </div>
                </div>
              </div>

              {/* Botón para ver más fotos */}
              <div className="p-4">
                <button 
                  onClick={() => openProjectModal(project)}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  View Process Photos
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para ver todas las fotos del proyecto */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden">
            
            {/* Header del modal */}
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600">{selectedProject.location}</p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Visor de imágenes */}
            <div
              className="relative bg-gray-900"
              onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
              onTouchEnd={e => {
                if (touchStartX === null) return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (diff > 50) nextImage(); // swipe left
                if (diff < -50) prevImage(); // swipe right
                setTouchStartX(null);
              }}
            >
              {selectedProject.allPhotos.length > 0 ? (
                <>
                  <img 
                    src={selectedProject.allPhotos[currentImageIndex]} 
                    alt={`Photo ${currentImageIndex + 1}`}
                    className="w-full h-96 object-contain"
                  />
                  
                  {/* Contador de fotos */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                    {currentImageIndex + 1} / {selectedProject.allPhotos.length}
                  </div>

                  {/* Botón anterior */}
                  {currentImageIndex > 0 && (
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {/* Botón siguiente */}
                  {currentImageIndex < selectedProject.allPhotos.length - 1 && (
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-500">
                  No hay fotos del proceso disponibles
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="p-6 border-t">
              <button 
                onClick={closeModal}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}