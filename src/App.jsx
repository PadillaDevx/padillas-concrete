import React from 'react';

// Importar todos los componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * Componente principal de la aplicación
 * Organiza y renderiza todos los componentes en orden
 */
function App() {
  return (
    <div className="min-h-screen">
      {/* Barra de navegación fija en la parte superior */}
      <Navbar />
      
      {/* Sección principal (Hero) */}
      <Hero />
      
      {/* Sección Acerca de nosotros */}
      <About />
      
      {/* Sección de Servicios */}
      <Services />
      
      {/* Galería de proyectos con antes/después */}
      <Gallery />
      
      {/* Sección de contacto con formulario */}
      <Contact />
      
      {/* Pie de página */}
      <Footer />
    </div>
  );
}

export default App;