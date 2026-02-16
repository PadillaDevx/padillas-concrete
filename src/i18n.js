import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        services: 'Services',
        gallery: 'Gallery',
        contact: 'Let\'s Connect'
      },
      hero: {
        title: 'Professional concrete solutions for your property.',
        subtitle: '22 Years of experience, skilled craftsmanship, and unwavering commitment to quality in every project.',
        cta: 'Get Free Quote'
      },
      about: {
        title: 'Built on quality, trust, and precision.',
        description: 'With over 22 years of experience, Padilla\'s Concrete LLC specializes in delivering exceptional concrete work for residential and commercial properties across the United States.',
        feature1: {
          title: 'Licensed & Insured',
          description: 'Fully certified professionals you can trust'
        },
        feature2: {
          title: 'Quality Guarantee',
          description: 'We stand behind every project we complete'
        },
        feature3: {
          title: 'On-Time Delivery',
          description: 'Your project completed when promised'
        }
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive concrete solutions tailored to your needs',
        service1: {
          name: 'Patios',
          description: 'Custom outdoor spaces designed for entertainment and relaxation'
        },
        service2: {
          name: 'Driveways',
          description: 'Durable and attractive residential and commercial driveways'
        },
        service3: {
          name: 'Walkways',
          description: 'Safe and elegant pathways for your property'
        },
        service4: {
          name: 'Sidewalks',
          description: 'Professional sidewalk installation and repair'
        },
        service5: {
          name: 'Concrete Reinforced',
          description: 'Strengthened concrete solutions for maximum durability'
        },
        service6: {
          name: 'Stamped Concrete',
          description: 'Decorative concrete with custom patterns and designs'
        },
        service7: {
          name: 'And More',
          description: 'Additional concrete services tailored to your needs'
        }
      },
      gallery: {
        title: 'Our Work',
        subtitle: 'Quality craftsmanship in every project',
        before: 'Before',
        after: 'After'
      },
      contact: {
        title: 'Ready to start your project?',
        subtitle: 'Get in touch with us today for a free consultation and quote',
        phone: 'Call Us',
        email: 'Email Us',
        location: 'Location',
        address: 'Luverne, MN',
        form: {
          title: 'Request a Free Quote',
          name: 'Full Name',
          namePlaceholder: 'John Doe',
          email: 'Email',
          emailPlaceholder: 'john@example.com',
          phone: 'Phone',
          phonePlaceholder: '(555) 123-4567',
          service: 'Service Type',
          selectService: 'Select a service...',
          other: 'Other',
          message: 'Project Details',
          messagePlaceholder: 'Tell us about your project...',
          send: 'Send Message',
          sending: 'Sending...'
        }
      },
      validation: {
        nameError: 'Please enter a valid name (at least 2 characters)',
        emailError: 'Please enter a valid email address',
        phoneError: 'Please enter a valid US phone number',
        serviceError: 'Please select a service',
        messageError: 'Please enter a message (at least 10 characters)',
        errorsTitle: 'Please fix the following errors:',
        rateLimitTitle: 'Too Many Attempts',
        rateLimitMessage: 'Please wait {{seconds}} seconds before submitting again',
        successTitle: 'Message Sent!',
        successMessage: 'Thank you for contacting us. We will get back to you soon.',
        errorTitle: 'Sending Failed',
        errorMessage: 'There was an error sending your message. Please try again later or contact us directly.',
        spamDetected: 'Spam detected. Please try again.'
      },
      footer: {
        description: 'Professional concrete solutions for residential and commercial properties',
        copyright: '© {{year}} Padilla\'s Concrete LLC. All rights reserved.',
        credit: 'Page created and designed by <1>PadillaDevx</1>'
      }
    }
  },
  es: {
    translation: {
      nav: {
        about: 'Acerca',
        services: 'Servicios',
        gallery: 'Galería',
        contact: 'Conectar'
      },
      hero: {
        title: 'Soluciones profesionales de concreto para su propiedad.',
        subtitle: 'Años de experiencia, mano de obra calificada y compromiso inquebrantable con la calidad en cada proyecto.',
        cta: 'Obtener Cotización Gratis'
      },
      about: {
        title: 'Construido sobre calidad, confianza y precisión.',
        description: 'Con más de 22 años de experiencia, Padilla\'s Concrete LLC se especializa en ofrecer trabajos excepcionales de concreto para propiedades residenciales y comerciales en todo Estados Unidos.',
        feature1: {
          title: 'Con Licencia y Asegurado',
          description: 'Profesionales totalmente certificados en los que puede confiar'
        },
        feature2: {
          title: 'Garantía de Calidad',
          description: 'Respaldamos cada proyecto que completamos'
        },
        feature3: {
          title: 'Entrega a Tiempo',
          description: 'Su proyecto completado cuando se prometió'
        }
      },
      services: {
        title: 'Nuestros Servicios',
        subtitle: 'Soluciones integrales de concreto adaptadas a sus necesidades',
        service1: {
          name: 'Patios',
          description: 'Espacios exteriores personalizados diseñados para entretenimiento y relajación'
        },
        service2: {
          name: 'Entradas de Autos',
          description: 'Entradas residenciales y comerciales duraderas y atractivas'
        },
        service3: {
          name: 'Caminos',
          description: 'Senderos seguros y elegantes para su propiedad'
        },
        service4: {
          name: 'Aceras',
          description: 'Instalación y reparación profesional de aceras'
        },
        service5: {
          name: 'Concreto Reforzado',
          description: 'Soluciones de concreto reforzado para máxima durabilidad'
        },
        service6: {
          name: 'Concreto Estampado',
          description: 'Concreto decorativo con patrones y diseños personalizados'
        },
        service7: {
          name: 'Y Más',
          description: 'Servicios adicionales de concreto adaptados a sus necesidades'
        }
      },
      gallery: {
        title: 'Nuestro Trabajo',
        subtitle: 'Artesanía de calidad en cada proyecto',
        before: 'Antes',
        after: 'Después'
      },
      contact: {
        title: '¿Listo para comenzar su proyecto?',
        subtitle: 'Póngase en contacto con nosotros hoy para una consulta y cotización gratuita',
        phone: 'Llámenos',
        email: 'Envíenos un Email',
        location: 'Ubicación',
        address: 'Luverne, MN',
        form: {
          title: 'Solicitar una Cotización Gratis',
          name: 'Nombre Completo',
          namePlaceholder: 'Juan Pérez',
          email: 'Correo Electrónico',
          emailPlaceholder: 'juan@ejemplo.com',
          phone: 'Teléfono',
          phonePlaceholder: '(555) 123-4567',
          service: 'Tipo de Servicio',
          selectService: 'Seleccionar un servicio...',
          other: 'Otro',
          message: 'Detalles del Proyecto',
          messagePlaceholder: 'Cuéntenos sobre su proyecto...',
          send: 'Enviar Mensaje',
          sending: 'Enviando...'
        }
      },
      validation: {
        nameError: 'Por favor ingrese un nombre válido (al menos 2 caracteres)',
        emailError: 'Por favor ingrese un correo electrónico válido',
        phoneError: 'Por favor ingrese un número de teléfono válido',
        serviceError: 'Por favor seleccione un servicio',
        messageError: 'Por favor ingrese un mensaje (al menos 10 caracteres)',
        errorsTitle: 'Por favor corrija los siguientes errores:',
        rateLimitTitle: 'Demasiados Intentos',
        rateLimitMessage: 'Por favor espere {{seconds}} segundos antes de enviar nuevamente',
        successTitle: '¡Mensaje Enviado!',
        successMessage: 'Gracias por contactarnos. Nos comunicaremos con usted pronto.',
        errorTitle: 'Error al Enviar',
        errorMessage: 'Hubo un error al enviar su mensaje. Por favor intente nuevamente más tarde o contáctenos directamente.',
        spamDetected: 'Spam detectado. Por favor intente nuevamente.'
      },
      footer: {
        description: 'Soluciones profesionales de concreto para propiedades residenciales y comerciales',
        copyright: '© {{year}} Padilla\'s Concrete LLC. Todos los derechos reservados.',
        credit: 'página creada y diseñada por <1>PadillaDevx</1>'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Idioma por defecto inglés
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
