/**
 * Plan treści bloga (content roadmap) + rejestr opublikowanych artykułów.
 *
 * published true  → istnieje strona /blog/<slug>, karta jest klikalna.
 * published false → temat zaplanowany; karta oznaczona „Wkrótce", nie linkuje
 *                   (dzięki temu nie generujemy błędów 404 w Google).
 *
 * Aby opublikować artykuł: dodaj treść w lib/articleContent.ts i ustaw published na true.
 */

export const BLOG_CATEGORIES = [
  'Najem okazjonalny',
  'Dokumenty',
  'Porady dla najemców',
  'Porady dla właścicieli',
  'Notariusz',
  'Prawo najmu',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  published: boolean;
}

export const articles: Article[] = [
  // === OPUBLIKOWANE ===
  {
    slug: 'czy-adres-do-najmu-okazjonalnego-jest-legalny',
    title: 'Czy adres do najmu okazjonalnego jest legalny?',
    excerpt:
      'Wyjaśniamy podstawy prawne udostępniania adresu do umowy najmu okazjonalnego i rozwiewamy najczęstsze wątpliwości.',
    category: 'Prawo najmu',
    readTime: '8 min',
    date: '2026-06-02',
    published: true,
  },

  // === PLANOWANE: Najem okazjonalny (podstawy) ===
  { slug: 'co-to-jest-najem-okazjonalny', title: 'Co to jest najem okazjonalny i czym różni się od zwykłego najmu?', excerpt: 'Definicja, zalety i obowiązki stron przy najmie okazjonalnym w prostych słowach.', category: 'Najem okazjonalny', readTime: '7 min', date: '2026-05-16', published: true },
  { slug: 'najem-okazjonalny-krok-po-kroku', title: 'Najem okazjonalny krok po kroku — kompletny przewodnik', excerpt: 'Cały proces zawarcia umowy najmu okazjonalnego od A do Z.', category: 'Najem okazjonalny', readTime: '10 min', date: '2026-04-29', published: true },
  { slug: 'najem-okazjonalny-bez-rodziny', title: 'Najem okazjonalny bez rodziny — czy to możliwe?', excerpt: 'Czy można wskazać adres bez angażowania bliskich? Co mówią przepisy.', category: 'Najem okazjonalny', readTime: '6 min', date: '2026-04-13', published: true },
  { slug: 'najem-okazjonalny-dla-studenta', title: 'Najem okazjonalny dla studenta — co musisz wiedzieć', excerpt: 'Pierwszy wynajem i wymóg najmu okazjonalnego. Praktyczny poradnik dla studentów.', category: 'Najem okazjonalny', readTime: '6 min', date: '2026-03-27', published: true },
  { slug: 'najem-okazjonalny-dla-obcokrajowca', title: 'Najem okazjonalny dla obcokrajowca w Polsce', excerpt: 'Jak obcokrajowiec bez rodziny w Polsce może spełnić wymogi najmu okazjonalnego.', category: 'Najem okazjonalny', readTime: '7 min', date: '2026-03-10', published: true },
  { slug: 'najem-okazjonalny-w-innym-miescie', title: 'Najem okazjonalny w innym mieście — gdzie może być adres?', excerpt: 'Czy adres z oświadczenia musi być w tym samym mieście co wynajmowane mieszkanie?', category: 'Najem okazjonalny', readTime: '5 min', date: '2026-02-21', published: true },
  { slug: 'najem-okazjonalny-a-meldunek', title: 'Najem okazjonalny a meldunek — najważniejsze różnice', excerpt: 'Czy wskazany adres wpływa na zameldowanie? Wyjaśniamy nieporozumienia.', category: 'Najem okazjonalny', readTime: '6 min', date: '2026-02-04', published: true },
  { slug: 'najem-okazjonalny-a-zwykly-najem', title: 'Najem okazjonalny a najem zwykły — porównanie', excerpt: 'Tabela różnic i wskazówki, którą formę wybrać w danej sytuacji.', category: 'Najem okazjonalny', readTime: '7 min', date: '2026-01-19', published: true },
  { slug: 'wady-i-zalety-najmu-okazjonalnego', title: 'Wady i zalety najmu okazjonalnego dla najemcy', excerpt: 'Obiektywne spojrzenie na plusy i minusy tej formy najmu.', category: 'Najem okazjonalny', readTime: '6 min', date: '2026-01-02', published: true },
  { slug: 'ile-kosztuje-najem-okazjonalny', title: 'Ile kosztuje najem okazjonalny? Pełne zestawienie opłat', excerpt: 'Koszty notariusza, dokumentów i usługi — na co się przygotować.', category: 'Najem okazjonalny', readTime: '6 min', date: '2025-12-16', published: true },

  // === PLANOWANE: Dokumenty ===
  { slug: 'oswiadczenie-wlasciciela-lokalu-wzor', title: 'Oświadczenie właściciela lokalu — co musi zawierać', excerpt: 'Elementy obowiązkowe oświadczenia i najczęstsze błędy.', category: 'Dokumenty', readTime: '7 min', date: '2025-11-29', published: true },
  { slug: 'dokumenty-do-najmu-okazjonalnego', title: 'Dokumenty do najmu okazjonalnego — kompletna lista', excerpt: 'Komplet załączników wymaganych do ważnej umowy najmu okazjonalnego.', category: 'Dokumenty', readTime: '6 min', date: '2025-11-12', published: true },
  { slug: 'oswiadczenie-najemcy-o-poddaniu-sie-egzekucji', title: 'Oświadczenie najemcy o poddaniu się egzekucji — co to znaczy', excerpt: 'Najważniejszy dokument najmu okazjonalnego wytłumaczony prosto.', category: 'Dokumenty', readTime: '7 min', date: '2025-10-27', published: true },
  { slug: 'zgloszenie-najmu-okazjonalnego-do-urzedu-skarbowego', title: 'Zgłoszenie najmu okazjonalnego do urzędu skarbowego', excerpt: 'Termin 14 dni, formularz i konsekwencje braku zgłoszenia.', category: 'Dokumenty', readTime: '6 min', date: '2025-10-10', published: true },
  { slug: 'umowa-najmu-okazjonalnego-wzor', title: 'Umowa najmu okazjonalnego — wzór i omówienie', excerpt: 'Na co zwrócić uwagę przy podpisywaniu umowy najmu okazjonalnego.', category: 'Dokumenty', readTime: '9 min', date: '2025-09-23', published: true },
  { slug: 'protokol-zdawczo-odbiorczy-mieszkania', title: 'Protokół zdawczo-odbiorczy mieszkania — jak go wypełnić', excerpt: 'Zabezpiecz się przy przekazaniu lokalu. Gotowa checklista.', category: 'Dokumenty', readTime: '6 min', date: '2025-09-06', published: true },
  { slug: 'jak-wskazac-adres-w-oswiadczeniu', title: 'Jak prawidłowo wskazać adres w oświadczeniu', excerpt: 'Praktyczne zasady wskazania lokalu zastępczego.', category: 'Dokumenty', readTime: '5 min', date: '2025-08-20', published: true },
  { slug: 'kaucja-przy-najmie-okazjonalnym', title: 'Kaucja przy najmie okazjonalnym — ile i kiedy', excerpt: 'Maksymalna wysokość kaucji i zasady jej zwrotu.', category: 'Dokumenty', readTime: '5 min', date: '2025-08-04', published: true },

  // === PLANOWANE: Porady dla najemców ===
  { slug: 'jak-znalezc-adres-do-najmu-okazjonalnego', title: 'Jak znaleźć adres do najmu okazjonalnego bez rodziny', excerpt: 'Realne rozwiązania, gdy nie masz kogo poprosić o oświadczenie.', category: 'Porady dla najemców', readTime: '6 min', date: '2025-07-18', published: true },
  { slug: 'co-zrobic-gdy-wlasciciel-wymaga-najmu-okazjonalnego', title: 'Właściciel wymaga najmu okazjonalnego — co robić', excerpt: 'Krok po kroku, jak spełnić wymóg i nie stracić mieszkania.', category: 'Porady dla najemców', readTime: '6 min', date: '2025-07-01', published: true },
  { slug: 'najem-okazjonalny-po-powrocie-z-zagranicy', title: 'Najem okazjonalny po powrocie z zagranicy', excerpt: 'Jak załatwić dokumenty, gdy nie masz zaplecza w kraju.', category: 'Porady dla najemców', readTime: '6 min', date: '2025-06-14', published: true },
  { slug: 'prawa-najemcy-w-najmie-okazjonalnym', title: 'Prawa najemcy w najmie okazjonalnym', excerpt: 'Co Ci przysługuje i czego właściciel nie może wymagać.', category: 'Porady dla najemców', readTime: '7 min', date: '2025-05-28', published: true },
  { slug: 'na-co-uwazac-podpisujac-umowe-najmu', title: 'Na co uważać, podpisując umowę najmu', excerpt: 'Lista pułapek w umowach najmu okazjonalnego.', category: 'Porady dla najemców', readTime: '7 min', date: '2025-05-12', published: true },
  { slug: 'jak-szybko-zalatwic-dokumenty-do-umowy', title: 'Jak szybko załatwić dokumenty do umowy najmu', excerpt: 'Podpisanie za kilka dni? Sprawdź, jak zdążyć na czas.', category: 'Porady dla najemców', readTime: '5 min', date: '2025-04-25', published: true },
  { slug: 'najem-okazjonalny-a-zwierzeta', title: 'Najem okazjonalny a zwierzęta w mieszkaniu', excerpt: 'Czy umowa może zakazać trzymania zwierząt? Jak negocjować.', category: 'Porady dla najemców', readTime: '5 min', date: '2025-04-08', published: true },
  { slug: 'wypowiedzenie-umowy-najmu-przez-najemce', title: 'Wypowiedzenie umowy najmu przez najemcę', excerpt: 'Terminy i forma wypowiedzenia umowy najmu okazjonalnego.', category: 'Porady dla najemców', readTime: '6 min', date: '2025-03-22', published: true },

  // === PLANOWANE: Porady dla właścicieli ===
  { slug: 'najem-okazjonalny-dla-wlasciciela-mieszkania', title: 'Najem okazjonalny z punktu widzenia właściciela', excerpt: 'Dlaczego warto wybrać tę formę najmu jako wynajmujący.', category: 'Porady dla właścicieli', readTime: '7 min', date: '2025-03-06', published: true },
  { slug: 'jak-zabezpieczyc-sie-przed-nieuczciwym-najemca', title: 'Jak zabezpieczyć się przed nieuczciwym najemcą', excerpt: 'Najem okazjonalny jako narzędzie ochrony właściciela.', category: 'Porady dla właścicieli', readTime: '7 min', date: '2025-02-17', published: true },
  { slug: 'eksmisja-przy-najmie-okazjonalnym', title: 'Eksmisja przy najmie okazjonalnym — jak przebiega', excerpt: 'Procedura odzyskania lokalu krok po kroku.', category: 'Porady dla właścicieli', readTime: '8 min', date: '2025-01-31', published: true },
  { slug: 'rozliczenie-podatku-od-najmu', title: 'Rozliczenie podatku od najmu okazjonalnego', excerpt: 'Ryczałt, terminy i obowiązki właściciela wobec fiskusa.', category: 'Porady dla właścicieli', readTime: '7 min', date: '2025-01-14', published: true },
  { slug: 'obowiazki-wynajmujacego', title: 'Obowiązki wynajmującego w najmie okazjonalnym', excerpt: 'Czego prawo wymaga od właściciela mieszkania.', category: 'Porady dla właścicieli', readTime: '6 min', date: '2024-12-28', published: true },
  { slug: 'jak-napisac-ogloszenie-o-wynajmie', title: 'Jak napisać skuteczne ogłoszenie o wynajmie', excerpt: 'Wskazówki, które przyciągną solidnych najemców.', category: 'Porady dla właścicieli', readTime: '6 min', date: '2024-12-12', published: true },

  // === PLANOWANE: Notariusz ===
  { slug: 'rola-notariusza-w-najmie-okazjonalnym', title: 'Rola notariusza w najmie okazjonalnym', excerpt: 'Co dokładnie poświadcza notariusz i dlaczego to konieczne.', category: 'Notariusz', readTime: '6 min', date: '2024-11-25', published: true },
  { slug: 'ile-kosztuje-notariusz-przy-najmie-okazjonalnym', title: 'Ile kosztuje notariusz przy najmie okazjonalnym', excerpt: 'Taksa notarialna i co wpływa na końcową cenę.', category: 'Notariusz', readTime: '5 min', date: '2024-11-08', published: true },
  { slug: 'poswiadczenie-podpisu-a-akt-notarialny', title: 'Poświadczenie podpisu a akt notarialny — różnica', excerpt: 'Która forma jest potrzebna przy najmie okazjonalnym.', category: 'Notariusz', readTime: '5 min', date: '2024-10-22', published: true },
  { slug: 'jak-wyglada-wizyta-u-notariusza', title: 'Jak wygląda wizyta u notariusza krok po kroku', excerpt: 'Czego się spodziewać i jak się przygotować.', category: 'Notariusz', readTime: '5 min', date: '2024-10-05', published: true },
  { slug: 'czy-mozna-zalatwic-notariusza-zdalnie', title: 'Czy można załatwić poświadczenie notarialne zdalnie', excerpt: 'Możliwości obsługi notarialnej bez osobistej wizyty.', category: 'Notariusz', readTime: '5 min', date: '2024-09-19', published: true },

  // === PLANOWANE: Prawo najmu ===
  { slug: 'ustawa-o-ochronie-praw-lokatorow', title: 'Ustawa o ochronie praw lokatorów — co warto wiedzieć', excerpt: 'Najważniejsze przepisy regulujące najem okazjonalny.', category: 'Prawo najmu', readTime: '8 min', date: '2024-09-02', published: true },
  { slug: 'najem-okazjonalny-a-wspolwlasnosc-lokalu', title: 'Najem okazjonalny a współwłasność wskazanego lokalu', excerpt: 'Czyja zgoda jest potrzebna, gdy lokal ma kilku właścicieli.', category: 'Prawo najmu', readTime: '6 min', date: '2024-08-16', published: true },
  { slug: 'co-sie-dzieje-gdy-wlasciciel-lokalu-umrze', title: 'Co się dzieje, gdy właściciel wskazanego lokalu umrze', excerpt: 'Skutki prawne i jak zaktualizować dokumenty.', category: 'Prawo najmu', readTime: '6 min', date: '2024-07-30', published: true },
  { slug: 'sprzedaz-lokalu-wskazanego-w-oswiadczeniu', title: 'Sprzedaż lokalu wskazanego w oświadczeniu — co dalej', excerpt: 'Czy umowa najmu zachowuje ważność i co trzeba zmienić.', category: 'Prawo najmu', readTime: '6 min', date: '2024-07-13', published: true },
  { slug: 'wypowiedzenie-zgody-na-adres', title: 'Wypowiedzenie zgody właściciela na adres', excerpt: 'Kiedy zgoda wygasa i jak zabezpieczyć ciągłość umowy.', category: 'Prawo najmu', readTime: '6 min', date: '2024-06-27', published: true },
  { slug: 'zmiana-adresu-w-trakcie-najmu', title: 'Zmiana adresu wskazanego w trakcie najmu', excerpt: 'Procedura aktualizacji oświadczenia bez ryzyka dla umowy.', category: 'Prawo najmu', readTime: '5 min', date: '2024-06-10', published: true },
  { slug: 'najem-okazjonalny-a-najem-instytucjonalny', title: 'Najem okazjonalny a najem instytucjonalny', excerpt: 'Dwie formy najmu z zabezpieczeniem — kluczowe różnice.', category: 'Prawo najmu', readTime: '7 min', date: '2024-05-24', published: true },
  { slug: 'orzecznictwo-dotyczace-najmu-okazjonalnego', title: 'Najem okazjonalny w orzecznictwie sądów', excerpt: 'Co wynika z praktyki sądowej dla najemców i właścicieli.', category: 'Prawo najmu', readTime: '8 min', date: '2024-05-07', published: true },
  { slug: 'najczestsze-bledy-przy-najmie-okazjonalnym', title: 'Najczęstsze błędy przy najmie okazjonalnym', excerpt: '7 pomyłek, które unieważniają zabezpieczenie umowy.', category: 'Prawo najmu', readTime: '8 min', date: '2024-04-20', published: true },
  { slug: 'czas-trwania-umowy-najmu-okazjonalnego', title: 'Czas trwania umowy najmu okazjonalnego', excerpt: 'Maksymalny okres i zasady przedłużania umowy.', category: 'Prawo najmu', readTime: '5 min', date: '2024-04-04', published: true },
  { slug: 'najem-okazjonalny-a-dzialalnosc-gospodarcza', title: 'Najem okazjonalny a prowadzenie działalności w lokalu', excerpt: 'Czy można zarejestrować firmę pod wynajmowanym adresem.', category: 'Prawo najmu', readTime: '6 min', date: '2024-03-18', published: true },
  { slug: 'podwyzka-czynszu-w-najmie-okazjonalnym', title: 'Podwyżka czynszu w najmie okazjonalnym — zasady', excerpt: 'Kiedy i o ile właściciel może podnieść czynsz.', category: 'Prawo najmu', readTime: '5 min', date: '2024-03-01', published: true },
];

export const publishedArticles = articles.filter((a) => a.published);
