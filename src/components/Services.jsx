import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

// SVG Icons for services
const Icons = {
  patio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-6h6v6" />
      <rect x="9" y="12" width="6" height="3" rx="0.5" />
    </svg>
  ),
  driveway: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M7 21l2-12h6l2 12" />
      <path d="M5 21h14" />
      <circle cx="12" cy="6" r="3" />
      <path d="M10 6h4" />
    </svg>
  ),
  walkway: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="4" r="2" />
      <path d="M14 10l-2-2-2 2M10 10l-1 4 3 2 3-2-1-4" />
      <path d="M9 16l-1 5M15 16l1 5" />
      <path d="M10.5 12h3" />
    </svg>
  ),
  sidewalk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 4h16v16H4z" />
      <path d="M4 10h16M4 16h16M10 4v16M16 4v16" />
    </svg>
  ),
  reinforced: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M6 8V6M12 8V5M18 8V6" />
      <path d="M6 16v2M12 16v3M18 16v2" />
      <path d="M3 12h18" />
    </svg>
  ),
  stamped: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="18" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  other: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
};

const SERVICES = [
  { icon: Icons.patio, key: 'service1' },
  { icon: Icons.driveway, key: 'service2' },
  { icon: Icons.walkway, key: 'service3' },
  { icon: Icons.sidewalk, key: 'service4' },
  { icon: Icons.reinforced, key: 'service5' },
  { icon: Icons.stamped, key: 'service6' },
  { icon: Icons.other, key: 'service7' },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader titleKey="services.title" subtitleKey="services.subtitle" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(({ icon, key }) => (
            <div
              key={key}
              className="glass-card rounded-2xl p-8 hover:bg-black/50 hover:border-red-600 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 mb-4 text-red-500">
                {icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 text-shadow">{t(`services.${key}.name`)}</h3>
              <p className="text-white text-shadow">{t(`services.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}