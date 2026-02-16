import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

const INITIAL_FORM = { name: '', email: '', phone: '', service: '', message: '' };

const CONTACT_INFO = [
  { Icon: Phone, labelKey: 'contact.phone', href: 'tel:+17195657189', text: '(719) 565-7189' },
  { Icon: Mail, labelKey: 'contact.email', href: 'mailto:vpadilla604@gmail.com', text: 'vpadilla604@gmail.com' },
  { Icon: MapPin, labelKey: 'contact.location', text: null },
];

const SERVICE_OPTIONS = [
  { value: 'Patios', key: 'services.service1.name' },
  { value: 'Driveways', key: 'services.service2.name' },
  { value: 'Walkways', key: 'services.service3.name' },
  { value: 'Sidewalks', key: 'services.service4.name' },
  { value: 'Concrete Reinforced', key: 'services.service5.name' },
  { value: 'Stamped Concrete', key: 'services.service6.name' },
  { value: 'Other', key: 'contact.form.other' },
];

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitMessage('¡Gracias! Nos pondremos en contacto pronto.');
      setIsSubmitting(false);
      setFormData(INITIAL_FORM);
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader titleKey="contact.title" subtitleKey="contact.subtitle" />

        {/* Contact info cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {CONTACT_INFO.map(({ Icon, labelKey, href, text }) => (
            <div key={labelKey} className="flex flex-col items-center text-center glass-card rounded-3xl p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-white mb-2 text-shadow">{t(labelKey)}</h3>
              {href ? (
                <a href={href} className="text-white hover:text-red-400 transition text-shadow">
                  {text}
                </a>
              ) : (
                <p className="text-white text-shadow">{t('contact.address')}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto glass-card rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center text-shadow">
            {t('contact.form.title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-semibold mb-2 text-shadow">
                {t('contact.form.name')} *
              </label>
              <input
                type="text" id="name" name="name" required
                value={formData.name} onChange={handleChange}
                className="input-field" placeholder={t('contact.form.namePlaceholder')}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 text-shadow">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email" id="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  className="input-field" placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-white font-semibold mb-2 text-shadow">
                  {t('contact.form.phone')} *
                </label>
                <input
                  type="tel" id="phone" name="phone" required
                  value={formData.phone} onChange={handleChange}
                  className="input-field" placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-white font-semibold mb-2 text-shadow">
                {t('contact.form.service')} *
              </label>
              <select
                id="service" name="service" required
                value={formData.service} onChange={handleChange}
                className="input-field bg-white"
              >
                <option value="">{t('contact.form.selectService')}</option>
                {SERVICE_OPTIONS.map(({ value, key }) => (
                  <option key={value} value={value}>{t(key)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-semibold mb-2 text-shadow">
                {t('contact.form.message')} *
              </label>
              <textarea
                id="message" name="message" required rows="5"
                value={formData.message} onChange={handleChange}
                className="input-field resize-none" placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-white transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
                }`}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>

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