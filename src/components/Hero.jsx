import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-4 bg-cover bg-center"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-7">
          <img 
            src="/PCLogo.png" 
            alt="Padilla's Concrete Logo" 
            className="w-60 h-60 mx-auto object-contain float-logo"
          />
        </div>
        <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('hero.subtitle')}
          </p>
          <button 
            onClick={scrollToContact} 
            className="bg-red-600 text-white px-8 py-4 rounded-full text-lg hover:bg-red-700 transition inline-flex items-center space-x-2"
          >
            <span>{t('hero.cta')}</span>
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}