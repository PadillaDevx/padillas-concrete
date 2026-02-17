import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProjects } from '../services/api';
import SectionHeader from './SectionHeader';
import PhotoModal from './PhotoModal';

// Transform API project to display format
function transformApiProject(project) {
  const allPhotos = [];

  if (project.beforePhoto) allPhotos.push(project.beforePhoto.url);
  if (project.photos?.length) allPhotos.push(...project.photos.map(p => p.url));
  if (project.afterPhoto) allPhotos.push(project.afterPhoto.url);

  return {
    id: project.id,
    title: project.title,
    location: project.location || '',
    before: project.beforePhoto?.url || allPhotos[0] || null,
    after: project.afterPhoto?.url || allPhotos[allPhotos.length - 1] || null,
    allPhotos,
  };
}

export default function Gallery() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const apiProjects = await getProjects();
        const transformed = apiProjects
          .filter(p => p.photos?.length > 0 || p.beforePhoto || p.afterPhoto)
          .map(transformApiProject);

        setProjects(transformed);
      } catch (error) {
        console.error('Failed to fetch gallery projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('gallery.noProjects', 'Coming Soon')}</h3>
            <p className="text-gray-400">{t('gallery.noProjectsDesc', 'We are preparing our gallery. Check back soon!')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
                      <img src={src} alt={`${project.title} - ${label}`} className="w-full h-full object-cover" loading="lazy" />
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
                  {t('gallery.viewPhotos')}
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
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