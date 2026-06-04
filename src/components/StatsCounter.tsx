'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface Stat {
  icon: typeof Users;
  /** Wartość docelowa do animacji (jeśli liczbowa). */
  target?: number;
  /** Sufiks/prefiks po liczbie (np. "+", "%", "h"). */
  suffix?: string;
  /** Jeśli statyczny tekst zamiast liczby. */
  staticValue?: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: Users, target: 100, suffix: '+', label: 'obsłużonych klientów' },
  { icon: ShieldCheck, target: 100, suffix: '%', label: 'zaakceptowanych dokumentów' },
  { icon: Clock, staticValue: '24-48h', label: 'średni czas realizacji' },
  { icon: MapPin, staticValue: 'Cała Polska', label: 'obszar działania' },
];

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const Icon = stat.icon;
  const counted = useCountUp(stat.target ?? 0, run && stat.target !== undefined);
  const display = stat.staticValue ?? `${counted}${stat.suffix ?? ''}`;

  return (
    <div className="text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold-500/15 flex items-center justify-center">
        <Icon className="w-7 h-7 text-gold-400" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{display}</div>
      <div className="text-sm text-navy-300">{stat.label}</div>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
