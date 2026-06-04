import { Phone, MessageCircle, Clock } from 'lucide-react';

/**
 * Moduł konwersji telefonicznej — dla osób niezdecydowanych, które wolą rozmowę
 * niż formularz. Mocny, konkretny komunikat o szybkim oddzwonieniu.
 */
export default function CallbackSection() {
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;

  return (
    <section className="py-16 bg-gradient-to-br from-gold-50 to-navy-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-navy-100 shadow-sm p-8 md:p-10 text-center">
          <div className="inline-flex w-16 h-16 bg-navy-900 rounded-2xl items-center justify-center mb-5">
            <Phone className="w-8 h-8 text-gold-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
            Nie jesteś pewien? Zadzwoń teraz.
          </h2>
          <p className="text-lg text-navy-700 max-w-xl mx-auto mb-2">
            W kilka minut wyjaśnimy, czego dokładnie potrzebujesz w Twojej sytuacji — bez zobowiązań.
          </p>

          <div className="inline-flex items-center gap-2 text-sm text-navy-600 mb-7">
            <Clock className="w-4 h-4 text-gold-600" />
            Oddzwaniamy zwykle w ciągu <strong className="text-navy-900">15 minut</strong> w godzinach pracy.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-900 font-bold text-lg rounded-lg hover:bg-gold-600 transition-all shadow-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              {phone}
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=Witam,%20interesuje%20mnie%20najem%20okazjonalny`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-navy-900 text-white font-bold text-lg rounded-lg hover:bg-navy-800 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Napisz na WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
