'use client';

import { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import Button from './Button';
import { ContactFormData } from '@/types';
import { company } from '@/lib/company';
import { useT } from '@/lib/i18n/LanguageProvider';

export default function ContactSection() {
  const t = useT();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', consent: false });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-navy-50 to-white p-8 rounded-2xl border-2 border-navy-100">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">
              {t('contact.formTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-navy-900 mb-2">
                  {t('contact.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy-900 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 text-gold-600 border-navy-300 rounded focus:ring-gold-500"
                />
                <label htmlFor="consent" className="text-sm text-navy-700">
                  {t('contact.consentPre').replace('{company}', company.legalName)}
                  <a href="/polityka-prywatnosci" className="text-gold-600 hover:underline">
                    {t('contact.consentLink')}
                  </a>
                  {t('contact.consentPost')}
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  {t('contact.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {t('contact.error')}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 mr-2 inline" />
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-6">
                {t('contact.other')}
              </h3>
              <div className="space-y-6">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-navy-50 to-white rounded-xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 mb-1">{t('contact.phoneLabel')}</div>
                    <div className="text-navy-700">{process.env.NEXT_PUBLIC_PHONE}</div>
                    <div className="text-sm text-navy-600 mt-1">{t('contact.phoneHours')}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="flex items-start space-x-4 p-6 bg-gradient-to-br from-navy-50 to-white rounded-xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 mb-1">{t('contact.emailLabel')}</div>
                    <div className="text-navy-700">{process.env.NEXT_PUBLIC_EMAIL}</div>
                    <div className="text-sm text-navy-600 mt-1">{t('contact.emailReply')}</div>
                  </div>
                </a>

              </div>
            </div>

            <div className="bg-gold-50 border-2 border-gold-200 rounded-xl p-6">
              <h4 className="font-semibold text-navy-900 mb-3">{t('contact.hoursTitle')}</h4>
              <p className="text-navy-700 text-sm leading-relaxed">
                {t('contact.hoursText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
