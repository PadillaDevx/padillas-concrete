import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

// Professional SVG Icons for concrete services
const Icons = {
  // Patio: Outdoor furniture with umbrella on concrete slab
  patio: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Concrete slab base */}
      <path d="M4 52h56M8 52l4-8h40l4 8" fill="currentColor" fillOpacity="0.1" />
      {/* Umbrella */}
      <path d="M32 12v28" />
      <path d="M16 20c0-8 7-12 16-12s16 4 16 12" strokeWidth="2.5" />
      <path d="M16 20c4-2 8-3 16-3s12 1 16 3" />
      {/* Table */}
      <ellipse cx="32" cy="40" rx="12" ry="3" fill="currentColor" fillOpacity="0.2" />
      <path d="M24 40v8M40 40v8" />
      {/* Chair hints */}
      <rect x="10" y="42" width="6" height="8" rx="1" fill="currentColor" fillOpacity="0.15" />
      <rect x="48" y="42" width="6" height="8" rx="1" fill="currentColor" fillOpacity="0.15" />
    </svg>
  ),

  // Driveway: Car on concrete driveway leading to garage
  driveway: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Garage */}
      <path d="M12 8h40l4 20H8L12 8z" fill="currentColor" fillOpacity="0.1" />
      <path d="M8 28h48v4H8z" fill="currentColor" fillOpacity="0.2" />
      {/* Garage door */}
      <rect x="20" y="12" width="24" height="16" rx="1" />
      <path d="M20 16h24M20 20h24M20 24h24" strokeWidth="1" />
      {/* Driveway perspective */}
      <path d="M16 32l-8 28h48l-8-28" fill="currentColor" fillOpacity="0.15" />
      <path d="M16 32h32M12 44h40M8 56h48" strokeWidth="1.5" />
      {/* Car silhouette */}
      <path d="M22 48c0-2 2-4 6-4h8c4 0 6 2 6 4v4H22v-4z" fill="currentColor" fillOpacity="0.3" />
      <circle cx="26" cy="52" r="2" fill="currentColor" />
      <circle cx="38" cy="52" r="2" fill="currentColor" />
    </svg>
  ),

  // Walkway: Concrete path in perspective with landscaping
  walkway: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Walkway path in perspective */}
      <path d="M20 60L28 8h8L44 60z" fill="currentColor" fillOpacity="0.15" />
      {/* Walkway edges */}
      <path d="M20 60L28 8" strokeWidth="2" />
      <path d="M44 60L36 8" strokeWidth="2" />
      {/* Concrete section lines */}
      <path d="M21 52h22" strokeWidth="1.5" />
      <path d="M23 44h18" strokeWidth="1.5" />
      <path d="M25 36h14" strokeWidth="1.5" />
      <path d="M26 28h12" strokeWidth="1.5" />
      <path d="M27 20h10" strokeWidth="1.5" />
      <path d="M28 12h8" strokeWidth="1.5" />
      {/* Landscaping - left side bushes */}
      <ellipse cx="10" cy="50" rx="6" ry="4" fill="currentColor" fillOpacity="0.2" />
      <ellipse cx="12" cy="38" rx="5" ry="3" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="14" cy="28" rx="4" ry="2.5" fill="currentColor" fillOpacity="0.1" />
      {/* Landscaping - right side bushes */}
      <ellipse cx="54" cy="50" rx="6" ry="4" fill="currentColor" fillOpacity="0.2" />
      <ellipse cx="52" cy="38" rx="5" ry="3" fill="currentColor" fillOpacity="0.15" />
      <ellipse cx="50" cy="28" rx="4" ry="2.5" fill="currentColor" fillOpacity="0.1" />
      {/* Small flowers/plants */}
      <circle cx="6" cy="56" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="58" cy="56" r="2" fill="currentColor" fillOpacity="0.25" />
      <circle cx="16" cy="46" r="1.5" fill="currentColor" fillOpacity="0.2" />
      <circle cx="48" cy="46" r="1.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  ),

  // Sidewalk: Urban sidewalk with curb
  sidewalk: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Sidewalk surface */}
      <path d="M4 20h56v36H4z" fill="currentColor" fillOpacity="0.1" />
      {/* Concrete joints/sections */}
      <path d="M4 20h56" strokeWidth="2.5" />
      <path d="M4 32h56M4 44h56" />
      <path d="M20 20v36M36 20v36M52 20v36" />
      {/* Curb */}
      <path d="M4 56h56v4H4z" fill="currentColor" fillOpacity="0.25" />
      {/* Tree silhouette */}
      <circle cx="12" cy="10" r="6" fill="currentColor" fillOpacity="0.2" />
      <path d="M12 16v4" strokeWidth="2" />
      {/* Person walking */}
      <circle cx="44" cy="26" r="2" fill="currentColor" />
      <path d="M44 28v6M42 34l2 6M46 34l-2 6M42 32l-2 4M46 32l2 4" strokeWidth="1.5" />
    </svg>
  ),

  // Reinforced Concrete: Concrete block with rebar grid
  reinforced: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Concrete block 3D */}
      <path d="M8 20l24-12 24 12v28l-24 12-24-12V20z" fill="currentColor" fillOpacity="0.1" />
      <path d="M8 20l24 12 24-12" />
      <path d="M32 32v28" />
      {/* Rebar grid - horizontal */}
      <path d="M14 26l18 9 18-9" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 34l18 9 18-9" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 42l18 9 18-9" stroke="currentColor" strokeWidth="2.5" />
      {/* Rebar grid - vertical */}
      <path d="M20 22v28" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 16v28" stroke="currentColor" strokeWidth="2.5" />
      <path d="M44 22v28" stroke="currentColor" strokeWidth="2.5" />
      {/* Rebar ends visible */}
      <circle cx="20" cy="50" r="1.5" fill="currentColor" />
      <circle cx="32" cy="56" r="1.5" fill="currentColor" />
      <circle cx="44" cy="50" r="1.5" fill="currentColor" />
    </svg>
  ),

  // Stamped Concrete: Decorative stone pattern
  stamped: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Surface */}
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" fillOpacity="0.1" />
      {/* Stone pattern - row 1 */}
      <path d="M8 8h20v12H8z" fill="currentColor" fillOpacity="0.15" />
      <path d="M32 8h12v12H32z" fill="currentColor" fillOpacity="0.2" />
      <path d="M48 8h8v12h-8z" fill="currentColor" fillOpacity="0.15" />
      {/* Stone pattern - row 2 */}
      <path d="M8 24h12v14H8z" fill="currentColor" fillOpacity="0.2" />
      <path d="M24 24h16v14H24z" fill="currentColor" fillOpacity="0.15" />
      <path d="M44 24h12v14h-12z" fill="currentColor" fillOpacity="0.2" />
      {/* Stone pattern - row 3 */}
      <path d="M8 42h16v14H8z" fill="currentColor" fillOpacity="0.15" />
      <path d="M28 42h12v14H28z" fill="currentColor" fillOpacity="0.2" />
      <path d="M44 42h12v14h-12z" fill="currentColor" fillOpacity="0.15" />
      {/* Grout lines */}
      <path d="M4 20h56M4 38h56M4 56h56" strokeWidth="2" />
      <path d="M28 4v16M44 4v16" strokeWidth="2" />
      <path d="M20 20v18M40 20v18" strokeWidth="2" />
      <path d="M24 38v22M40 38v22" strokeWidth="2" />
      {/* Texture dots */}
      <circle cx="16" cy="14" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="36" cy="30" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="50" cy="48" r="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),

  // Other: Construction tools (trowel and level)
  other: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      {/* Trowel */}
      <path d="M8 44l20-20 8 8-20 20z" fill="currentColor" fillOpacity="0.15" />
      <path d="M28 24l4-4 8 8-4 4" />
      <path d="M36 20l12-12" strokeWidth="3" />
      {/* Level tool */}
      <rect x="20" y="48" width="36" height="8" rx="2" fill="currentColor" fillOpacity="0.1" />
      <rect x="20" y="48" width="36" height="8" rx="2" />
      <rect x="34" y="50" width="8" height="4" rx="1" />
      <circle cx="38" cy="52" r="1" fill="currentColor" />
      {/* Plus symbol */}
      <circle cx="12" cy="16" r="8" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 12v8M8 16h8" strokeWidth="2.5" />
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