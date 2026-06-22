'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { packages, getPackageById } from '@/lib/packages';
import { sumAddons, getAddonById, addonsForPackage, courierSurchargeFor } from '@/lib/addons';
import { getDiscount, discountAmountFor } from '@/lib/discounts';
import { LEGAL } from '@/lib/legal';
import { formatPrice, generateOrderId, validatePESEL, validateNIP } from '@/lib/utils';
import { Package } from '@/types';
import DeliverySection, { DeliveryValue } from '@/components/DeliverySection';
import { Check, AlertCircle, Plus } from 'lucide-react';
import { useT, useLanguage } from '@/lib/i18n/LanguageProvider';

interface AddonTr { name: string; description: string; highlights?: string[] }
interface PkgTr { features: string[] }

function OrderFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useT();
  const { tx } = useLanguage();
  const addonsTr = tx<Record<string, AddonTr>>('addonsData');
  const pkgTr = tx<Record<string, PkgTr>>('packagesData');
  const packageId = searchParams.get('pakiet') || 'standard';

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<DeliveryValue>({ method: 'email' });
  const [discountInput, setDiscountInput] = useState(searchParams.get('kod') || '');
  const [appliedCode, setAppliedCode] = useState<string>(searchParams.get('kod') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Dodatki dopasowane do wybranego pakietu (bez tych już wliczonych)
  const availableAddons = selectedPackage ? addonsForPackage(selectedPackage.id) : [];

  const addonsTotal = sumAddons(selectedAddons);
  // Kurier w cenie w Premium i Komplet; w Standard pod adres za dopłatą.
  const courierSurcharge = selectedPackage ? courierSurchargeFor(selectedPackage.id, 'kurier') : 0;
  const deliverySurcharge = selectedPackage ? courierSurchargeFor(selectedPackage.id, delivery.method) : 0;
  const baseTotal = (selectedPackage?.price ?? 0) + addonsTotal + deliverySurcharge;
  const appliedDiscount = appliedCode ? getDiscount(appliedCode) : null;
  const discountValue = appliedDiscount ? discountAmountFor(baseTotal, appliedCode) : 0;
  const orderTotal = baseTotal - discountValue;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pesel: '',
    currentAddress: '',
    rentalPurpose: '',
    termsConsent: false,
    privacyConsent: false,
    immediateServiceConsent: false,
    serviceDisclaimerConsent: false,
    marketingConsent: false,
    // Dokument sprzedaży
    wantInvoice: false,
    invoiceBuyerType: 'company' as 'company' | 'person',
    invoiceCompanyName: '',
    invoiceNip: '',
    invoiceBuyerName: '',
    invoiceAddress: '',
  });

  useEffect(() => {
    const pkg = getPackageById(packageId);
    if (pkg) {
      setSelectedPackage(pkg);
    } else {
      setSelectedPackage(packages[1]); // default to standard
    }
  }, [packageId]);

  // Po zmianie pakietu usuń zaznaczone dodatki, które są już w nim wliczone
  useEffect(() => {
    if (!selectedPackage) return;
    const allowed = new Set(addonsForPackage(selectedPackage.id).map((a) => a.id));
    setSelectedAddons((prev) => prev.filter((id) => allowed.has(id)));
  }, [selectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!validatePESEL(formData.pesel)) {
      setError(t('order.errPesel'));
      return;
    }

    if (!formData.termsConsent || !formData.privacyConsent || !formData.immediateServiceConsent || !formData.serviceDisclaimerConsent) {
      setError(t('order.errConsents'));
      return;
    }

    // Walidacja dostawy
    if (delivery.method === 'paczkomat' && !delivery.pointCode?.trim()) {
      setError(t('order.errPaczkomat'));
      return;
    }
    if (
      delivery.method === 'kurier' &&
      (!delivery.recipientName?.trim() || !delivery.street?.trim() || !delivery.postalCode?.trim() || !delivery.city?.trim())
    ) {
      setError(t('order.errKurier'));
      return;
    }

    // Walidacja danych do faktury (gdy zaznaczono)
    if (formData.wantInvoice) {
      if (!formData.invoiceAddress.trim()) {
        setError(t('order.invoiceForm.errData'));
        return;
      }
      if (formData.invoiceBuyerType === 'company') {
        if (!formData.invoiceCompanyName.trim()) {
          setError(t('order.invoiceForm.errData'));
          return;
        }
        if (!validateNIP(formData.invoiceNip)) {
          setError(t('order.invoiceForm.errNip'));
          return;
        }
      } else if (!formData.invoiceBuyerName.trim()) {
        setError(t('order.invoiceForm.errData'));
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const orderId = generateOrderId();

      const orderData = {
        orderId,
        package: selectedPackage?.id,
        addons: selectedAddons,
        personalData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          pesel: formData.pesel,
        },
        rentalData: {
          currentAddress: formData.currentAddress,
          rentalPurpose: formData.rentalPurpose,
        },
        invoice: {
          wantInvoice: formData.wantInvoice,
          buyerType: formData.wantInvoice ? formData.invoiceBuyerType : undefined,
          companyName:
            formData.wantInvoice && formData.invoiceBuyerType === 'company'
              ? formData.invoiceCompanyName
              : undefined,
          nip:
            formData.wantInvoice && formData.invoiceBuyerType === 'company'
              ? formData.invoiceNip.replace(/[\s-]/g, '')
              : undefined,
          buyerName:
            formData.wantInvoice && formData.invoiceBuyerType === 'person'
              ? formData.invoiceBuyerName
              : undefined,
          address: formData.wantInvoice ? formData.invoiceAddress : undefined,
        },
        regulaminVersion: LEGAL.regulaminVersion,
        politykaVersion: LEGAL.politykaVersion,
        discountCode: appliedDiscount ? appliedCode : undefined,
        delivery,
        consents: {
          terms: formData.termsConsent,
          privacy: formData.privacyConsent,
          immediateService: formData.immediateServiceConsent,
          serviceDisclaimer: formData.serviceDisclaimerConsent,
          marketing: formData.marketingConsent,
        },
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.redirectUrl) {
        // Redirect to PayU
        window.location.href = data.redirectUrl;
      } else {
        setError(data.error || t('order.errOrder'));
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(t('order.errConnection'));
      setIsSubmitting(false);
    }
  };

  if (!selectedPackage) {
    return <div className="min-h-screen flex items-center justify-center">{t('order.loading')}</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              {t('order.title')}
            </h1>
            <p className="text-lg text-navy-700">
              {t('order.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  {t('order.yourData')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        {t('order.firstName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        {t('order.lastName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-900 mb-2">
                      {t('order.email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        {t('order.phone')}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                        placeholder="+48 123 456 789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        {t('order.pesel')}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={11}
                        value={formData.pesel}
                        onChange={(e) => setFormData({ ...formData, pesel: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                        placeholder="12345678901"
                      />
                    </div>
                  </div>

                  {/* Rental Data */}
                  <div className="pt-6 border-t-2 border-navy-100">
                    <h3 className="text-xl font-bold text-navy-900 mb-4">
                      {t('order.rentalData')}
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-navy-900 mb-2">
                          {t('order.currentAddress')}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.currentAddress}
                          onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                          placeholder={t('order.currentAddressPlaceholder')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy-900 mb-2">
                          {t('order.rentalPurpose')}
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.rentalPurpose}
                          onChange={(e) => setFormData({ ...formData, rentalPurpose: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none resize-none"
                          placeholder={t('order.rentalPurposePlaceholder')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cross-sell: dodatki opcjonalne */}
                  <div className="pt-6 border-t-2 border-navy-100">
                    <h3 className="text-xl font-bold text-navy-900 mb-1">
                      {t('order.addonsTitle')} <span className="text-sm font-normal text-navy-500">{t('order.addonsOptional')}</span>
                    </h3>
                    <p className="text-sm text-navy-600 mb-4">
                      {t('order.addonsHint')}
                    </p>
                    <div className="space-y-3">
                      {availableAddons.map((addon) => {
                        const checked = selectedAddons.includes(addon.id);
                        const isBundle = !!addon.featured;
                        const atr = addonsTr[addon.id] || { name: addon.name, description: addon.description, highlights: addon.highlights };
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              checked
                                ? 'border-gold-500 bg-gold-50'
                                : isBundle
                                ? 'border-gold-400 bg-gold-50/40 hover:border-gold-500'
                                : 'border-navy-200 hover:border-gold-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleAddon(addon.id)}
                              className="mt-1 w-4 h-4 accent-gold-600"
                            />
                            <span className="flex-grow">
                              {isBundle && (
                                <span className="inline-flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded-full bg-navy-900 text-gold-300 text-[11px] font-bold uppercase tracking-wide">
                                  {t('order.bundleBadge')}
                                </span>
                              )}
                              <span className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-navy-900 text-sm">{atr.name}</span>
                                <span className="flex items-center text-gold-700 font-bold text-sm whitespace-nowrap">
                                  <Plus className="w-3.5 h-3.5" />
                                  {formatPrice(addon.price)}
                                </span>
                              </span>
                              <span className="block text-xs text-navy-600 mt-1">{atr.description}</span>
                              {atr.highlights && atr.highlights.length > 0 && (
                                <span className="mt-2 grid gap-1">
                                  {atr.highlights.map((item) => (
                                    <span key={item} className="flex items-start gap-1.5 text-xs text-navy-700">
                                      <Check className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" />
                                      <span>{item}</span>
                                    </span>
                                  ))}
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dostawa dokumentów */}
                  <DeliverySection
                    packageId={selectedPackage.id}
                    value={delivery}
                    onChange={setDelivery}
                    courierSurcharge={courierSurcharge}
                  />

                  {/* Dokument sprzedaży: faktura / rachunek */}
                  <div className="pt-6 border-t-2 border-navy-100">
                    <h3 className="text-xl font-bold text-navy-900 mb-3">{t('order.invoiceForm.title')}</h3>
                    <label className="flex items-start gap-3 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.wantInvoice}
                        onChange={(e) => setFormData({ ...formData, wantInvoice: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-gold-600"
                      />
                      <span className="text-sm font-medium text-navy-900">{t('order.invoiceForm.want')}</span>
                    </label>
                    <p className="text-xs text-navy-500 mb-4">{t('order.invoiceForm.note')}</p>

                    {formData.wantInvoice && (
                      <div className="space-y-4 bg-navy-50 rounded-xl p-4">
                        <div className="flex flex-wrap gap-3">
                          {(['company', 'person'] as const).map((bt) => (
                            <button
                              key={bt}
                              type="button"
                              onClick={() => setFormData({ ...formData, invoiceBuyerType: bt })}
                              className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                                formData.invoiceBuyerType === bt
                                  ? 'border-gold-500 bg-gold-50 text-navy-900'
                                  : 'border-navy-200 text-navy-700 hover:border-gold-300'
                              }`}
                            >
                              {bt === 'company' ? t('order.invoiceForm.company') : t('order.invoiceForm.person')}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                invoiceAddress: formData.invoiceAddress || formData.currentAddress,
                                invoiceBuyerName:
                                  formData.invoiceBuyerName ||
                                  `${formData.firstName} ${formData.lastName}`.trim(),
                              })
                            }
                            className="ml-auto text-sm text-gold-700 hover:text-gold-800 font-medium underline"
                          >
                            {t('order.invoiceForm.copyFromForm')}
                          </button>
                        </div>

                        {formData.invoiceBuyerType === 'company' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.invoiceForm.companyName')}</label>
                              <input
                                type="text"
                                value={formData.invoiceCompanyName}
                                onChange={(e) => setFormData({ ...formData, invoiceCompanyName: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.invoiceForm.nip')}</label>
                              <input
                                type="text"
                                value={formData.invoiceNip}
                                onChange={(e) => setFormData({ ...formData, invoiceNip: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                                placeholder="1234567890"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.invoiceForm.buyerName')}</label>
                            <input
                              type="text"
                              value={formData.invoiceBuyerName}
                              onChange={(e) => setFormData({ ...formData, invoiceBuyerName: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-navy-900 mb-2">{t('order.invoiceForm.address')}</label>
                          <input
                            type="text"
                            value={formData.invoiceAddress}
                            onChange={(e) => setFormData({ ...formData, invoiceAddress: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                            placeholder="ul. Przykładowa 1, 00-001 Warszawa"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Consents */}
                  <div className="pt-6 border-t-2 border-navy-100 space-y-4">
                    <h3 className="text-xl font-bold text-navy-900 mb-4">
                      Zgody
                    </h3>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={formData.termsConsent}
                        onChange={(e) => setFormData({ ...formData, termsConsent: e.target.checked })}
                        className="mt-1 w-4 h-4"
                      />
                      <label htmlFor="terms" className="text-sm text-navy-700">
                        {t('order.consentTermsPre')}
                        <a href="/regulamin" target="_blank" className="text-gold-600 hover:underline">
                          {t('order.consentTermsLink')}
                        </a>
                        {t('order.consentTermsPost')}
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className="mt-1 w-4 h-4"
                      />
                      <label htmlFor="privacy" className="text-sm text-navy-700">
                        {t('order.consentPrivacyPre')}
                        <a href="/polityka-prywatnosci" target="_blank" className="text-gold-600 hover:underline">
                          {t('order.consentPrivacyLink')}
                        </a>
                        {t('order.consentPrivacyMid')}
                        <a href="/rodo" target="_blank" className="text-gold-600 hover:underline">
                          {t('order.consentRodoLink')}
                        </a>
                        {t('order.consentPrivacyPost')}
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="immediate"
                        required
                        checked={formData.immediateServiceConsent}
                        onChange={(e) => setFormData({ ...formData, immediateServiceConsent: e.target.checked })}
                        className="mt-1 w-4 h-4"
                      />
                      <label htmlFor="immediate" className="text-sm text-navy-700">
                        {t('order.consentImmediate')}
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="serviceDisclaimer"
                        required
                        checked={formData.serviceDisclaimerConsent}
                        onChange={(e) => setFormData({ ...formData, serviceDisclaimerConsent: e.target.checked })}
                        className="mt-1 w-4 h-4"
                      />
                      <label htmlFor="serviceDisclaimer" className="text-sm text-navy-700">
                        {t('order.consentServiceDisclaimer')}
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="marketing"
                        checked={formData.marketingConsent}
                        onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                        className="mt-1 w-4 h-4"
                      />
                      <label htmlFor="marketing" className="text-sm text-navy-700">
                        {t('order.consentMarketing')}
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('order.processing') : t('order.submit')}
                  </Button>

                  <p className="text-sm text-navy-600 text-center">
                    {t('order.redirectNote').replace('{provider}', LEGAL.paymentProvider)}
                  </p>
                  <p className="text-xs text-navy-500 text-center">
                    {t('order.disclaimer')}
                  </p>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  {t('order.summaryTitle')}
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-navy-600 mb-1">{t('order.selectedPackage')}</div>
                    <div className="font-semibold text-navy-900">{selectedPackage.name}</div>
                  </div>

                  <div className="pt-4 border-t-2 border-navy-100">
                    <div className="text-sm text-navy-600 mb-2">{t('order.inPackage')}</div>
                    <ul className="space-y-2">
                      {(() => {
                        const features = pkgTr[selectedPackage.id]?.features || selectedPackage.features;
                        const shown = showAllFeatures ? features : features.slice(0, 3);
                        return shown.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                            <span className="text-navy-700">{feature}</span>
                          </li>
                        ));
                      })()}
                    </ul>
                    {(pkgTr[selectedPackage.id]?.features || selectedPackage.features).length > 3 && (
                      <button
                        type="button"
                        onClick={() => setShowAllFeatures((v) => !v)}
                        className="mt-2 text-sm font-medium text-gold-600 hover:text-gold-700"
                      >
                        {showAllFeatures
                          ? t('order.collapse')
                          : t('order.showAll').replace('{n}', String((pkgTr[selectedPackage.id]?.features || selectedPackage.features).length - 3))}
                      </button>
                    )}
                  </div>

                  <div className="pt-4 border-t-2 border-navy-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-navy-700">{t('pkg.packagePrefix')} {selectedPackage.name}:</span>
                      <span className="font-semibold text-navy-900">
                        {formatPrice(selectedPackage.price)}
                      </span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-1.5 mb-2">
                        {selectedAddons
                          .map((id) => getAddonById(id))
                          .filter((a): a is NonNullable<typeof a> => Boolean(a))
                          .map((a) => (
                          <div key={a.id} className="flex justify-between items-start text-sm gap-2">
                            <span className="text-navy-600">+ {addonsTr[a.id]?.name || a.name}</span>
                            <span className="text-navy-700 whitespace-nowrap">{formatPrice(a.price)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {deliverySurcharge > 0 && (
                      <div className="flex justify-between items-start text-sm gap-2 mb-2">
                        <span className="text-navy-600">{t('order.courierSurcharge')}</span>
                        <span className="text-navy-700 whitespace-nowrap">{formatPrice(deliverySurcharge)}</span>
                      </div>
                    )}

                    {/* Kod rabatowy */}
                    <div className="py-3 my-2 border-t border-navy-100">
                      <label className="block text-xs text-navy-600 mb-1">{t('order.discountCode')}</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountInput}
                          onChange={(e) => setDiscountInput(e.target.value)}
                          placeholder="np. POWROT15"
                          className="flex-grow min-w-0 px-3 py-2 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none text-sm uppercase"
                        />
                        <button
                          type="button"
                          onClick={() => setAppliedCode(discountInput)}
                          className="px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors whitespace-nowrap"
                        >
                          {t('order.applyCode')}
                        </button>
                      </div>
                      {appliedCode && !appliedDiscount && (
                        <p className="text-xs text-red-600 mt-1">{t('order.codeInvalid')}</p>
                      )}
                      {appliedDiscount && (
                        <div className="flex justify-between items-center text-sm text-green-700 mt-2">
                          <span>{appliedDiscount.label}</span>
                          <span>−{formatPrice(discountValue)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-navy-100">
                      <span className="text-navy-900">{t('order.toPay')}</span>
                      <span className="text-gold-600">{formatPrice(orderTotal)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-navy-100">
                    <button
                      type="button"
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                      onClick={() => router.push('/#pakiety')}
                    >
                      {t('order.changePackage')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900 mx-auto mb-4"></div>
          <p className="text-navy-700">Ładowanie...</p>
        </div>
      </div>
    }>
      <OrderFormContent />
    </Suspense>
  );
}
