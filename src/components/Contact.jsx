import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Componente Contact - Sección de contacto
 * Incluye:
 * - Información de contacto (teléfono, email, ubicación)
 * - Formulario de contacto
 * 
 * TODO: Conectar el formulario con un servicio de email
 * Opciones recomendadas: EmailJS, Formspree, o backend propio
 */
export default function Contact() {
  const { t } = useTranslation();
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Estado para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Maneja los cambios en los inputs del formulario
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Maneja el envío del formulario
   * TODO: Implementar el envío real del formulario
   * Por ahora solo muestra un mensaje de éxito
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío (2 segundos)
    setTimeout(() => {
      setSubmitMessage('¡Gracias! Nos pondremos en contacto pronto.');
      setIsSubmitting(false);
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 2000);

    // TODO: Reemplazar con código real para enviar email
    // Ejemplo con EmailJS o fetch a tu backend
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16 bg-black/40 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Información de contacto */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          
          {/* Teléfono - TODO: ACTUALIZAR CON NÚMERO REAL */}
          <div className="flex flex-col items-center text-center bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('contact.phone')}</h3>
            <a 
              href="tel:+15551234567" 
              className="text-white hover:text-red-400 transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              (719) 565-7189
            </a>
          </div>

          {/* Email - TODO: ACTUALIZAR CON EMAIL REAL */}
          <div className="flex flex-col items-center text-center bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('contact.email')}</h3>
            <a 
              href="mailto:info@padillasconcrete.com" 
              className="text-white hover:text-red-400 transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              vpadilla604@gmail.com
            </a>
          </div>

          {/* Ubicación */}
          <div className="flex flex-col items-center text-center bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/30">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('contact.location')}</h3>
            <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{t('contact.address')}</p>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('contact.form.title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo: Nombre */}
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t('contact.form.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>

            {/* Campos: Email y Teléfono en la misma fila */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Campo: Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              {/* Campo: Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {t('contact.form.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
            </div>

            {/* Campo: Servicio */}
            <div>
              <label htmlFor="service" className="block text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t('contact.form.service')} *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition bg-white"
              >
                <option value="">{t('contact.form.selectService')}</option>
                <option value="Patios">{t('services.service1.name')}</option>
                <option value="Driveways">{t('services.service2.name')}</option>
                <option value="Walkways">{t('services.service3.name')}</option>
                <option value="Sidewalks">{t('services.service4.name')}</option>
                <option value="Concrete Reinforced">{t('services.service5.name')}</option>
                <option value="Stamped Concrete">{t('services.service6.name')}</option>
                <option value="Other">{t('contact.form.other')}</option>
              </select>
            </div>

            {/* Campo: Mensaje */}
            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t('contact.form.message')} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-white transition ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>

            {/* Mensaje de éxito */}
            {submitMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}