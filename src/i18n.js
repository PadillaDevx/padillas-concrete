import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';

// Get saved language preference, default to English
const savedLanguage = localStorage.getItem('i18nextLng');
const defaultLanguage = savedLanguage || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

export default i18n;
