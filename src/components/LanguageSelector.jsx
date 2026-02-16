import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-5 h-5 text-white" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="bg-white/10 text-white border border-white/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer hover:bg-white/20 transition"
      >
        <option value="en" className="bg-gray-900">English</option>
        <option value="es" className="bg-gray-900">Español</option>
      </select>
    </div>
  );
}
