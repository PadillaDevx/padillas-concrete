import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { scrollToId, BASE_URL } from '../utils';
import LanguageSelector from './LanguageSelector';

const NAV_ITEMS = ['about', 'services', 'gallery'];
const SECTIONS = ['hero', ...NAV_ITEMS, 'contact'];

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'hero';
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (id) => {
    scrollToId(id);
    setMenuOpen(false);
  };

  const linkClass = (section, mobile = false) => {
    const active = activeSection === section;
    const base = mobile
      ? 'block w-full text-left py-3 px-4 rounded-lg'
      : 'text-white transition px-4 py-2 rounded-lg';
    return `${base} ${active ? 'bg-red-600 text-white font-semibold' : 'text-white hover:text-red-400 hover:bg-white/10'}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md border-b border-white/20 shadow-lg z-50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => navigate('hero')}
            className="flex items-center space-x-3 md:-ml-16 bg-transparent border-none cursor-pointer"
            aria-label={t('a11y.goToHome')}
          >
            <img
              src={`${BASE_URL}PCLLC.png`}
              alt="Padilla's Concrete LLC Logo"
              className="w-[220px] h-[220px] object-contain"
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center flex-1 justify-center space-x-2" role="menubar">
            {NAV_ITEMS.map((id) => (
              <button key={id} onClick={() => navigate(id)} className={linkClass(id)} role="menuitem" aria-current={activeSection === id ? 'true' : undefined}>
                {t(`nav.${id}`)}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => navigate('contact')}
              className="btn-primary px-6 py-2.5 rounded-full flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{t('nav.contact')}</span>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/20" role="menu">
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((id) => (
              <button key={id} onClick={() => navigate(id)} className={linkClass(id, true)} role="menuitem" aria-current={activeSection === id ? 'true' : undefined}>
                {t(`nav.${id}`)}
              </button>
            ))}
            <button
              onClick={() => navigate('contact')}
              className="block w-full text-left py-3 px-4 rounded-lg btn-primary"
              role="menuitem"
            >
              {t('nav.contact')}
            </button>
            <div className="pt-2 border-t border-white/20 mt-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}