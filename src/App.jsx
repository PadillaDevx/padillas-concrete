import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-red-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        {t('a11y.skipToContent')}
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}