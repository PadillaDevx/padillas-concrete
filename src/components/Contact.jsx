import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { validateFormData, sanitizeFormData } from '../utils/validation';
import { showSuccess, showError, showValidationErrors, showLoading, closeAlert } from '../utils/alerts';
import { contactFormLimiter, validateHoneypot } from '../utils/spamPrevention';

/**
 * Componente Contact - Sección de contacto
 * Incluye:
 * - Información de contacto (teléfono, email, ubicación)
 * - Formulario de contacto con validación y seguridad
 * 
 * Características de seguridad:
 * - Validación completa de campos
 * - Sanitización de entradas
 * - Prevención de doble envío
 * - Rate limiting
 * - Campo honeypot anti-spam
 * - Preparado para integración con Cloudflare Workers
 */
export default function Contact() {
  const { t } = useTranslation();
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honeypot: '' // Campo oculto anti-spam
  });

  // Estado para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para errores de validación por campo
  const [fieldErrors, setFieldErrors] = useState({});

  /**
   * Maneja los cambios en los inputs del formulario
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario comienza a escribir
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Maneja el envío del formulario con validación y seguridad
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevenir doble envío
    if (isSubmitting) return;
    
    // Validar honeypot (anti-spam)
    if (!validateHoneypot(formData.honeypot)) {
      showError(t('validation.errorTitle'), t('validation.spamDetected'));
      return;
    }
    
    // Verificar rate limiting
    const rateLimitCheck = contactFormLimiter.checkLimit();
    if (!rateLimitCheck.allowed) {
      showError(
        t('validation.rateLimitTitle'),
        t('validation.rateLimitMessage', { seconds: rateLimitCheck.remainingTime })
      );
      return;
    }
    
    // Sanitizar datos
    const sanitizedData = sanitizeFormData(formData);
    
    // Validar datos
    const validation = validateFormData(sanitizedData);
    
    if (!validation.isValid) {
      // Mostrar errores de validación
      const errorMessages = Object.values(validation.errors).map(errorKey => t(errorKey));
      showValidationErrors(t('validation.errorsTitle'), errorMessages);
      setFieldErrors(validation.errors);
      return;
    }
    
    // Limpiar errores previos
    setFieldErrors({});
    
    // Iniciar envío
    setIsSubmitting(true);
    showLoading(t('contact.form.sending'));
    
    try {
      // Registrar intento de envío
      contactFormLimiter.recordAttempt();
      
      // Preparar datos para el backend (Cloudflare Workers)
      const dataToSend = {
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language
      };
      
      // TODO: Integrar con Cloudflare Workers
      // Descomentar el siguiente código cuando esté listo el backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dataToSend)
      // });
      // 
      // if (!response.ok) throw new Error('Failed to send');
      
      // Simulación de envío exitoso (2 segundos)
      // Eliminar esta línea cuando se implemente el backend real
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log de datos para verificación (remover en producción)
      console.log('Form data ready for backend:', dataToSend);
      
      // Cerrar loading y mostrar éxito
      closeAlert();
      await showSuccess(
        t('validation.successTitle'),
        t('validation.successMessage')
      );
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        honeypot: ''
      });
      
    } catch (error) {
      // Cerrar loading y mostrar error
      closeAlert();
      showError(
        t('validation.errorTitle'),
        t('validation.errorMessage')
      );
      console.error('Error sending form:', error);
    } finally {
      setIsSubmitting(false);
    }
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition ${
                  fieldErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('contact.form.namePlaceholder')}
              />
              {fieldErrors.name && (
                <p className="text-red-400 text-sm mt-1">{t(fieldErrors.name)}</p>
              )}
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition ${
                    fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {fieldErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{t(fieldErrors.email)}</p>
                )}
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition ${
                    fieldErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.form.phonePlaceholder')}
                />
                {fieldErrors.phone && (
                  <p className="text-red-400 text-sm mt-1">{t(fieldErrors.phone)}</p>
                )}
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition bg-white ${
                  fieldErrors.service ? 'border-red-500' : 'border-gray-300'
                }`}
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
              {fieldErrors.service && (
                <p className="text-red-400 text-sm mt-1">{t(fieldErrors.service)}</p>
              )}
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none ${
                  fieldErrors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={t('contact.form.messagePlaceholder')}
              />
              {fieldErrors.message && (
                <p className="text-red-400 text-sm mt-1">{t(fieldErrors.message)}</p>
              )}
            </div>

            {/* Campo Honeypot (oculto para usuarios, visible para bots) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="honeypot">Leave this field empty</label>
              <input
                type="text"
                id="honeypot"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
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
          </form>
        </div>
      </div>
    </section>
  );
}