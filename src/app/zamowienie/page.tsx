'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { packages, getPackageById } from '@/lib/packages';
import { sumAddons, getAddonById, addonsForPackage } from '@/lib/addons';
import { getDiscount, discountAmountFor } from '@/lib/discounts';
import { LEGAL } from '@/lib/legal';
import { formatPrice, generateOrderId, validatePESEL } from '@/lib/utils';
import { Package } from '@/types';
import DeliverySection, { DeliveryValue } from '@/components/DeliverySection';
import { Check, AlertCircle, Plus } from 'lucide-react';

function OrderFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get('pakiet') || 'standard';

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<DeliveryValue>({ method: 'email' });
  const [discountInput, setDiscountInput] = useState(searchParams.get('kod') || '');
  const [appliedCode, setAppliedCode] = useState<string>(searchParams.get('kod') || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Dodatki dopasowane do wybranego pakietu (bez tych już wliczonych)
  const availableAddons = selectedPackage ? addonsForPackage(selectedPackage.id) : [];

  const addonsTotal = sumAddons(selectedAddons);
  const baseTotal = (selectedPackage?.price ?? 0) + addonsTotal;
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
    desiredCity: '',
    rentalPurpose: '',
    termsConsent: false,
    privacyConsent: false,
    immediateServiceConsent: false,
    marketingConsent: false,
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
      setError('Podany numer PESEL jest nieprawidłowy');
      return;
    }

    if (!formData.termsConsent || !formData.privacyConsent || !formData.immediateServiceConsent) {
      setError('Musisz zaakceptować wymagane zgody');
      return;
    }

    // Walidacja dostawy
    if (delivery.method === 'paczkomat' && !delivery.pointCode?.trim()) {
      setError('Podaj kod paczkomatu InPost');
      return;
    }
    if (
      delivery.method === 'kurier' &&
      (!delivery.recipientName?.trim() || !delivery.street?.trim() || !delivery.postalCode?.trim() || !delivery.city?.trim())
    ) {
      setError('Uzupełnij dane do wysyłki kurierskiej');
      return;
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
          desiredCity: formData.desiredCity,
          rentalPurpose: formData.rentalPurpose,
        },
        regulaminVersion: LEGAL.regulaminVersion,
        discountCode: appliedDiscount ? appliedCode : undefined,
        delivery,
        consents: {
          terms: formData.termsConsent,
          privacy: formData.privacyConsent,
          immediateService: formData.immediateServiceConsent,
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
        setError(data.error || 'Wystąpił błąd podczas przetwarzania zamówienia');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('Wystąpił błąd połączenia. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  if (!selectedPackage) {
    return <div className="min-h-screen flex items-center justify-center">Ładowanie...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              Formularz zamówienia
            </h1>
            <p className="text-lg text-navy-700">
              Wypełnij formularz, aby przejść do płatności
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  Twoje dane
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-navy-900 mb-2">
                        Imię *
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
                        Nazwisko *
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
                      Adres e-mail *
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
                        Numer telefonu *
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
                        PESEL *
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
                      Dane dotyczące najmu
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-navy-900 mb-2">
                          Obecny adres zamieszkania *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.currentAddress}
                          onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                          placeholder="ul. Przykładowa 12/3, 00-001 Warszawa"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy-900 mb-2">
                          Preferowane miasto dla adresu *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.desiredCity}
                          onChange={(e) => setFormData({ ...formData, desiredCity: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none"
                          placeholder="np. Warszawa, Kraków, Wrocław"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy-900 mb-2">
                          Cel najmu *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.rentalPurpose}
                          onChange={(e) => setFormData({ ...formData, rentalPurpose: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-navy-200 rounded-lg focus:border-gold-500 focus:outline-none resize-none"
                          placeholder="Krótki opis celu najmu okazjonalnego"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cross-sell: dodatki opcjonalne */}
                  <div className="pt-6 border-t-2 border-navy-100">
                    <h3 className="text-xl font-bold text-navy-900 mb-1">
                      Przydatne dodatki <span className="text-sm font-normal text-navy-500">(opcjonalnie)</span>
                    </h3>
                    <p className="text-sm text-navy-600 mb-4">
                      Zaznacz, jeśli chcesz dołączyć je do zamówienia. Pokazujemy tylko te, których
                      nie ma jeszcze w wybranym pakiecie.
                    </p>
                    <div className="space-y-3">
                      {availableAddons.map((addon) => {
                        const checked = selectedAddons.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              checked
                                ? 'border-gold-500 bg-gold-50'
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
                              <span className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-navy-900 text-sm">{addon.name}</span>
                                <span className="flex items-center text-gold-700 font-bold text-sm whitespace-nowrap">
                                  <Plus className="w-3.5 h-3.5" />
                                  {formatPrice(addon.price)}
                                </span>
                              </span>
                              <span className="block text-xs text-navy-600 mt-1">{addon.description}</span>
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
                  />

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
                        Akceptuję{' '}
                        <a href="/regulamin" target="_blank" className="text-gold-600 hover:underline">
                          regulamin
                        </a>{' '}
                        świadczenia usług *
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
                        Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{' '}
                        <a href="/polityka-prywatnosci" target="_blank" className="text-gold-600 hover:underline">
                          polityką prywatności
                        </a>{' '}
                        oraz{' '}
                        <a href="/rodo" target="_blank" className="text-gold-600 hover:underline">
                          klauzulą RODO
                        </a>{' '}
                        *
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
                        Żądam rozpoczęcia realizacji usługi natychmiast (przed upływem terminu do
                        odstąpienia od umowy) i przyjmuję do wiadomości, że po jej pełnym wykonaniu
                        utracę prawo odstąpienia od umowy. *
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
                        Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną
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
                    {isSubmitting ? 'Przetwarzanie...' : 'Zamawiam i płacę'}
                  </Button>

                  <p className="text-sm text-navy-600 text-center">
                    Po kliknięciu zostaniesz przekierowany do bezpiecznej płatności {LEGAL.paymentProvider}.
                  </p>
                  <p className="text-xs text-navy-500 text-center">
                    Usługa polega na przygotowaniu kompletu dokumentów do najmu okazjonalnego i nie
                    stanowi porady prawnej. Klient odpowiada za poprawność podanych danych oraz sposób
                    wykorzystania dokumentów.
                  </p>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  Podsumowanie zamówienia
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-navy-600 mb-1">Wybrany pakiet</div>
                    <div className="font-semibold text-navy-900">{selectedPackage.name}</div>
                  </div>

                  <div className="pt-4 border-t-2 border-navy-100">
                    <div className="text-sm text-navy-600 mb-2">W pakiecie:</div>
                    <ul className="space-y-2">
                      {selectedPackage.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span className="text-navy-700">{feature}</span>
                        </li>
                      ))}
                      {selectedPackage.features.length > 3 && (
                        <li className="text-sm text-navy-600 pl-6">
                          ... i {selectedPackage.features.length - 3} więcej
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 border-t-2 border-navy-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-navy-700">Pakiet {selectedPackage.name}:</span>
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
                            <span className="text-navy-600">+ {a.name}</span>
                            <span className="text-navy-700 whitespace-nowrap">{formatPrice(a.price)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Kod rabatowy */}
                    <div className="py-3 my-2 border-t border-navy-100">
                      <label className="block text-xs text-navy-600 mb-1">Kod rabatowy</label>
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
                          Zastosuj
                        </button>
                      </div>
                      {appliedCode && !appliedDiscount && (
                        <p className="text-xs text-red-600 mt-1">Kod nieprawidłowy lub nieaktywny.</p>
                      )}
                      {appliedDiscount && (
                        <div className="flex justify-between items-center text-sm text-green-700 mt-2">
                          <span>{appliedDiscount.label}</span>
                          <span>−{formatPrice(discountValue)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-navy-100">
                      <span className="text-navy-900">Do zapłaty:</span>
                      <span className="text-gold-600">{formatPrice(orderTotal)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-navy-100">
                    <button
                      type="button"
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                      onClick={() => router.push('/#pakiety')}
                    >
                      Zmień pakiet →
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
