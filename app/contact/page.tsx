'use client';

import { useLanguage }  from '@/app/contexts/languagecontext';
import { Mail, Phone, Globe, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = {
    title: language === 'fr' ? 'Contactez-nous' : 'Contact Us',
    subtitle: language === 'fr'
      ? 'Nous sommes lÃƒÂ  pour rÃƒÂ©pondre ÃƒÂ  toutes vos questions'
      : 'We are here to answer all your questions',
    getInTouch: language === 'fr' ? 'Restons en contact' : 'Get in Touch',
    contactInfo: language === 'fr' ? 'Informations de contact' : 'Contact Information',
    sendMessage: language === 'fr' ? 'Envoyer un message' : 'Send Message',
    name: language === 'fr' ? 'Nom complet' : 'Full Name',
    email: language === 'fr' ? 'Adresse email' : 'Email Address',
    subject: language === 'fr' ? 'Sujet' : 'Subject',
    message: language === 'fr' ? 'Message' : 'Message',
    send: language === 'fr' ? 'Envoyer' : 'Send',
    sending: language === 'fr' ? 'Envoi en cours...' : 'Sending...',
    success: language === 'fr' 
      ? 'Message envoyÃƒÂ© avec succÃƒÂ¨s! Nous vous rÃƒÂ©pondrons dans les plus brefs dÃƒÂ©lais.'
      : 'Message sent successfully! We will get back to you as soon as possible.',
    phone: 'TÃƒÂ©lÃƒÂ©phone',
    website: 'Site web',
    location: language === 'fr' ? 'Localisation' : 'Location',
    abidjan: 'Abidjan, CÃƒÂ´te d\'Ivoire',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.getInTouch}</h2>
            <p className="text-gray-700 mb-8 text-lg">
              {language === 'fr'
                ? 'Avez-vous des questions? N\'hÃƒÂ©sitez pas ÃƒÂ  nous contacter. Notre ÃƒÂ©quipe est prÃƒÂªte ÃƒÂ  vous aider.'
                : 'Have questions? Don\'t hesitate to contact us. Our team is ready to help you.'}
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.contactInfo}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{t.phone}</p>
                    <a href="tel:+2250555007884" className="text-blue-600 hover:underline">
                      +225 05 55 00 78 84
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <a href="mailto:info@cobelbtc.com" className="text-blue-600 hover:underline block">
                      info@cobelbtc.com
                    </a>
                    <a href="mailto:Abel.coulibaly@cobelbtc.com" className="text-blue-600 hover:underline block">
                      Abel.coulibaly@cobelbtc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Globe className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{t.website}</p>
                    <a href="https://www.cobelbtc.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      www.cobelbtc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">{t.location}</p>
                    <p className="text-gray-700">{t.abidjan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.sendMessage}</h2>
            
            {isSubmitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                {t.success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t.send}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

