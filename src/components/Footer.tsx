'use client';

import Link from 'next/link';
import { Phone, Mail, KeyRound } from 'lucide-react';
import { company, fullAddress } from '@/lib/company';
import { useT } from '@/lib/i18n/LanguageProvider';
import { useCookieConsent } from '@/lib/cookie-consent/CookieConsent';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useT();
  const { openSettings } = useCookieConsent();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-navy-900" />
              </div>
              <span className="text-xl font-bold">Najem Okazjonalny</span>
            </div>
            <p className="text-navy-300 max-w-md text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="text-navy-400 text-xs mt-4 leading-relaxed">
              {company.legalName}<br />
              {fullAddress}<br />
              NIP: {company.nip} · REGON: {company.regon} · KRS: {company.krs}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-500">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#pakiety" className="text-navy-300 hover:text-white transition-colors">
                  {t('footer.linkPackages')}
                </a>
              </li>
              <li>
                <Link href="/dla-wynajmujacych" className="text-navy-300 hover:text-white transition-colors">
                  {t('footer.linkLandlords')}
                </Link>
              </li>
              <li>
                <Link href="/obsluga-wielu-lokali" className="text-navy-300 hover:text-white transition-colors">
                  {t('footer.linkBusiness')}
                </Link>
              </li>
              <li>
                <Link href="/najem-okazjonalny" className="text-navy-300 hover:text-white transition-colors">
                  {t('footer.linkCities')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-navy-300 hover:text-white transition-colors">
                  {t('footer.linkBlog')}
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-navy-300 hover:text-white transition-colors">
                  {t('footer.linkFaq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-500">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="flex items-center space-x-2 text-navy-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{process.env.NEXT_PUBLIC_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="flex items-center space-x-2 text-navy-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-sm text-gold-500">{t('footer.legalDocs')}</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/polityka-prywatnosci" className="text-navy-300 hover:text-white transition-colors">
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="/regulamin" className="text-navy-300 hover:text-white transition-colors">
                    {t('footer.terms')}
                  </Link>
                </li>
                <li>
                  <Link href="/rodo" className="text-navy-300 hover:text-white transition-colors">
                    {t('footer.rodo')}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={openSettings}
                    className="text-navy-300 hover:text-white transition-colors text-left"
                  >
                    {t('cookies.manage')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <p className="text-navy-500 text-xs leading-relaxed mb-6">
            {t('footer.disclaimer')}
          </p>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-navy-400 text-sm">
              © {currentYear} {company.legalName}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
