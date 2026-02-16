import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../utils';

const FEATURES = ['feature1', 'feature2', 'feature3'];

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow-strong">
              {t('about.title')}
            </h2>
            <p className="text-lg text-white mb-6 text-shadow">
              {t('about.description')}
            </p>
            <div className="space-y-4">
              {FEATURES.map((key) => (
                <div key={key} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-shadow">{t(`about.${key}.title`)}</h3>
                    <p className="text-white text-shadow">{t(`about.${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden">
            <img
              src={`${BASE_URL}Tools.jpeg`}
              alt="Equipo Padilla's Concrete"
              className="w-full h-full object-cover min-h-[300px] md:min-h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}