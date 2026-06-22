'use client';

import { useRouter } from 'next/navigation';
import {
  Users,
  Home,
  Zap,
  Truck,
  Plane,
  GraduationCap,
  Globe,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

const ICONS = [Users, Home, Zap, Truck, Plane, GraduationCap, Globe, Building2];

export default function TypicalSituationsSection() {
  const router = useRouter();
  const t = useT();
  const { tx } = useLanguage();
  const items = tx<{ title: string; text: string }[]>('situations.items');
  const SITUATIONS = items.map((it, i) => ({ ...it, icon: ICONS[i] }));

  return (
    <section id="kiedy-potrzebna" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('situations.heading')}
          </h2>
          <p className="text-lg text-navy-700 max-w-2xl mx-auto">
            {t('situations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITUATIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <button
                key={i}
                onClick={() => router.push('/zamowienie')}
                className="group text-left bg-gradient-to-br from-navy-50 to-white p-6 rounded-2xl border-2 border-navy-100 hover:border-gold-400 transition-all hover:shadow-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center mb-4 shadow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-navy-700 leading-relaxed mb-4">{s.text}</p>
                <span className="inline-flex items-center gap-1 text-gold-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  {t('situations.cta')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
