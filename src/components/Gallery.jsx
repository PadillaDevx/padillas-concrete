import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../utils';
import SectionHeader from './SectionHeader';
import PhotoModal from './PhotoModal';

const PROJECTS = [
  {
    id: 1,
    title: 'Residential Driveway',
    location: 'Luverne, MN',
    before: `${BASE_URL}gallery/P1.jpg`,
    after: `${BASE_URL}gallery/P7.jpg`,
    allPhotos: Array.from({ length: 7 }, (_, i) => `${BASE_URL}gallery/P${i + 1}.jpg`),
  },
];

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const close = () => { setSelectedProject(null); setCurrentIndex(0); };
  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => {
    if (selectedProject) setCurrentIndex((i) => Math.min(selectedProject.allPhotos.length - 1, i + 1));
  };

  useEffect(() => {
    if (!selectedProject) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const handleSwipe = (endX) => {
    if (touchStartX === null) return;
    const diff = touchStartX - endX;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchStartX(null);
  };

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader titleKey="gallery.title" subtitleKey="gallery.subtitle" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-1 text-shadow">{project.title}</h3>
                <p className="text-white text-sm mb-2 text-shadow">{project.location}</p>
              </div>

              <div className="grid grid-cols-2">
                {[
                  { src: project.before, label: t('gallery.before'), pos: 'left-2' },
                  { src: project.after, label: t('gallery.after'), pos: 'right-2' },
                ].map(({ src, label, pos }) => (
                  <div key={label} className="relative h-48 bg-black/60">
                    {src ? (
                      <img src={src} alt={label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">{label}</div>
                    )}
                    <div className={`absolute top-2 ${pos} bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4">
                <button
                  onClick={() => { setSelectedProject(project); setCurrentIndex(0); }}
                  className="w-full btn-primary py-3 rounded-lg"
                >
                  View Process Photos
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PhotoModal
        project={selectedProject}
        currentIndex={currentIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
      />
    </section>
  );
}