'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react';
import { getPackageById } from '@/lib/packages';
import { formatPrice } from '@/lib/utils';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

type Role = 'tenant' | 'landlord' | 'manager';
type Problem = 'no-address' | 'documents' | 'full-service' | 'unsure';
type Speed = 'today' | '2days' | 'week';

// Wartości stałe (niezależne od języka); etykiety pobierane z tłumaczeń po indeksie.
const STEP_META: { key: 'role' | 'problem' | 'speed'; values: string[] }[] = [
  { key: 'role', values: ['tenant', 'landlord', 'manager'] },
  { key: 'problem', values: ['no-address', 'documents', 'full-service', 'unsure'] },
  { key: 'speed', values: ['today', '2days', 'week'] },
];

interface Recommendation {
  isInvestor: boolean;
  packageId?: string;
  reasonKey: string;
}

function recommend(role: Role, problem: Problem, speed: Speed): Recommendation {
  if (role === 'manager') return { isInvestor: true, reasonKey: 'manager' };
  if (problem === 'full-service') return { isInvestor: false, packageId: 'vip', reasonKey: 'fullService' };
  if (speed === 'today') return { isInvestor: false, packageId: 'premium', reasonKey: 'today' };
  if (problem === 'no-address' && speed === 'week') return { isInvestor: false, packageId: 'basic', reasonKey: 'noAddressWeek' };
  return { isInvestor: false, packageId: 'standard', reasonKey: 'standard' };
}

export default function QuickQuiz() {
  const router = useRouter();
  const t = useT();
  const { tx } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const qsteps = tx<{ question: string; options: string[] }[]>('quiz.steps');
  const STEPS = STEP_META.map((m, i) => ({
    key: m.key,
    question: qsteps[i].question,
    options: m.values.map((value, j) => ({ value, label: qsteps[i].options[j] })),
  }));

  const isResult = step >= STEPS.length;

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const rec = isResult
    ? recommend(answers.role as Role, answers.problem as Problem, answers.speed as Speed)
    : null;
  const recommendedPkg = rec && !rec.isInvestor ? getPackageById(rec.packageId!) : undefined;

  return (
    <section id="kreator" className="py-20 bg-gradient-to-br from-navy-900 to-navy-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('quiz.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('quiz.heading')}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
          {/* Pasek postępu */}
          {!isResult && (
            <div className="mb-8">
              <div className="flex justify-between text-xs text-navy-500 mb-2">
                <span>{t('quiz.progressStep')} {step + 1} {t('quiz.progressOf')} {STEPS.length}</span>
                <span>{Math.round((step / STEPS.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-500 transition-all duration-300"
                  style={{ width: `${(step / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {!isResult ? (
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
                {STEPS[step].question}
              </h3>
              <div className="grid gap-3">
                {STEPS[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(STEPS[step].key, opt.value)}
                    className="group flex items-center justify-between px-6 py-4 rounded-xl border-2 border-navy-200 hover:border-gold-500 hover:bg-gold-50 transition-all text-left"
                  >
                    <span className="font-semibold text-navy-900">{opt.label}</span>
                    <ArrowRight className="w-5 h-5 text-navy-300 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-6 text-sm text-navy-500 hover:text-navy-700"
                >
                  {t('quiz.back')}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex w-14 h-14 bg-gold-100 rounded-full items-center justify-center mb-4">
                <Check className="w-7 h-7 text-gold-600" strokeWidth={3} />
              </div>

              {rec?.isInvestor ? (
                <>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">
                    {t('quiz.investorTitle')}
                  </h3>
                  <p className="text-navy-600 mb-6 max-w-lg mx-auto">{t(`quiz.reasons.${rec.reasonKey}`)}</p>
                  <button
                    onClick={() => router.push('/obsluga-wielu-lokali')}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-all shadow-lg"
                  >
                    {t('quiz.investorBtn')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </>
              ) : (
                <>
                  <div className="text-sm text-navy-500 mb-1">{t('quiz.recommendedLabel')}</div>
                  <h3 className="text-3xl font-bold text-navy-900 mb-1">
                    {t('quiz.packagePrefix')} {recommendedPkg?.name}
                  </h3>
                  <div className="text-2xl font-bold text-gold-600 mb-3">
                    {recommendedPkg && formatPrice(recommendedPkg.price)}
                  </div>
                  <p className="text-navy-600 mb-6 max-w-lg mx-auto">{rec && t(`quiz.reasons.${rec.reasonKey}`)}</p>
                  <button
                    onClick={() => router.push(`/zamowienie?pakiet=${rec?.packageId}`)}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded-lg hover:bg-gold-600 transition-all shadow-lg w-full sm:w-auto"
                  >
                    {t('quiz.orderPrefix')} {recommendedPkg?.name}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-navy-100">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-sm text-navy-500 hover:text-navy-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('quiz.restart')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
