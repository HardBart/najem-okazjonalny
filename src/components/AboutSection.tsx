import Image from 'next/image';
import { Award, FileSignature, Stamp, Headphones } from 'lucide-react';
import { company, fullAddress, stats } from '@/lib/company';

export default function AboutSection() {
  const yearsExperience = new Date().getFullYear() - company.foundedYear;

  const process = [
    { icon: FileSignature, label: 'Przygotowujemy oświadczenie właściciela lokalu' },
    { icon: Stamp, label: 'Organizujemy poświadczenie notarialne podpisu' },
    { icon: Headphones, label: 'Prowadzimy Cię przez cały proces telefonicznie' },
  ];

  return (
    <section id="o-nas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Zdjęcie */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-navy-100 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=70"
                alt="Podpisywanie dokumentów najmu okazjonalnego z poświadczeniem notarialnym"
                width={1000}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge z liczbą */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 border-2 border-gold-200">
              <div className="text-4xl font-bold text-navy-900">{stats.clients}</div>
              <div className="text-sm text-navy-600">zrealizowanych spraw</div>
            </div>
          </div>

          {/* Treść */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-100 text-gold-800 text-sm font-semibold mb-4">
              <Award className="w-4 h-4 mr-2" />
              {yearsExperience}+ lat doświadczenia (od {company.foundedYear})
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Realna firma, która bierze formalności na siebie
            </h2>

            <div className="space-y-4 text-navy-700 leading-relaxed">
              <p>
                Od {company.foundedYear} roku pomagamy najemcom skompletować dokumenty wymagane
                do najmu okazjonalnego. Przez ten czas obsłużyliśmy setki osób — studentów,
                osoby po przeprowadzce, wracających z zagranicy i obcokrajowców pracujących w Polsce.
              </p>
              <p>
                Nie jesteśmy anonimowym formularzem. Za usługą stoją konkretne osoby, które na co
                dzień zajmują się dokumentami najmu i współpracą z kancelariami notarialnymi.
                Wiesz, z kim rozmawiasz i na jakim etapie jest Twoja sprawa.
              </p>
            </div>

            {/* Jak pracujemy */}
            <div className="mt-8 space-y-3">
              {process.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <span className="text-navy-800 font-medium">{step.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Dane firmy */}
            <div className="mt-8 p-6 bg-navy-50 rounded-xl">
              <h3 className="font-semibold text-navy-900 mb-3">Dane firmy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-navy-700">
                <div>
                  <span className="font-medium">Firma:</span> {company.legalName}
                </div>
                <div>
                  <span className="font-medium">NIP:</span> {company.nip}
                </div>
                <div>
                  <span className="font-medium">REGON:</span> {company.regon}
                </div>
                {company.krs && (
                  <div>
                    <span className="font-medium">KRS:</span> {company.krs}
                  </div>
                )}
                <div className="sm:col-span-2">
                  <span className="font-medium">Adres:</span> {fullAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
