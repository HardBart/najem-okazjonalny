/**
 * Baza pytań FAQ — jedno źródło dla sekcji FAQ na stronie ORAZ danych
 * strukturalnych schema.org (FAQPage). Pytania oparte na realnych zapytaniach
 * Google (long-tail SEO). Pogrupowane kategoriami dla czytelności.
 */

export interface Faq {
  question: string;
  answer: string;
  category: string;
}

export const faqs: Faq[] = [
  // --- Podstawy ---
  {
    category: 'Podstawy',
    question: 'Czym jest adres do najmu okazjonalnego?',
    answer:
      'To adres lokalu, do którego najemca będzie mógł się wyprowadzić w razie zakończenia najmu. Właściciel tego lokalu składa pisemne oświadczenie o zgodzie na zamieszkanie, a jego podpis poświadcza notariusz. Taki dokument jest obowiązkowym załącznikiem do umowy najmu okazjonalnego.',
  },
  {
    category: 'Podstawy',
    question: 'Jakie dokumenty otrzymuję w ramach usługi?',
    answer:
      'Otrzymujesz oświadczenie właściciela lokalu o wyrażeniu zgody na zamieszkanie najemcy wraz z poświadczeniem notarialnym podpisu, wskazanie adresu zgodne z wymogami ustawy oraz instrukcję, jak dołączyć dokumenty do umowy najmu. To komplet gotowy do przekazania wynajmującemu.',
  },
  {
    category: 'Podstawy',
    question: 'Czy mogę zamówić dokumenty w całości online?',
    answer:
      'Tak. Cały proces prowadzimy zdalnie — zamówienie składasz przez formularz, dokumenty otrzymujesz pocztą lub kurierem. Nie musisz nigdzie jechać ani umawiać wizyt.',
  },
  {
    category: 'Podstawy',
    question: 'Jak wygląda proces krok po kroku?',
    answer:
      'Po pierwsze wypełniasz formularz zamówienia i opłacasz wybrany pakiet. Po drugie kontaktujemy się, aby potwierdzić dane. Po trzecie przygotowujemy oświadczenie i organizujemy poświadczenie notarialne. Po czwarte wysyłamy Ci komplet gotowych dokumentów. Następnie dołączasz je do umowy najmu okazjonalnego.',
  },

  // --- Adres / inne miasto ---
  {
    category: 'Adres i lokalizacja',
    question: 'Czy adres może być w innym mieście niż mieszkam?',
    answer:
      'Tak. Przepisy nie wymagają, aby lokal wskazany w oświadczeniu znajdował się w tym samym mieście co wynajmowane mieszkanie ani co Twoje aktualne miejsce pobytu. Adres może być w dowolnej części Polski — najczęściej wskazujemy duże miasta jak Warszawa, Kraków czy Wrocław.',
  },
  {
    category: 'Adres i lokalizacja',
    question: 'Wynajmuję mieszkanie w innym mieście niż wskazany adres — czy to problem?',
    answer:
      'Nie. Adres z oświadczenia i adres wynajmowanego mieszkania mogą być w dwóch różnych miastach. To częsta i w pełni dopuszczalna sytuacja, szczególnie u osób, które niedawno zmieniły miejsce zamieszkania.',
  },
  {
    category: 'Adres i lokalizacja',
    question: 'Czy obsługujecie klientów z całej Polski?',
    answer:
      'Tak, obsługujemy klientów z całego kraju. Proces jest zdalny, a dokumenty wysyłamy w dowolne miejsce w Polsce. Współpracujemy z notariuszami w wielu miastach, dzięki czemu realizacja przebiega sprawnie niezależnie od Twojej lokalizacji.',
  },
  {
    category: 'Adres i lokalizacja',
    question: 'Czy mogę później zmienić wskazany adres?',
    answer:
      'Zmiana adresu wskazanego w oświadczeniu wymaga sporządzenia nowego oświadczenia właściciela lokalu i ponownego poświadczenia notarialnego. Pomagamy w przygotowaniu zaktualizowanych dokumentów, jeśli Twoja sytuacja się zmieni.',
  },

  // --- Rodzina / znajomi ---
  {
    category: 'Bez rodziny i znajomych',
    question: 'Czy muszę mieć rodzinę, która udostępni adres?',
    answer:
      'Nie. Ustawa nie wymaga pokrewieństwa między najemcą a właścicielem lokalu wskazanego w oświadczeniu. Dzięki temu nie musisz prosić rodziny ani znajomych — adres i oświadczenie zapewniamy my.',
  },
  {
    category: 'Bez rodziny i znajomych',
    question: 'Nie znam nikogo, kto zgodziłby się na taki adres. Co mogę zrobić?',
    answer:
      'To najczęstszy powód, dla którego klienci się do nas zgłaszają. Zapewniamy właściciela lokalu, który złoży wymagane oświadczenie z poświadczeniem notarialnym. Nie musisz nikogo angażować ani się tłumaczyć.',
  },
  {
    category: 'Bez rodziny i znajomych',
    question: 'Czy muszę znać właściciela lokalu osobiście?',
    answer:
      'Nie. Cały kontakt z właścicielem lokalu organizujemy my, dyskretnie i profesjonalnie. Właściciel podpisuje oświadczenie, które jest następnie poświadczane przez notariusza i przekazywane Tobie.',
  },

  // --- Obcokrajowcy / studenci ---
  {
    category: 'Obcokrajowcy i studenci',
    question: 'Czy obcokrajowiec może skorzystać z usługi?',
    answer:
      'Tak. Najem okazjonalny jest dostępny również dla obcokrajowców mieszkających i pracujących w Polsce. Przygotowujemy dokumenty po polsku, zgodne z wymogami ustawy, i tłumaczymy proces prostym językiem. To częsty wybór osób bez rodziny w Polsce.',
  },
  {
    category: 'Obcokrajowcy i studenci',
    question: 'Jestem studentem wynajmującym pierwsze mieszkanie. Czy to dla mnie?',
    answer:
      'Tak. Wielu studentów spotyka się z wymogiem najmu okazjonalnego przy pierwszym wynajmie. Pomagamy bez zbędnych formalności — wyjaśniamy każdy krok i dostarczamy komplet dokumentów, byś mógł spokojnie podpisać umowę.',
  },
  {
    category: 'Obcokrajowcy i studenci',
    question: 'Czy potrzebuję numeru PESEL, aby zamówić dokumenty?',
    answer:
      'Do przygotowania oświadczenia właściciela lokalu nie jest wymagany Twój PESEL. Zakres potrzebnych danych zależy od konkretnej sytuacji i jest wskazywany podczas składania zamówienia.',
  },

  // --- Notariusz ---
  {
    category: 'Notariusz',
    question: 'Czy notariusz zaakceptuje przygotowane dokumenty?',
    answer:
      'Tak. Oświadczenia przygotowujemy zgodnie z wymogami notariuszy, a podpis właściciela lokalu jest poświadczany notarialnie przed przekazaniem Tobie. Współpracujemy z kancelariami od lat i dokumenty są przyjmowane bez problemu.',
  },
  {
    category: 'Notariusz',
    question: 'Czy podpis elektroniczny właściciela wystarczy zamiast notariusza?',
    answer:
      'Nie. Ustawa wymaga, aby podpis właściciela lokalu pod oświadczeniem był poświadczony notarialnie. Zajmujemy się całą obsługą notarialną — Ty otrzymujesz gotowy, poświadczony dokument.',
  },
  {
    category: 'Notariusz',
    question: 'Czy muszę osobiście stawić się u notariusza?',
    answer:
      'W większości przypadków nie. Poświadczenie dotyczy podpisu właściciela lokalu, którego zapewniamy. Jeśli Twoja sytuacja wymaga Twojej obecności, uprzedzimy o tym i pomożemy zorganizować wizytę w dogodnym terminie.',
  },
  {
    category: 'Notariusz',
    question: 'Ile kosztuje poświadczenie notarialne i czy jest wliczone w cenę?',
    answer:
      'Koszt poświadczenia notarialnego jest uwzględniony w cenie pakietów obejmujących obsługę notarialną. Przy zamówieniu jasno informujemy, co dokładnie zawiera dany pakiet, abyś nie miał ukrytych opłat.',
  },

  // --- Czas i koszt ---
  {
    category: 'Czas i koszt',
    question: 'Ile czasu trwa realizacja?',
    answer:
      'Zależnie od wybranego pakietu: standardowo 24–48 godzin, a w opcji ekspresowej nawet tego samego lub następnego dnia. Czas liczymy od potwierdzenia płatności i przekazania niezbędnych danych.',
  },
  {
    category: 'Czas i koszt',
    question: 'Potrzebuję dokumentów na już — czy zdążycie?',
    answer:
      'Najczęściej tak. Jeśli podpisanie umowy masz za kilka dni, wybierz opcję ekspresową — przygotujemy komplet dokumentów priorytetowo. Termin realizacji potwierdzamy po złożeniu zamówienia.',
  },
  {
    category: 'Czas i koszt',
    question: 'Ile kosztuje usługa?',
    answer:
      'Cena zależy od zakresu i tempa realizacji. Oferujemy kilka pakietów — od podstawowego po pełną obsługę z priorytetem. Dokładne ceny znajdziesz w sekcji pakietów, a kreator „Sprawdź w 30 sekund" pomoże dopasować pakiet do Twojej sytuacji.',
  },
  {
    category: 'Czas i koszt',
    question: 'Czy są jakieś ukryte opłaty?',
    answer:
      'Nie. Cena pakietu jest jasno określona przed zamówieniem i obejmuje wskazany w nim zakres, łącznie z obsługą notarialną tam, gdzie jest przewidziana. Nie doliczamy niespodziewanych kosztów.',
  },
  {
    category: 'Czas i koszt',
    question: 'Jak mogę zapłacić za usługę?',
    answer:
      'Płatność odbywa się online, szybko i bezpiecznie, za pośrednictwem operatora płatności. Po zaksięgowaniu wpłaty natychmiast rozpoczynamy realizację Twojego zamówienia.',
  },

  // --- Prawo, ryzyka, sytuacje szczególne ---
  {
    category: 'Sytuacje szczególne',
    question: 'Co się dzieje w przypadku eksmisji z wynajmowanego mieszkania?',
    answer:
      'Najem okazjonalny upraszcza wynajmującemu procedurę odzyskania lokalu w razie zaległości. Wskazany adres służy wyłącznie do dopełnienia wymogu ustawy i nie wpływa na Twoje codzienne życie. Kluczowe jest terminowe regulowanie czynszu.',
  },
  {
    category: 'Sytuacje szczególne',
    question: 'Czy będę musiał faktycznie wyprowadzić się pod wskazany adres?',
    answer:
      'Adres z oświadczenia ma znaczenie wyłącznie na wypadek zakończenia najmu i konieczności wskazania lokalu zastępczego. W praktyce, przy prawidłowo realizowanej umowie, sytuacja ta nie występuje. Adres nie zmienia Twojego miejsca zamieszkania ani meldunku.',
  },
  {
    category: 'Sytuacje szczególne',
    question: 'Co jeśli lokal wskazany w oświadczeniu ma współwłaścicieli?',
    answer:
      'Jeśli lokal ma kilku współwłaścicieli, oświadczenie powinno uwzględniać zgodę uprawnionych osób. My dbamy o to, aby dokument był kompletny i poprawny — to element naszej usługi, więc nie musisz się tym martwić.',
  },
  {
    category: 'Sytuacje szczególne',
    question: 'Co się stanie, jeśli właściciel wskazanego lokalu umrze?',
    answer:
      'Zgoda właściciela lokalu wygasa wraz z jego śmiercią, a najemca powinien wskazać nowy adres i dostarczyć nowe oświadczenie. W takiej sytuacji pomagamy przygotować zaktualizowane dokumenty, aby Twoja umowa pozostała zgodna z wymogami.',
  },
  {
    category: 'Sytuacje szczególne',
    question: 'Co jeśli lokal wskazany w oświadczeniu zostanie sprzedany?',
    answer:
      'Sprzedaż lokalu może wymagać zaktualizowania oświadczenia, ponieważ zmienia się jego właściciel. Jeżeli dojdzie do takiej sytuacji, przygotujemy nowy komplet dokumentów, byś nie musiał szukać rozwiązania na własną rękę.',
  },
  {
    category: 'Sytuacje szczególne',
    question: 'Czy właściciel lokalu może wycofać zgodę na adres?',
    answer:
      'Co do zasady oświadczenie złożone na potrzeby konkretnej umowy najmu pozostaje ważne. Gdyby jednak doszło do wypowiedzenia zgody, pomożemy szybko zapewnić nowe oświadczenie i poświadczenie, aby Twoja umowa była dalej zabezpieczona.',
  },
  {
    category: 'Sytuacje szczególne',
    question: 'Czy wynajmujący może odmówić zawarcia umowy najmu okazjonalnego?',
    answer:
      'Jeśli przedstawisz komplet wymaganych dokumentów — w tym oświadczenie właściciela lokalu z poświadczeniem notarialnym — wynajmujący nie ma podstaw, by odmówić zawarcia umowy najmu okazjonalnego z tego powodu. Dostarczamy dokładnie te dokumenty.',
  },

  // --- Bezpieczeństwo / zaufanie ---
  {
    category: 'Bezpieczeństwo i zaufanie',
    question: 'Czy moje dane są bezpieczne?',
    answer:
      'Tak. Dane przetwarzamy zgodnie z RODO wyłącznie w celu realizacji zamówienia. Nie udostępniamy ich podmiotom trzecim poza zakresem niezbędnym do przygotowania dokumentów (np. notariuszowi). Szczegóły opisuje nasza polityka prywatności.',
  },
  {
    category: 'Bezpieczeństwo i zaufanie',
    question: 'Gdzie znajdę odpowiedzi na pytania przed zamówieniem?',
    answer:
      'Najważniejsze informacje znajdziesz w tym FAQ, w opisach pakietów oraz w artykułach na blogu. Kreator „Sprawdź w 30 sekund" na górze strony pomoże dopasować pakiet do Twojej sytuacji.',
  },
  {
    category: 'Bezpieczeństwo i zaufanie',
    question: 'Czy otrzymam fakturę za usługę?',
    answer:
      'Tak. Na życzenie wystawiamy fakturę. Wystarczy podać dane do faktury przy składaniu zamówienia lub poinformować nas o tym w trakcie kontaktu.',
  },
];

/** Spłaszczona lista pytanie/odpowiedź dla danych strukturalnych FAQPage. */
export const faqForSchema = faqs.map(({ question, answer }) => ({ question, answer }));
