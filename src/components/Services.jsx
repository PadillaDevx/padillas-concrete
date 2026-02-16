import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../utils';
import SectionHeader from './SectionHeader';

const SERVICE_ICONS = [
  'Patio.png',
  'driveway.png',
  'Walkway.png',
  'Sidewalk.png',
  'ConcreteReinforced.png',
  'StampedConcrete.png',
  'More.png',
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader titleKey="services.title" subtitleKey="services.subtitle" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_ICONS.map((icon, i) => {
            const key = `services.service${i + 1}`;
            return (
              <div
                key={icon}
                className="glass-card rounded-2xl p-8 hover:bg-black/50 hover:border-red-600 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src={`${BASE_URL}${icon}`} alt="" aria-hidden="true" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-shadow">{t(`${key}.name`)}</h3>
                <p className="text-white text-shadow">{t(`${key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}