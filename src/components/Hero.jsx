import { useTranslation } from 'react-i18next';
import { scrollToId, BASE_URL } from '../utils';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="pt-32 pb-20 px-4 bg-cover bg-center">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-7">
          <img
            src={`${BASE_URL}PCLogo.png`}
            alt="Padilla's Concrete Logo"
            className="w-60 h-60 mx-auto object-contain float-logo"
          />
        </div>
        <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-shadow-strong">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto text-shadow">
            {t('hero.subtitle')}
          </p>
          <button
            onClick={() => scrollToId('contact')}
            className="btn-primary px-8 py-4 rounded-full text-lg inline-flex items-center space-x-2"
          >
            <span>{t('hero.cta')}</span>
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}