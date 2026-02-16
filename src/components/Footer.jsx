import { useTranslation, Trans } from 'react-i18next';
import { BASE_URL } from '../utils';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-2">
          <img
            src={`${BASE_URL}PCLLC.png`}
            alt="Padilla's Concrete LLC Logo"
            className="w-[135px] h-[135px] object-contain"
          />
        </div>
        <p className="text-gray-400 mb-3 text-sm">{t('footer.description')}</p>
        <p className="text-gray-500 text-xs">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          <Trans
            i18nKey="footer.credit"
            components={{
              1: <a href="https://padilladevx.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors" />,
            }}
          />
        </p>
      </div>
    </footer>
  );
}