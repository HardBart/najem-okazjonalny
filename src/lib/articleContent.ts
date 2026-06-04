/**
 * Treść artykułów blogowych renderowanych przez dynamiczną trasę /blog/[slug].
 *
 * Aby OPUBLIKOWAĆ nowy artykuł:
 *   1. dodaj wpis treści tutaj (klucz = slug z lib/articles.ts),
 *   2. ustaw `published: true` przy tym slugu w lib/articles.ts.
 * Slug, który ma własny ręcznie kodowany katalog (np. „czy-adres-..."), NIE wymaga
 * wpisu tutaj — tamta strona ma pierwszeństwo.
 */

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ArticleContent {
  /** Akapit wprowadzający (lead). */
  intro: string;
  sections: ArticleSection[];
  /** Opcjonalne FAQ — trafia też do danych strukturalnych FAQPage. */
  faq?: { q: string; a: string }[];
}

export const articleContent: Record<string, ArticleContent> = {
  'co-to-jest-najem-okazjonalny': {
    intro:
      'Najem okazjonalny to szczególna forma najmu mieszkania, która daje właścicielowi większe bezpieczeństwo niż zwykła umowa. W zamian wymaga kilku dodatkowych dokumentów — w tym wskazania adresu, pod który najemca może się wyprowadzić. Wyjaśniamy, na czym to polega i co jest potrzebne.',
    sections: [
      {
        heading: 'Czym jest najem okazjonalny?',
        paragraphs: [
          'Najem okazjonalny to umowa najmu lokalu mieszkalnego zawierana przez właściciela będącego osobą fizyczną, który nie prowadzi działalności gospodarczej w zakresie wynajmu. Reguluje ją ustawa z dnia 21 czerwca 2001 r. o ochronie praw lokatorów.',
          'Główna różnica wobec zwykłego najmu polega na dodatkowym zabezpieczeniu: najemca z góry godzi się opuścić mieszkanie po zakończeniu umowy i wskazuje inny lokal, do którego może się przenieść. Dzięki temu odzyskanie mieszkania przez właściciela jest prostsze i szybsze.',
        ],
      },
      {
        heading: 'Jakie dokumenty są wymagane?',
        bullets: [
          'umowa najmu okazjonalnego zawarta na piśmie,',
          'oświadczenie najemcy o poddaniu się egzekucji co do opróżnienia lokalu (w formie aktu notarialnego),',
          'wskazanie lokalu, do którego najemca wyprowadzi się po zakończeniu najmu,',
          'oświadczenie właściciela tego lokalu o wyrażeniu zgody na zamieszkanie najemcy — z podpisem poświadczonym notarialnie.',
        ],
      },
      {
        heading: 'Najczęstszy problem najemcy: brak adresu',
        paragraphs: [
          'W praktyce najtrudniejszym elementem dla najemcy jest ostatni punkt — wskazanie lokalu i zdobycie oświadczenia jego właściciela. Nie każdy ma w okolicy rodzinę czy znajomych, którzy się na to zgodzą.',
          'Tu właśnie pomagamy: zapewniamy właściciela lokalu, który składa wymagane oświadczenie, a jego podpis poświadcza notariusz. Otrzymujesz gotowy komplet dokumentów — bez angażowania bliskich.',
        ],
      },
      {
        heading: 'Zgłoszenie do urzędu skarbowego',
        paragraphs: [
          'Właściciel wynajmowanego mieszkania ma obowiązek zgłosić zawarcie umowy najmu okazjonalnego naczelnikowi urzędu skarbowego w terminie 14 dni od rozpoczęcia najmu. Brak zgłoszenia powoduje, że umowa traci szczególne zabezpieczenia najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najem okazjonalny jest bezpieczny dla najemcy?',
        a: 'Tak. Najem okazjonalny jest w pełni zgodny z prawem i powszechnie stosowany. Wskazany adres służy wyłącznie dopełnieniu wymogu ustawy i nie wpływa na Twoje codzienne życie ani miejsce zamieszkania.',
      },
      {
        q: 'Czy muszę mieć rodzinę, żeby wskazać adres?',
        a: 'Nie. Ustawa nie wymaga pokrewieństwa z właścicielem wskazanego lokalu. Adres i oświadczenie możemy zapewnić za Ciebie.',
      },
    ],
  },

  'najem-okazjonalny-bez-rodziny': {
    intro:
      'Najczęstsze pytanie, jakie słyszymy: „czy mogę zawrzeć najem okazjonalny, skoro nie mam rodziny, która udostępni mi adres?". Odpowiedź brzmi: tak. Przepisy nie wymagają pokrewieństwa — wyjaśniamy, jak to działa.',
    sections: [
      {
        heading: 'Co naprawdę mówi ustawa',
        paragraphs: [
          'Do zawarcia najmu okazjonalnego potrzebne jest oświadczenie właściciela lokalu, do którego najemca może się wyprowadzić po zakończeniu umowy. Ustawa o ochronie praw lokatorów w żadnym miejscu nie wymaga, aby właściciel tego lokalu był członkiem rodziny najemcy.',
          'Oznacza to, że adres może udostępnić dowolna osoba, która jest właścicielem lokalu i wyrazi na to zgodę — niezależnie od pokrewieństwa.',
        ],
      },
      {
        heading: 'Dlaczego to częsty problem',
        bullets: [
          'osoby, które przeprowadziły się do nowego miasta i nie mają tam nikogo,',
          'obcokrajowcy pracujący w Polsce bez rodziny w kraju,',
          'studenci wynajmujący pierwsze mieszkanie,',
          'osoby wracające z zagranicy po latach.',
        ],
      },
      {
        heading: 'Jak rozwiązujemy to za Ciebie',
        paragraphs: [
          'Zapewniamy właściciela lokalu, który składa wymagane oświadczenie o zgodzie na zamieszkanie. Podpis właściciela poświadcza notariusz, dzięki czemu dokument jest gotowy do dołączenia do umowy najmu okazjonalnego.',
          'Cały proces prowadzimy zdalnie i zwykle realizujemy w 24–48 godzin. Nie musisz nikogo prosić ani tłumaczyć się ze swojej sytuacji.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy to legalne, że adres nie należy do mojej rodziny?',
        a: 'Tak. Ustawa nie wymaga pokrewieństwa między najemcą a właścicielem wskazanego lokalu. Dokumenty są w pełni zgodne z przepisami i poświadczone notarialnie.',
      },
      {
        q: 'Czy muszę poznać właściciela lokalu osobiście?',
        a: 'Nie. Cały kontakt organizujemy my. Otrzymujesz gotowe, poświadczone oświadczenie.',
      },
    ],
  },

  'najem-okazjonalny-dla-obcokrajowca': {
    intro:
      'Mieszkasz i pracujesz w Polsce, ale nie masz tu rodziny ani znajomych, którzy udostępniliby adres do umowy? Najem okazjonalny jest dostępny również dla obcokrajowców. Wyjaśniamy, jak przejść przez formalności krok po kroku.',
    sections: [
      {
        heading: 'Czy obcokrajowiec może zawrzeć najem okazjonalny?',
        paragraphs: [
          'Tak. Przepisy o najmie okazjonalnym nie różnicują najemców ze względu na obywatelstwo. Liczy się komplet wymaganych dokumentów, a nie narodowość najemcy.',
          'Wielu właścicieli mieszkań wręcz preferuje najem okazjonalny przy wynajmie obcokrajowcom, bo daje im większe poczucie bezpieczeństwa. Posiadanie gotowych dokumentów zwiększa więc Twoje szanse na wynajem.',
        ],
      },
      {
        heading: 'Najczęstsze trudności',
        bullets: [
          'brak rodziny w Polsce, która udostępniłaby adres,',
          'bariera językowa przy dokumentach prawnych,',
          'niepewność, jakie dokumenty są naprawdę wymagane.',
        ],
      },
      {
        heading: 'Jak pomagamy',
        paragraphs: [
          'Zapewniamy adres i oświadczenie właściciela lokalu z poświadczeniem notarialnym, przygotowujemy dokumenty zgodnie z wymogami ustawy i prowadzimy Cię przez proces prostym językiem.',
          'Nie musisz nikogo znać w Polsce ani mieć tu rodziny. Komplet dokumentów dostarczamy zdalnie, zwykle w 24–48 godzin.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy potrzebuję numeru PESEL, aby zamówić dokumenty?',
        a: 'Do przygotowania oświadczenia właściciela lokalu PESEL najemcy nie jest wymagany. Zakres potrzebnych danych zależy od konkretnej sytuacji i jest wskazywany podczas składania zamówienia.',
      },
      {
        q: 'Czy dokumenty są po polsku?',
        a: 'Tak, dokumenty przygotowujemy po polsku, zgodnie z wymogami ustawy. Cały proces tłumaczymy zrozumiałym językiem.',
      },
    ],
  },

  'oswiadczenie-wlasciciela-lokalu-wzor': {
    intro:
      'Oświadczenie właściciela lokalu o wyrażeniu zgody na zamieszkanie najemcy to jeden z kluczowych dokumentów najmu okazjonalnego. Wyjaśniamy, co musi zawierać, dlaczego wymaga notariusza i jak je zdobyć, jeśli nie masz własnego adresu.',
    sections: [
      {
        heading: 'Czym jest to oświadczenie?',
        paragraphs: [
          'To pisemne oświadczenie właściciela lokalu (innego niż wynajmowane mieszkanie), w którym zgadza się on, aby najemca zamieszkał pod jego adresem w razie zakończenia najmu okazjonalnego. Jest obowiązkowym załącznikiem do umowy.',
        ],
      },
      {
        heading: 'Co musi zawierać',
        bullets: [
          'dane właściciela lokalu wskazanego do zamieszkania,',
          'dokładny adres tego lokalu,',
          'wyraźną zgodę na zamieszkanie najemcy po ustaniu najmu,',
          'podpis właściciela poświadczony notarialnie.',
        ],
      },
      {
        heading: 'Dlaczego potrzebny jest notariusz',
        paragraphs: [
          'Ustawa wymaga, aby podpis właściciela pod oświadczeniem był poświadczony notarialnie. Zwykły podpis czy skan nie wystarczą. Poświadczenie potwierdza autentyczność i sprawia, że dokument nadaje się do zawarcia umowy.',
        ],
      },
      {
        heading: 'Nie masz własnego adresu? Pomożemy',
        paragraphs: [
          'Jeśli nie masz lokalu ani osoby, która udostępniłaby adres, zapewniamy właściciela lokalu i kompletne oświadczenie z poświadczeniem notarialnym. Otrzymujesz gotowy dokument, który dołączasz do umowy najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy oświadczenie może podpisać ktoś spoza rodziny?',
        a: 'Tak. Właścicielem wskazanego lokalu może być dowolna osoba, która wyrazi zgodę — pokrewieństwo nie jest wymagane.',
      },
      {
        q: 'Czy wystarczy podpis elektroniczny właściciela?',
        a: 'Nie. Podpis musi być poświadczony notarialnie w tradycyjnej formie. Obsługą notarialną zajmujemy się my.',
      },
    ],
  },

  'najem-okazjonalny-krok-po-kroku': {
    intro:
      'Najem okazjonalny budzi obawy, bo wymaga kilku dokumentów więcej niż zwykła umowa. W praktyce cały proces jest prosty i da się go przejść w kilka dni. Pokazujemy go krok po kroku — od decyzji po podpisaną umowę.',
    sections: [
      {
        heading: 'Krok 1: Ustal warunki najmu z właścicielem',
        paragraphs: [
          'Zanim zajmiesz się dokumentami, dogadaj z wynajmującym podstawowe warunki: wysokość czynszu, kaucję, okres najmu i termin podpisania umowy. To od terminu zależy, jak szybko musisz skompletować dokumenty.',
        ],
      },
      {
        heading: 'Krok 2: Zdobądź adres i oświadczenie właściciela lokalu',
        paragraphs: [
          'Najemca musi wskazać lokal, do którego wyprowadzi się po zakończeniu najmu, i dołączyć oświadczenie jego właściciela o zgodzie na zamieszkanie — z podpisem poświadczonym notarialnie.',
          'Jeśli nie masz takiego adresu, ten etap zwykle blokuje całość. Zapewniamy właściciela lokalu i gotowe, poświadczone oświadczenie, więc nie musisz angażować rodziny.',
        ],
      },
      {
        heading: 'Krok 3: Oświadczenie najemcy u notariusza',
        paragraphs: [
          'Najemca składa u notariusza oświadczenie o poddaniu się egzekucji co do opróżnienia lokalu (w formie aktu notarialnego). To kluczowy element zabezpieczający najem okazjonalny.',
        ],
      },
      {
        heading: 'Krok 4: Podpisanie umowy i zgłoszenie do urzędu skarbowego',
        bullets: [
          'podpiszcie umowę najmu okazjonalnego na piśmie wraz z załącznikami,',
          'właściciel zgłasza umowę do urzędu skarbowego w ciągu 14 dni,',
          'zachowajcie komplet dokumentów — przyda się przez cały okres najmu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ile czasu zajmuje cały proces?',
        a: 'Najwięcej czasu zajmuje zdobycie adresu i wizyta u notariusza. Komplet dokumentów po naszej stronie przygotowujemy zwykle w 24–48 godzin, więc całość da się domknąć w kilka dni.',
      },
      {
        q: 'Co jest najtrudniejsze dla najemcy?',
        a: 'Najczęściej wskazanie adresu i zdobycie oświadczenia właściciela lokalu. Ten etap bierzemy na siebie.',
      },
    ],
  },

  'najem-okazjonalny-dla-studenta': {
    intro:
      'Wynajmujesz pierwsze mieszkanie na studiach, a właściciel prosi o „najem okazjonalny" i jakieś oświadczenie? Spokojnie — to standardowa, bezpieczna forma umowy. Tłumaczymy, o co chodzi i jak to ogarnąć bez stresu.',
    sections: [
      {
        heading: 'Dlaczego właściciele proszą studentów o najem okazjonalny',
        paragraphs: [
          'Najem okazjonalny daje właścicielowi większe bezpieczeństwo, dlatego coraz częściej jest warunkiem wynajmu — także przy studentach. Posiadanie gotowych dokumentów zwiększa Twoje szanse na podpisanie umowy.',
        ],
      },
      {
        heading: 'Problem: brak adresu i rodziny w mieście',
        paragraphs: [
          'Wielu studentów uczy się z dala od domu i nie ma w nowym mieście nikogo, kto udostępniłby adres do oświadczenia. Dobra wiadomość: ustawa nie wymaga, żeby był to adres rodziny.',
          'Zapewniamy właściciela lokalu i oświadczenie z poświadczeniem notarialnym, więc nie musisz prosić rodziców ani znajomych.',
        ],
      },
      {
        heading: 'Na co zwrócić uwagę przy pierwszej umowie',
        bullets: [
          'sprawdź wysokość kaucji (zwykle maks. równowartość kilku czynszów),',
          'spisz protokół zdawczo-odbiorczy mieszkania,',
          'upewnij się, że masz komplet załączników do umowy.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy student bez dochodów może zawrzeć najem okazjonalny?',
        a: 'Tak. Najem okazjonalny nie zależy od dochodów najemcy, tylko od kompletu wymaganych dokumentów.',
      },
      {
        q: 'Czy potrzebuję zgody rodziców?',
        a: 'Nie, jeśli jesteś pełnoletni. Nie potrzebujesz też ich adresu — oświadczenie właściciela lokalu zapewniamy my.',
      },
    ],
  },

  'najem-okazjonalny-w-innym-miescie': {
    intro:
      'Częste pytanie najemców: czy adres wskazany w oświadczeniu musi być w tym samym mieście, w którym wynajmuję mieszkanie? Odpowiedź: nie. Wyjaśniamy, dlaczego adres może być w dowolnej części Polski.',
    sections: [
      {
        heading: 'Co mówią przepisy o lokalizacji adresu',
        paragraphs: [
          'Ustawa wymaga jedynie wskazania lokalu, do którego najemca może się wyprowadzić po zakończeniu najmu, oraz oświadczenia jego właściciela. Nie ma wymogu, aby ten lokal znajdował się w tym samym mieście co wynajmowane mieszkanie ani co Twoje aktualne miejsce pobytu.',
        ],
      },
      {
        heading: 'Dlaczego to wygodne dla najemcy',
        paragraphs: [
          'Dzięki temu możesz wynajmować mieszkanie np. w Warszawie, a adres z oświadczenia może być w innym mieście. To szczególnie pomocne, gdy właśnie zmieniłeś miasto i nie masz tam jeszcze żadnego zaplecza.',
        ],
      },
      {
        heading: 'Jak to wygląda w praktyce',
        bullets: [
          'wskazujemy lokal i zapewniamy oświadczenie jego właściciela,',
          'podpis właściciela poświadcza notariusz,',
          'komplet dokumentów wysyłamy tam, gdzie ich potrzebujesz.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy wynajmujący może wymagać adresu w tym samym mieście?',
        a: 'Nie ma do tego podstawy prawnej. Wystarczy, że przedstawisz komplet wymaganych dokumentów z poprawnym oświadczeniem właściciela lokalu.',
      },
      {
        q: 'Czy muszę faktycznie mieszkać pod wskazanym adresem?',
        a: 'Nie. Adres ma znaczenie wyłącznie na wypadek zakończenia najmu i konieczności wskazania lokalu zastępczego.',
      },
    ],
  },

  'najem-okazjonalny-a-meldunek': {
    intro:
      'Wielu najemców myli wskazanie adresu w najmie okazjonalnym z zameldowaniem. To dwie różne sprawy. Wyjaśniamy, czym się różnią i czy adres z oświadczenia wpływa na Twój meldunek.',
    sections: [
      {
        heading: 'Adres z oświadczenia to nie meldunek',
        paragraphs: [
          'Adres wskazany w oświadczeniu właściciela lokalu służy wyłącznie wskazaniu miejsca, do którego najemca może się wyprowadzić po zakończeniu najmu. Nie jest to zameldowanie i nie zmienia Twojego adresu zameldowania.',
        ],
      },
      {
        heading: 'Czym jest zameldowanie',
        paragraphs: [
          'Zameldowanie to czynność administracyjna polegająca na zgłoszeniu miejsca pobytu w urzędzie. Jest niezależna od najmu okazjonalnego — to, że wskazujesz adres w oświadczeniu, nie powoduje zameldowania pod tym adresem.',
        ],
      },
      {
        heading: 'Co to oznacza dla Ciebie',
        bullets: [
          'wskazany adres nie wpływa na korespondencję urzędową kierowaną na Twój meldunek,',
          'nie powstają zobowiązania wobec właściciela wskazanego lokalu z tytułu meldunku,',
          'Twoje sprawy życiowe pozostają związane z faktycznym miejscem zamieszkania.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy zostanę zameldowany pod wskazanym adresem?',
        a: 'Nie. Oświadczenie dotyczy możliwości wyprowadzki po najmie, a nie zameldowania.',
      },
      {
        q: 'Czy muszę się gdziekolwiek meldować, żeby zawrzeć najem okazjonalny?',
        a: 'Nie. Meldunek i najem okazjonalny to odrębne kwestie.',
      },
    ],
  },

  'najem-okazjonalny-a-zwykly-najem': {
    intro:
      'Zwykła umowa najmu czy najem okazjonalny? Różnica sprowadza się głównie do poziomu zabezpieczenia właściciela i kilku dodatkowych dokumentów. Porównujemy obie formy, żeby ułatwić Ci decyzję.',
    sections: [
      {
        heading: 'Najem zwykły',
        bullets: [
          'prostsza umowa, bez dodatkowych załączników notarialnych,',
          'trudniejsze i dłuższe odzyskanie lokalu w razie problemów,',
          'pełna ochrona lokatora wynikająca z ustawy.',
        ],
      },
      {
        heading: 'Najem okazjonalny',
        bullets: [
          'wymaga oświadczenia najemcy o poddaniu się egzekucji oraz wskazania adresu zastępczego,',
          'szybsze i prostsze odzyskanie lokalu przez właściciela,',
          'obowiązek zgłoszenia umowy do urzędu skarbowego w 14 dni.',
        ],
      },
      {
        heading: 'Którą formę wybrać',
        paragraphs: [
          'Jeśli wynajmujesz jako właściciel, najem okazjonalny daje Ci większe bezpieczeństwo. Jeśli jesteś najemcą, najczęściej to właściciel decyduje o formie — a posiadanie gotowych dokumentów do najmu okazjonalnego zwiększa Twoje szanse na wynajem.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najem okazjonalny jest gorszy dla najemcy?',
        a: 'Nie. Przy terminowym płaceniu czynszu sytuacja najemcy jest praktycznie taka sama. Dodatkowe dokumenty zabezpieczają głównie właściciela.',
      },
      {
        q: 'Czy mogę zmienić zwykły najem na okazjonalny w trakcie?',
        a: 'Tak, strony mogą zawrzeć nową umowę w formie najmu okazjonalnego wraz z wymaganymi załącznikami.',
      },
    ],
  },

  'wady-i-zalety-najmu-okazjonalnego': {
    intro:
      'Najem okazjonalny ma swoich zwolenników i przeciwników. Spójrzmy obiektywnie na plusy i minusy — osobno dla najemcy i dla właściciela — żebyś wiedział, na co się decydujesz.',
    sections: [
      {
        heading: 'Zalety',
        bullets: [
          'większe bezpieczeństwo i prostsze odzyskanie lokalu dla właściciela,',
          'często warunek konieczny, by w ogóle wynająć mieszkanie,',
          'jasne zasady zakończenia najmu dla obu stron,',
          'adres zastępczy może być w dowolnym mieście w Polsce.',
        ],
      },
      {
        heading: 'Wady',
        bullets: [
          'więcej formalności niż przy zwykłej umowie,',
          'konieczność wizyty najemcy u notariusza,',
          'potrzeba wskazania adresu i zdobycia oświadczenia właściciela lokalu.',
        ],
      },
      {
        heading: 'Jak zniwelować wady',
        paragraphs: [
          'Największą barierę — brak adresu i oświadczenia — rozwiązujemy za Ciebie: zapewniamy właściciela lokalu i poświadczone notarialnie dokumenty. Formalności stają się wtedy szybkie i bezstresowe.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy wady najmu okazjonalnego dotyczą najemcy czy właściciela?',
        a: 'Większość formalności obciąża najemcę (notariusz, adres), ale to właśnie najemcy najczęściej pomagamy je sprawnie dopełnić.',
      },
      {
        q: 'Czy zalety przeważają nad wadami?',
        a: 'Dla większości wynajmów tak — szczególnie gdy formalności bierze na siebie wyspecjalizowany podmiot.',
      },
    ],
  },

  'ile-kosztuje-najem-okazjonalny': {
    intro:
      'Ile realnie kosztuje najem okazjonalny? Poza czynszem i kaucją dochodzą koszty związane z dokumentami i notariuszem. Rozkładamy to na czynniki pierwsze, żebyś wiedział, na co się przygotować.',
    sections: [
      {
        heading: 'Z czego składają się koszty',
        bullets: [
          'taksa notarialna za poświadczenie/oświadczenie,',
          'przygotowanie kompletu dokumentów (m.in. oświadczenia właściciela lokalu),',
          'ewentualna kaucja i czynsz — to koszty samego najmu, niezależne od formy.',
        ],
      },
      {
        heading: 'Ile kosztuje obsługa dokumentów u nas',
        paragraphs: [
          'Cena zależy od wybranego pakietu i tempa realizacji — od opcji podstawowej po pełną obsługę z priorytetem. Koszt obsługi notarialnej jest uwzględniony w pakietach, które ją obejmują, więc nie zaskoczą Cię ukryte opłaty. Aktualne ceny znajdziesz w sekcji pakietów.',
        ],
      },
      {
        heading: 'Na czym nie warto oszczędzać',
        paragraphs: [
          'Komplet dokumentów musi być poprawny i poświadczony notarialnie — w przeciwnym razie umowa może nie spełniać wymogów najmu okazjonalnego. Lepiej raz przygotować to rzetelnie, niż poprawiać w pośpiechu przed podpisaniem umowy.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy są ukryte opłaty?',
        a: 'Nie. Cena pakietu jest jasno określona przed zamówieniem i obejmuje wskazany zakres, łącznie z obsługą notarialną tam, gdzie jest przewidziana.',
      },
      {
        q: 'Czy mogę dostać fakturę?',
        a: 'Tak, na życzenie wystawiamy fakturę — wystarczy podać dane przy zamówieniu.',
      },
    ],
  },

  'dokumenty-do-najmu-okazjonalnego': {
    intro:
      'Żeby umowa była ważnym najmem okazjonalnym, potrzebny jest komplet załączników. Brak choćby jednego elementu sprawia, że umowa traci szczególne zabezpieczenia. Oto pełna lista dokumentów i wyjaśnienie każdego z nich.',
    sections: [
      {
        heading: 'Komplet wymaganych dokumentów',
        bullets: [
          'umowa najmu okazjonalnego zawarta na piśmie,',
          'oświadczenie najemcy o poddaniu się egzekucji (akt notarialny),',
          'wskazanie lokalu, do którego najemca się wyprowadzi po zakończeniu najmu,',
          'oświadczenie właściciela tego lokalu o zgodzie na zamieszkanie — z podpisem poświadczonym notarialnie,',
          'zgłoszenie umowy do urzędu skarbowego w ciągu 14 dni.',
        ],
      },
      {
        heading: 'Który dokument sprawia najwięcej problemów',
        paragraphs: [
          'W praktyce najtrudniejsze dla najemcy jest wskazanie adresu i zdobycie oświadczenia właściciela lokalu. To właśnie ten element bierzemy na siebie — zapewniamy właściciela i poświadczone notarialnie oświadczenie.',
        ],
      },
      {
        heading: 'O czym pamięta właściciel mieszkania',
        paragraphs: [
          'Po stronie wynajmującego pozostaje zgłoszenie umowy do urzędu skarbowego w terminie 14 dni. Bez tego umowa nie korzysta z pełnych zabezpieczeń najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Co się stanie, jeśli zabraknie jednego dokumentu?',
        a: 'Umowa może zostać uznana za zwykły najem, bez szczególnych zabezpieczeń najmu okazjonalnego. Dlatego warto zadbać o kompletność.',
      },
      {
        q: 'Czy przygotujecie cały komplet?',
        a: 'Zapewniamy adres i oświadczenie właściciela lokalu z poświadczeniem notarialnym oraz materiały pomocnicze. Pozostałe elementy podpisujecie wspólnie z wynajmującym.',
      },
    ],
  },

  'oswiadczenie-najemcy-o-poddaniu-sie-egzekucji': {
    intro:
      'Oświadczenie najemcy o poddaniu się egzekucji to serce najmu okazjonalnego — dokument, który najbardziej różni tę formę od zwykłej umowy. Wyjaśniamy prostym językiem, co oznacza i dlaczego nie warto się go obawiać.',
    sections: [
      {
        heading: 'Co to właściwie jest',
        paragraphs: [
          'To sporządzone w formie aktu notarialnego oświadczenie, w którym najemca zgadza się dobrowolnie opuścić lokal po zakończeniu lub wygaśnięciu umowy. Dzięki temu właściciel nie musi prowadzić długiego postępowania o eksmisję.',
        ],
      },
      {
        heading: 'Czy to bezpieczne dla najemcy',
        paragraphs: [
          'Tak — dopóki przestrzegasz umowy i płacisz czynsz, oświadczenie pozostaje bez znaczenia praktycznego. Dotyczy wyłącznie sytuacji zakończenia najmu i konieczności opuszczenia lokalu.',
        ],
      },
      {
        heading: 'Jak je uzyskać',
        bullets: [
          'oświadczenie składa najemca osobiście u notariusza,',
          'notariusz sporządza akt notarialny,',
          'dokument dołącza się jako załącznik do umowy najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę zostać wyrzucony z dnia na dzień?',
        a: 'Nie. Procedura ma zastosowanie dopiero po zakończeniu umowy i z zachowaniem wymaganych kroków. Przy prawidłowo realizowanej umowie sytuacja ta nie występuje.',
      },
      {
        q: 'Czy to oświadczenie zastępuje wskazanie adresu?',
        a: 'Nie. To dwa odrębne dokumenty — potrzebne jest zarówno oświadczenie najemcy, jak i oświadczenie właściciela lokalu zastępczego.',
      },
    ],
  },

  'zgloszenie-najmu-okazjonalnego-do-urzedu-skarbowego': {
    intro:
      'Zgłoszenie umowy do urzędu skarbowego to obowiązek właściciela i warunek, by najem okazjonalny działał w pełni. Masz na to 14 dni. Wyjaśniamy, jak to zrobić i co grozi za spóźnienie.',
    sections: [
      {
        heading: 'Kto i kiedy zgłasza umowę',
        paragraphs: [
          'Obowiązek spoczywa na wynajmującym (właścicielu mieszkania). Zgłoszenia dokonuje się naczelnikowi urzędu skarbowego właściwego dla miejsca zamieszkania właściciela, w terminie 14 dni od rozpoczęcia najmu.',
        ],
      },
      {
        heading: 'Co grozi za brak zgłoszenia',
        paragraphs: [
          'Jeśli właściciel nie zgłosi umowy w terminie, umowa traci szczególne zabezpieczenia najmu okazjonalnego — w praktyce staje się zwykłym najmem, z trudniejszą procedurą odzyskania lokalu.',
        ],
      },
      {
        heading: 'Krótka checklista',
        bullets: [
          'ustal właściwy urząd skarbowy,',
          'przygotuj dane umowy i stron,',
          'dokonaj zgłoszenia w ciągu 14 dni od rozpoczęcia najmu,',
          'zachowaj potwierdzenie zgłoszenia.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najemca też musi coś zgłaszać?',
        a: 'Nie. Zgłoszenie do urzędu skarbowego to obowiązek wynajmującego.',
      },
      {
        q: 'Czy zgłoszenie wiąże się z dodatkowym podatkiem?',
        a: 'Samo zgłoszenie najmu okazjonalnego nie tworzy nowego podatku — właściciel rozlicza przychód z najmu na ogólnych zasadach (np. ryczałtem).',
      },
    ],
  },

  'umowa-najmu-okazjonalnego-wzor': {
    intro:
      'Dobrze skonstruowana umowa najmu okazjonalnego chroni obie strony. Podpowiadamy, co powinna zawierać i na które zapisy zwrócić szczególną uwagę przed złożeniem podpisu.',
    sections: [
      {
        heading: 'Co musi znaleźć się w umowie',
        bullets: [
          'oznaczenie stron i przedmiotu najmu (adres, opis lokalu),',
          'wysokość czynszu i innych opłat oraz termin płatności,',
          'wysokość kaucji i zasady jej zwrotu,',
          'okres obowiązywania umowy,',
          'odwołanie do wymaganych załączników (oświadczenia, wskazanie adresu).',
        ],
      },
      {
        heading: 'Na co zwrócić uwagę',
        paragraphs: [
          'Sprawdź zasady wypowiedzenia, odpowiedzialność za naprawy oraz stan lokalu opisany w protokole. Upewnij się, że umowa odwołuje się do kompletu załączników wymaganych dla najmu okazjonalnego.',
        ],
      },
      {
        heading: 'Załączniki to podstawa',
        paragraphs: [
          'Sama umowa to nie wszystko. Bez oświadczenia najemcy o poddaniu się egzekucji oraz oświadczenia właściciela lokalu zastępczego umowa nie będzie pełnoprawnym najmem okazjonalnym. Pomagamy skompletować brakujące dokumenty.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę użyć gotowego wzoru z internetu?',
        a: 'Wzór bywa dobrym punktem wyjścia, ale musi być dostosowany do Twojej sytuacji i uzupełniony o wymagane załączniki. Inaczej umowa może nie spełniać wymogów ustawy.',
      },
      {
        q: 'Czy umowa musi być u notariusza?',
        a: 'Sama umowa najmu może być zawarta na piśmie. Notariusza wymaga oświadczenie najemcy o poddaniu się egzekucji oraz poświadczenie podpisu właściciela lokalu zastępczego.',
      },
    ],
  },

  'protokol-zdawczo-odbiorczy-mieszkania': {
    intro:
      'Protokół zdawczo-odbiorczy to dokument, który ratuje przy zwrocie kaucji i sporach o stan mieszkania. Pokazujemy, co powinien zawierać i jak go prawidłowo sporządzić.',
    sections: [
      {
        heading: 'Po co jest protokół',
        paragraphs: [
          'Protokół opisuje stan lokalu i jego wyposażenia w chwili przekazania. Dzięki niemu przy zakończeniu najmu łatwo ustalić, co jest normalnym zużyciem, a co zniszczeniem — i czy należy się zwrot kaucji.',
        ],
      },
      {
        heading: 'Co w nim ująć',
        bullets: [
          'stan ścian, podłóg, okien i drzwi,',
          'spis wyposażenia i sprzętów wraz z ich stanem,',
          'stany liczników (prąd, woda, gaz),',
          'liczbę przekazanych kluczy,',
          'zdjęcia dokumentujące stan lokalu.',
        ],
      },
      {
        heading: 'Podpisują obie strony',
        paragraphs: [
          'Protokół sporządza się w dwóch egzemplarzach i podpisują go najemca oraz wynajmujący. Analogiczny protokół warto wykonać przy zwrocie lokalu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy protokół jest obowiązkowy?',
        a: 'Nie jest wymogiem ustawy o najmie okazjonalnym, ale to jeden z najważniejszych dokumentów chroniących obie strony i Twoją kaucję.',
      },
      {
        q: 'Czy zdjęcia mają znaczenie?',
        a: 'Tak. Dokumentacja zdjęciowa bywa rozstrzygająca przy sporach o stan mieszkania.',
      },
    ],
  },

  'jak-wskazac-adres-w-oswiadczeniu': {
    intro:
      'Wskazanie lokalu zastępczego w oświadczeniu wydaje się formalnością, ale błędy w tym miejscu potrafią podważyć cały najem okazjonalny. Podpowiadamy, jak zrobić to prawidłowo.',
    sections: [
      {
        heading: 'Co dokładnie się wskazuje',
        paragraphs: [
          'W dokumentach wskazuje się konkretny lokal, do którego najemca będzie mógł się wyprowadzić po zakończeniu najmu, oraz dołącza oświadczenie właściciela tego lokalu o zgodzie na zamieszkanie najemcy.',
        ],
      },
      {
        heading: 'Najczęstsze błędy',
        bullets: [
          'niepełny lub nieprecyzyjny adres lokalu,',
          'brak poświadczenia notarialnego podpisu właściciela,',
          'pominięcie zgody współwłaścicieli, jeśli lokal ma kilku właścicieli.',
        ],
      },
      {
        heading: 'Jak uniknąć problemów',
        paragraphs: [
          'Najprościej powierzyć przygotowanie dokumentu wyspecjalizowanemu podmiotowi. Zapewniamy poprawny adres, kompletne oświadczenie i poświadczenie notarialne, więc nie musisz martwić się o formalne szczegóły.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy adres może wskazać dowolna osoba?',
        a: 'Tak, o ile jest właścicielem lokalu i wyrazi zgodę. Pokrewieństwo z najemcą nie jest wymagane.',
      },
      {
        q: 'Co jeśli lokal ma kilku właścicieli?',
        a: 'Wówczas oświadczenie powinno uwzględniać zgodę uprawnionych współwłaścicieli. Dbamy o to, aby dokument był kompletny.',
      },
    ],
  },

  'kaucja-przy-najmie-okazjonalnym': {
    intro:
      'Kaucja to standardowy element najmu, ale przy najmie okazjonalnym warto znać kilka zasad — od maksymalnej wysokości po termin zwrotu. Wyjaśniamy, czego możesz oczekiwać.',
    sections: [
      {
        heading: 'Ile może wynosić kaucja',
        paragraphs: [
          'Wysokość kaucji ustalają strony, jednak ustawa ogranicza ją do równowartości określonej wielokrotności miesięcznego czynszu. Kaucja zabezpiecza ewentualne roszczenia właściciela związane z najmem.',
        ],
      },
      {
        heading: 'Kiedy i jak jest zwracana',
        paragraphs: [
          'Kaucja podlega zwrotowi po zakończeniu najmu, po potrąceniu ewentualnych należności (np. za zniszczenia ponad normalne zużycie czy zaległy czynsz). Tu kluczowy jest protokół zdawczo-odbiorczy.',
        ],
      },
      {
        heading: 'Jak zadbać o swoją kaucję',
        bullets: [
          'spisz protokół zdawczo-odbiorczy ze zdjęciami,',
          'zachowuj potwierdzenia płatności czynszu,',
          'zgłaszaj usterki na bieżąco, na piśmie.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy właściciel może zatrzymać całą kaucję?',
        a: 'Tylko w zakresie uzasadnionych potrąceń (np. udokumentowane zniszczenia, zaległości). Resztę powinien zwrócić.',
      },
      {
        q: 'Czy kaucja zależy od formy najmu?',
        a: 'Zasady są zbliżone w najmie zwykłym i okazjonalnym — w obu przypadkach obowiązują ustawowe ograniczenia wysokości.',
      },
    ],
  },

  'jak-znalezc-adres-do-najmu-okazjonalnego': {
    intro:
      'Brak adresu do oświadczenia to najczęstszy powód, dla którego najemcy utykają z najmem okazjonalnym. Pokazujemy realne sposoby na zdobycie adresu — także wtedy, gdy nie masz kogo poprosić.',
    sections: [
      {
        heading: 'Dlaczego adres bywa problemem',
        paragraphs: [
          'Nie każdy ma w pobliżu rodzinę czy znajomych, którzy zgodzą się udostępnić swój lokal i złożyć oświadczenie u notariusza. Dla osób po przeprowadzce, obcokrajowców czy studentów to częsta przeszkoda.',
        ],
      },
      {
        heading: 'Możliwe drogi',
        bullets: [
          'poproszenie rodziny lub znajomych będących właścicielami lokalu,',
          'skorzystanie z usługi, która zapewnia adres i oświadczenie właściciela,',
          'wskazanie własnego lokalu, jeśli takim dysponujesz.',
        ],
      },
      {
        heading: 'Rozwiązanie bez angażowania bliskich',
        paragraphs: [
          'Zapewniamy właściciela lokalu, który składa wymagane oświadczenie, oraz poświadczenie notarialne podpisu. Otrzymujesz gotowy dokument — bez krępujących próśb i bez ryzyka, że ktoś się rozmyśli.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy to legalne, że adres pochodzi z usługi?',
        a: 'Tak. Ustawa nie wymaga pokrewieństwa z właścicielem wskazanego lokalu. Dokumenty są zgodne z przepisami i poświadczone notarialnie.',
      },
      {
        q: 'Jak szybko mogę dostać adres?',
        a: 'Komplet dokumentów przygotowujemy zwykle w 24–48 godzin, a w trybie ekspresowym jeszcze szybciej.',
      },
    ],
  },

  'co-zrobic-gdy-wlasciciel-wymaga-najmu-okazjonalnego': {
    intro:
      'Wymarzone mieszkanie w zasięgu ręki, ale właściciel stawia warunek: tylko najem okazjonalny. Bez paniki — pokazujemy, jak spełnić wymóg krok po kroku i nie stracić oferty.',
    sections: [
      {
        heading: 'Dlaczego właściciel tego wymaga',
        paragraphs: [
          'Najem okazjonalny daje wynajmującemu większe bezpieczeństwo i prostsze odzyskanie lokalu w razie problemów. To rozsądny wymóg, a posiadanie gotowych dokumentów działa na Twoją korzyść.',
        ],
      },
      {
        heading: 'Co musisz przygotować',
        bullets: [
          'oświadczenie o poddaniu się egzekucji (u notariusza),',
          'wskazanie adresu zastępczego,',
          'oświadczenie właściciela tego lokalu z poświadczeniem notarialnym.',
        ],
      },
      {
        heading: 'Jak zdążyć na czas',
        paragraphs: [
          'Jeśli termin podpisania umowy jest blisko, brakujące dokumenty — adres i oświadczenie właściciela — możemy przygotować ekspresowo, nawet w 24 godziny. Dzięki temu nie stracisz mieszkania przez formalności.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę odmówić najmu okazjonalnego?',
        a: 'Możesz, ale wtedy właściciel może nie zgodzić się na wynajem. Łatwiej spełnić wymóg, mając gotowe dokumenty.',
      },
      {
        q: 'Co, jeśli nie mam adresu do wskazania?',
        a: 'Zapewnimy go za Ciebie wraz z oświadczeniem właściciela lokalu i poświadczeniem notarialnym.',
      },
    ],
  },

  'najem-okazjonalny-po-powrocie-z-zagranicy': {
    intro:
      'Po latach za granicą wracasz do Polski i okazuje się, że do wynajmu mieszkania potrzebujesz najmu okazjonalnego — a nie masz tu już żadnego zaplecza. Podpowiadamy, jak załatwić formalności zdalnie.',
    sections: [
      {
        heading: 'Typowa sytuacja osoby wracającej',
        paragraphs: [
          'Brak aktualnego adresu, brak bliskich, którzy udostępniliby lokal, i presja czasu — to najczęstsze trudności osób wracających z emigracji. Najem okazjonalny da się jednak przejść bez problemu.',
        ],
      },
      {
        heading: 'Co możemy zrobić zdalnie',
        bullets: [
          'zapewnić adres i oświadczenie właściciela lokalu,',
          'zorganizować poświadczenie notarialne podpisu właściciela,',
          'wysłać komplet dokumentów tam, gdzie ich potrzebujesz.',
        ],
      },
      {
        heading: 'Czego potrzebujesz od siebie',
        paragraphs: [
          'Wystarczy kontakt i podstawowe dane do zamówienia. Resztą zajmujemy się my, a Ty otrzymujesz gotowy komplet dokumentów do dołączenia do umowy.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy muszę być w Polsce, żeby zamówić dokumenty?',
        a: 'Zamówienie i komplet dokumentów po naszej stronie realizujemy zdalnie. Część formalności najemcy (np. oświadczenie u notariusza) wymaga Twojej obecności w kraju.',
      },
      {
        q: 'Czy brak meldunku w Polsce jest przeszkodą?',
        a: 'Nie. Najem okazjonalny nie zależy od Twojego meldunku.',
      },
    ],
  },

  'prawa-najemcy-w-najmie-okazjonalnym': {
    intro:
      'Najem okazjonalny kojarzy się z ochroną właściciela, ale najemca również ma swoje prawa. Wyjaśniamy, co Ci przysługuje i czego wynajmujący nie może od Ciebie wymagać.',
    sections: [
      {
        heading: 'Co przysługuje najemcy',
        bullets: [
          'korzystanie z lokalu zgodnie z umową przez cały okres najmu,',
          'zwrot kaucji po potrąceniu uzasadnionych należności,',
          'ochrona przed bezpodstawnym, natychmiastowym usunięciem z lokalu,',
          'jasne zasady wypowiedzenia umowy.',
        ],
      },
      {
        heading: 'Czego właściciel nie może',
        paragraphs: [
          'Wynajmujący nie może samowolnie wyrzucić Cię z mieszkania ani odciąć mediów. Procedura zakończenia najmu i opróżnienia lokalu jest sformalizowana i wymaga zachowania określonych kroków.',
        ],
      },
      {
        heading: 'Twoje obowiązki',
        paragraphs: [
          'W zamian najemca powinien terminowo płacić czynsz, dbać o lokal i korzystać z niego zgodnie z przeznaczeniem. To podstawa spokojnego najmu dla obu stron.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę zostać usunięty z dnia na dzień?',
        a: 'Nie. Nawet przy najmie okazjonalnym opróżnienie lokalu wymaga zachowania procedury i nie odbywa się natychmiastowo bez podstaw.',
      },
      {
        q: 'Czy mam prawo do zwrotu kaucji?',
        a: 'Tak, po zakończeniu najmu i potrąceniu ewentualnych uzasadnionych należności.',
      },
    ],
  },

  'na-co-uwazac-podpisujac-umowe-najmu': {
    intro:
      'Podpis pod umową najmu to moment, w którym warto być czujnym. Zebraliśmy najczęstsze pułapki, które potrafią kosztować najemcę nerwy i pieniądze.',
    sections: [
      {
        heading: 'Zapisy, które warto sprawdzić',
        bullets: [
          'zasady i terminy wypowiedzenia umowy,',
          'kto odpowiada za naprawy i drobne usterki,',
          'wysokość i warunki zwrotu kaucji,',
          'opłaty dodatkowe (media, czynsz administracyjny).',
        ],
      },
      {
        heading: 'Dokumenty i stan lokalu',
        paragraphs: [
          'Upewnij się, że umowa odwołuje się do kompletu załączników najmu okazjonalnego i że sporządziliście protokół zdawczo-odbiorczy. Brak protokołu to najczęstsze źródło sporów o kaucję.',
        ],
      },
      {
        heading: 'Czego nie podpisywać w pośpiechu',
        paragraphs: [
          'Nie podpisuj umowy bez przeczytania całości i bez kompletu wymaganych dokumentów. Jeśli brakuje adresu czy oświadczenia właściciela lokalu, lepiej najpierw je zdobyć — pomożemy zrobić to szybko.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę negocjować zapisy umowy?',
        a: 'Tak. Umowa najmu jest negocjowalna — warto ustalić niejasne kwestie przed podpisem.',
      },
      {
        q: 'Co, jeśli brakuje załączników najmu okazjonalnego?',
        a: 'Bez nich umowa nie będzie pełnoprawnym najmem okazjonalnym. Brakujące dokumenty (adres, oświadczenie) możemy przygotować ekspresowo.',
      },
    ],
  },

  'jak-szybko-zalatwic-dokumenty-do-umowy': {
    intro:
      'Podpisanie umowy za kilka dni, a dokumentów wciąż brak? Da się zdążyć. Pokazujemy, jak przyspieszyć kompletowanie dokumentów do najmu okazjonalnego.',
    sections: [
      {
        heading: 'Co zajmuje najwięcej czasu',
        paragraphs: [
          'Zwykle najdłużej trwa zdobycie adresu i oświadczenia właściciela lokalu oraz wizyta najemcy u notariusza. To te elementy warto zaplanować w pierwszej kolejności.',
        ],
      },
      {
        heading: 'Jak przyspieszyć',
        bullets: [
          'wybierz opcję ekspresową — komplet dokumentów nawet w 24 godziny,',
          'przygotuj wcześniej swoje dane do zamówienia,',
          'umów wizytę u notariusza z wyprzedzeniem.',
        ],
      },
      {
        heading: 'Realny termin',
        paragraphs: [
          'Jeśli masz podpisanie umowy w ciągu kilku dni, najlepiej od razu wybrać realizację ekspresową — komplet dokumentów przygotowujemy wtedy priorytetowo.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy naprawdę zdążycie w 24 godziny?',
        a: 'W większości przypadków tak, jeśli wybierzesz realizację ekspresową i sprawnie przekażesz potrzebne dane.',
      },
      {
        q: 'Co przygotować, żeby było szybciej?',
        a: 'Podstawowe dane do zamówienia i informację o terminie podpisania umowy. Resztą zajmujemy się my.',
      },
    ],
  },

  'najem-okazjonalny-a-zwierzeta': {
    intro:
      'Masz psa lub kota i obawiasz się, że umowa zakaże trzymania zwierząt? To kwestia ustaleń między stronami, nie samej formy najmu. Podpowiadamy, jak do tego podejść.',
    sections: [
      {
        heading: 'Czy umowa może zakazać zwierząt',
        paragraphs: [
          'Tak, strony mogą wpisać do umowy zasady dotyczące zwierząt — od zakazu po zgodę pod określonymi warunkami. To element negocjacji, niezależny od tego, czy najem jest okazjonalny, czy zwykły.',
        ],
      },
      {
        heading: 'Jak negocjować',
        bullets: [
          'zaproponuj wyższą kaucję jako zabezpieczenie,',
          'zaoferuj sprzątanie i ewentualne naprawy na koniec najmu,',
          'spisz stan lokalu w protokole zdawczo-odbiorczym.',
        ],
      },
      {
        heading: 'Warto ustalić to na piśmie',
        paragraphs: [
          'Niezależnie od ustaleń, zapisz je w umowie. Jasny zapis chroni obie strony i pozwala uniknąć sporów w trakcie najmu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najem okazjonalny zakazuje zwierząt?',
        a: 'Nie. Forma najmu nie reguluje kwestii zwierząt — decydują o tym zapisy umowy uzgodnione przez strony.',
      },
      {
        q: 'Czy mogę trzymać zwierzę mimo braku zapisu?',
        a: 'Najlepiej ustalić to wprost z wynajmującym i wpisać do umowy, aby uniknąć nieporozumień.',
      },
    ],
  },

  'wypowiedzenie-umowy-najmu-przez-najemce': {
    intro:
      'Chcesz wypowiedzieć najem okazjonalny? Zasady zależą głównie od treści umowy. Wyjaśniamy, jak prawidłowo zakończyć umowę i czego dopilnować.',
    sections: [
      {
        heading: 'Sprawdź najpierw umowę',
        paragraphs: [
          'To umowa określa terminy i warunki wypowiedzenia. Najem okazjonalny zwykle zawierany jest na czas oznaczony, co wpływa na możliwości jego wcześniejszego zakończenia. Zacznij więc od zapisów umowy.',
        ],
      },
      {
        heading: 'Forma i termin',
        bullets: [
          'wypowiedzenie najlepiej złożyć na piśmie,',
          'zachowaj termin wynikający z umowy,',
          'zadbaj o potwierdzenie doręczenia wypowiedzenia.',
        ],
      },
      {
        heading: 'Zakończenie i rozliczenie',
        paragraphs: [
          'Przy zwrocie lokalu sporządźcie protokół zdawczo-odbiorczy i rozliczcie kaucję. Dobra dokumentacja chroni Cię przed sporami o stan mieszkania.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę wypowiedzieć umowę w dowolnym momencie?',
        a: 'Zależy to od umowy. Przy umowach na czas oznaczony możliwości wcześniejszego wypowiedzenia są ograniczone do przypadków wskazanych w umowie lub przepisach.',
      },
      {
        q: 'Czy odzyskam kaucję po wypowiedzeniu?',
        a: 'Tak, po zakończeniu najmu i potrąceniu ewentualnych uzasadnionych należności.',
      },
    ],
  },

  'najem-okazjonalny-dla-wlasciciela-mieszkania': {
    intro:
      'Jeśli wynajmujesz mieszkanie, najem okazjonalny może być najlepszą decyzją dla Twojego bezpieczeństwa. Wyjaśniamy, co daje Ci jako właścicielowi i kiedy szczególnie warto z niego korzystać.',
    sections: [
      {
        heading: 'Główna korzyść: bezpieczeństwo',
        paragraphs: [
          'Najem okazjonalny upraszcza odzyskanie lokalu w razie problemów z najemcą. Najemca z góry godzi się opuścić mieszkanie po zakończeniu umowy i wskazuje lokal zastępczy, co znacząco skraca i upraszcza całą procedurę.',
        ],
      },
      {
        heading: 'Kiedy szczególnie warto',
        bullets: [
          'gdy wynajmujesz osobie, której nie znasz,',
          'gdy zależy Ci na szybkim odzyskaniu lokalu w razie zaległości,',
          'gdy wynajmujesz na dłużej i chcesz jasnych zasad zakończenia.',
        ],
      },
      {
        heading: 'Jak pomagamy właścicielom',
        paragraphs: [
          'Jeśli Twój najemca nie ma adresu do wskazania, dostarczymy brakujące dokumenty — oświadczenie właściciela lokalu z poświadczeniem notarialnym. Dzięki temu szybciej podpiszecie umowę.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najem okazjonalny jest trudny do zawarcia?',
        a: 'Wymaga kilku dokumentów więcej niż zwykła umowa, ale przy wsparciu wyspecjalizowanego podmiotu cały proces jest szybki i prosty.',
      },
      {
        q: 'Czy muszę być osobą fizyczną?',
        a: 'Najem okazjonalny jest przeznaczony dla właścicieli będących osobami fizycznymi, które nie wynajmują w ramach działalności gospodarczej.',
      },
    ],
  },

  'jak-zabezpieczyc-sie-przed-nieuczciwym-najemca': {
    intro:
      'Obawa przed nieuczciwym najemcą zniechęca wielu właścicieli do wynajmu. Najem okazjonalny i kilka prostych nawyków znacząco ograniczają to ryzyko. Oto jak się zabezpieczyć.',
    sections: [
      {
        heading: 'Najem okazjonalny jako tarcza',
        paragraphs: [
          'Dzięki oświadczeniu najemcy o poddaniu się egzekucji i wskazaniu lokalu zastępczego, odzyskanie mieszkania w razie problemów jest prostsze niż przy zwykłej umowie. To realne narzędzie ochrony właściciela.',
        ],
      },
      {
        heading: 'Dobre praktyki',
        bullets: [
          'spisz szczegółowy protokół zdawczo-odbiorczy ze zdjęciami,',
          'pobierz kaucję w dopuszczalnej wysokości,',
          'jasno określ w umowie terminy płatności i zasady wypowiedzenia,',
          'zgłoś umowę do urzędu skarbowego w ciągu 14 dni.',
        ],
      },
      {
        heading: 'Reaguj wcześnie',
        paragraphs: [
          'Przy pierwszych zaległościach reaguj na piśmie i dokumentuj kontakt z najemcą. Im lepsza dokumentacja, tym sprawniej przebiega ewentualne odzyskanie lokalu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najem okazjonalny gwarantuje brak problemów?',
        a: 'Nie daje gwarancji, ale znacząco ułatwia i przyspiesza odzyskanie lokalu w porównaniu ze zwykłym najmem.',
      },
      {
        q: 'Co jest najważniejsze w zabezpieczeniu?',
        a: 'Komplet poprawnych dokumentów, protokół zdawczo-odbiorczy i terminowe zgłoszenie umowy do urzędu skarbowego.',
      },
    ],
  },

  'eksmisja-przy-najmie-okazjonalnym': {
    intro:
      'Eksmisja kojarzy się z długim i kosztownym procesem. Przy najmie okazjonalnym procedura jest uproszczona — wyjaśniamy, jak przebiega odzyskanie lokalu krok po kroku.',
    sections: [
      {
        heading: 'Dlaczego jest prościej',
        paragraphs: [
          'Najemca w akcie notarialnym z góry poddaje się egzekucji co do opróżnienia lokalu i wskazuje adres, do którego może się wyprowadzić. Dzięki temu właściciel nie musi prowadzić pełnego postępowania sądowego o eksmisję.',
        ],
      },
      {
        heading: 'Przebieg w skrócie',
        bullets: [
          'zakończenie lub wygaśnięcie umowy najmu,',
          'wezwanie najemcy do opuszczenia lokalu,',
          'w razie potrzeby — skorzystanie z aktu notarialnego i procedury opróżnienia lokalu.',
        ],
      },
      {
        heading: 'Co to oznacza dla najemcy',
        paragraphs: [
          'Dla rzetelnego najemcy, który płaci czynsz i dba o lokal, procedura ta pozostaje czysto teoretyczna. Dotyczy sytuacji realnego naruszenia umowy.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy eksmisja jest natychmiastowa?',
        a: 'Nie. Mimo uproszczenia, procedura wymaga zachowania określonych kroków i nie odbywa się z dnia na dzień bez podstaw.',
      },
      {
        q: 'Czy potrzebny jest wskazany adres zastępczy?',
        a: 'Tak — to jeden z filarów najmu okazjonalnego i element ułatwiający odzyskanie lokalu.',
      },
    ],
  },

  'rozliczenie-podatku-od-najmu': {
    intro:
      'Wynajmujesz mieszkanie i zastanawiasz się, jak rozliczyć podatek? Wyjaśniamy podstawy opodatkowania najmu prywatnego i o czym pamiętać przy najmie okazjonalnym.',
    sections: [
      {
        heading: 'Ryczałt od najmu prywatnego',
        paragraphs: [
          'Najem prywatny (poza działalnością gospodarczą) rozlicza się ryczałtem od przychodów. Stawki ryczałtu zależą od wysokości rocznych przychodów z najmu. To uproszczona forma — podatek liczysz od przychodu, bez kosztów.',
        ],
      },
      {
        heading: 'Najem okazjonalny a podatek',
        paragraphs: [
          'Sama forma najmu okazjonalnego nie tworzy odrębnego podatku. Pamiętaj jednak o obowiązku zgłoszenia umowy do urzędu skarbowego w ciągu 14 dni — to warunek pełnych zabezpieczeń tej formy najmu.',
        ],
      },
      {
        heading: 'Praktyczne wskazówki',
        bullets: [
          'odprowadzaj zaliczki na ryczałt w obowiązujących terminach,',
          'prowadź ewidencję wpływów z najmu,',
          'zachowuj umowy i potwierdzenia płatności.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy muszę płacić wyższy podatek przy najmie okazjonalnym?',
        a: 'Nie. Opodatkowanie zależy od formy rozliczenia (np. ryczałt), a nie od tego, czy najem jest okazjonalny.',
      },
      {
        q: 'Czy rozliczenie podatku to usługa doradcza?',
        a: 'Indywidualne doradztwo podatkowe leży po stronie doradcy podatkowego. My zajmujemy się dokumentami do najmu okazjonalnego.',
      },
    ],
  },

  'obowiazki-wynajmujacego': {
    intro:
      'Wynajmujący ma nie tylko prawa, ale i obowiązki. Zebraliśmy najważniejsze powinności właściciela mieszkania przy najmie okazjonalnym.',
    sections: [
      {
        heading: 'Podstawowe obowiązki',
        bullets: [
          'wydanie lokalu w stanie nadającym się do umówionego użytku,',
          'zgłoszenie umowy najmu okazjonalnego do urzędu skarbowego w 14 dni,',
          'rozliczenie podatku od przychodu z najmu,',
          'zwrot kaucji po zakończeniu najmu (po uzasadnionych potrąceniach).',
        ],
      },
      {
        heading: 'W trakcie najmu',
        paragraphs: [
          'Właściciel powinien zapewnić najemcy spokojne korzystanie z lokalu i reagować na zgłoszenia dotyczące istotnych usterek wynikających z umowy. Nie może natomiast samowolnie wkraczać do mieszkania ani usuwać najemcy bez podstaw.',
        ],
      },
      {
        heading: 'Dokumentacja',
        paragraphs: [
          'Zadbaj o protokół zdawczo-odbiorczy oraz komplet załączników najmu okazjonalnego. Porządek w dokumentach to Twoje zabezpieczenie na wypadek sporu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę wejść do mieszkania bez zgody najemcy?',
        a: 'Nie. Poza sytuacjami wyjątkowymi wymaga to uzgodnienia z najemcą. Najemca ma prawo do spokojnego korzystania z lokalu.',
      },
      {
        q: 'Co, jeśli nie zgłoszę umowy do US?',
        a: 'Umowa straci szczególne zabezpieczenia najmu okazjonalnego i będzie traktowana jak zwykły najem.',
      },
    ],
  },

  'jak-napisac-ogloszenie-o-wynajmie': {
    intro:
      'Dobre ogłoszenie przyciąga solidnych najemców i skraca czas poszukiwań. Podpowiadamy, jak je napisać, żeby wyróżniało się i odsiewało przypadkowe zapytania.',
    sections: [
      {
        heading: 'Co musi zawierać',
        bullets: [
          'lokalizacja, metraż, liczba pokoi i piętro,',
          'wysokość czynszu i opłat dodatkowych,',
          'wyposażenie i stan mieszkania,',
          'informacja o formie umowy (np. najem okazjonalny),',
          'dobre, jasne zdjęcia.',
        ],
      },
      {
        heading: 'Jak przyciągnąć właściwych najemców',
        paragraphs: [
          'Pisz konkretnie i uczciwie. Zaznaczenie, że wynajmujesz w formie najmu okazjonalnego, od razu ustawia oczekiwania i przyciąga osoby gotowe dopełnić formalności.',
        ],
      },
      {
        heading: 'Czego unikać',
        paragraphs: [
          'Unikaj ogólników, brakujących informacji o opłatach i słabych zdjęć. Im mniej niejasności, tym mniej przypadkowych zapytań i szybszy wynajem.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy wspominać w ogłoszeniu o najmie okazjonalnym?',
        a: 'Tak. To uczciwe wobec najemcy i przyciąga osoby przygotowane na dopełnienie wymaganych formalności.',
      },
      {
        q: 'Czy zdjęcia naprawdę mają znaczenie?',
        a: 'Ogromne. Dobre zdjęcia to najczęstszy powód, dla którego ogłoszenie w ogóle zostaje otwarte.',
      },
    ],
  },

  'rola-notariusza-w-najmie-okazjonalnym': {
    intro:
      'Notariusz to nieodłączny element najmu okazjonalnego. Wyjaśniamy, co dokładnie poświadcza i dlaczego bez niego umowa nie spełnia wymogów ustawy.',
    sections: [
      {
        heading: 'Co robi notariusz',
        bullets: [
          'sporządza akt notarialny z oświadczeniem najemcy o poddaniu się egzekucji,',
          'poświadcza podpis właściciela lokalu pod oświadczeniem o zgodzie na zamieszkanie.',
        ],
      },
      {
        heading: 'Dlaczego to konieczne',
        paragraphs: [
          'Forma notarialna potwierdza autentyczność oświadczeń i nadaje im moc wymaganą przez ustawę. Zwykły podpis czy skan nie spełniają tych wymogów, dlatego notariusz jest niezbędny.',
        ],
      },
      {
        heading: 'Jak ułatwiamy ten etap',
        paragraphs: [
          'Współpracujemy z kancelariami notarialnymi, dzięki czemu poświadczenie podpisu właściciela lokalu organizujemy w ramach usługi. Otrzymujesz gotowy, poświadczony dokument.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy zawsze potrzebny jest notariusz?',
        a: 'Tak — najem okazjonalny wymaga formy notarialnej dla oświadczenia najemcy oraz poświadczenia podpisu właściciela lokalu zastępczego.',
      },
      {
        q: 'Czy notariusz sprawdza całą umowę najmu?',
        a: 'Notariusz zajmuje się oświadczeniami wymaganymi dla najmu okazjonalnego, a nie negocjacją czy treścią samej umowy najmu.',
      },
    ],
  },

  'ile-kosztuje-notariusz-przy-najmie-okazjonalnym': {
    intro:
      'Koszt notariusza to częste pytanie przy najmie okazjonalnym. Wyjaśniamy, od czego zależy taksa notarialna i jak uniknąć niespodzianek.',
    sections: [
      {
        heading: 'Od czego zależy cena',
        paragraphs: [
          'Wysokość taksy notarialnej regulują przepisy i zależy ona m.in. od rodzaju czynności (poświadczenie podpisu, sporządzenie aktu) oraz liczby dokumentów. Do taksy mogą dojść opłaty za wypisy.',
        ],
      },
      {
        heading: 'Poświadczenie podpisu vs akt notarialny',
        bullets: [
          'poświadczenie podpisu właściciela lokalu — czynność prostsza i tańsza,',
          'akt notarialny z oświadczeniem najemcy — czynność bardziej rozbudowana.',
        ],
      },
      {
        heading: 'Co masz u nas',
        paragraphs: [
          'W pakietach obejmujących obsługę notarialną koszt poświadczenia podpisu właściciela lokalu jest uwzględniony w cenie. Dzięki temu wiesz z góry, ile zapłacisz, bez ukrytych dopłat.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy koszt notariusza jest wliczony w pakiet?',
        a: 'W pakietach przewidujących obsługę notarialną — tak. Zawsze informujemy, co dokładnie obejmuje dany pakiet.',
      },
      {
        q: 'Czy mogę wybrać własnego notariusza?',
        a: 'Tak. Jeśli wolisz skorzystać z własnej kancelarii dla czynności po Twojej stronie, jest to możliwe.',
      },
    ],
  },

  'poswiadczenie-podpisu-a-akt-notarialny': {
    intro:
      'Poświadczenie podpisu i akt notarialny to dwie różne czynności notarialne. Przy najmie okazjonalnym pojawiają się obie — wyjaśniamy, czym się różnią i która jest potrzebna gdzie.',
    sections: [
      {
        heading: 'Poświadczenie podpisu',
        paragraphs: [
          'Notariusz potwierdza, że podpis pod dokumentem złożyła konkretna osoba. Tej formy wymaga oświadczenie właściciela lokalu o zgodzie na zamieszkanie najemcy.',
        ],
      },
      {
        heading: 'Akt notarialny',
        paragraphs: [
          'To dokument urzędowy sporządzony przez notariusza, o szerszej treści i mocy. W najmie okazjonalnym przyjmuje go oświadczenie najemcy o poddaniu się egzekucji.',
        ],
      },
      {
        heading: 'Która forma gdzie',
        bullets: [
          'oświadczenie właściciela lokalu → poświadczenie podpisu,',
          'oświadczenie najemcy o poddaniu się egzekucji → akt notarialny.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy poświadczenie podpisu wystarczy dla całego najmu okazjonalnego?',
        a: 'Nie. Potrzebne są obie czynności — poświadczenie podpisu właściciela oraz akt notarialny z oświadczeniem najemcy.',
      },
      {
        q: 'Która czynność jest droższa?',
        a: 'Zwykle akt notarialny jest bardziej rozbudowany niż samo poświadczenie podpisu.',
      },
    ],
  },

  'jak-wyglada-wizyta-u-notariusza': {
    intro:
      'Pierwsza wizyta u notariusza bywa stresująca, choć nie ma powodu do obaw. Pokazujemy, jak przebiega i jak się do niej przygotować.',
    sections: [
      {
        heading: 'Przed wizytą',
        bullets: [
          'umów termin z wyprzedzeniem,',
          'przygotuj dokument tożsamości,',
          'miej przy sobie dane potrzebne do oświadczenia.',
        ],
      },
      {
        heading: 'W trakcie',
        paragraphs: [
          'Notariusz sprawdza tożsamość, omawia treść dokumentu i upewnia się, że rozumiesz jego znaczenie. Następnie sporządza akt lub poświadcza podpis. Całość zwykle trwa kilkanaście–kilkadziesiąt minut.',
        ],
      },
      {
        heading: 'Po wizycie',
        paragraphs: [
          'Otrzymujesz dokument w wymaganej formie. Ten egzemplarz dołączasz następnie do kompletu dokumentów najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ile trwa wizyta?',
        a: 'Zazwyczaj od kilkunastu do kilkudziesięciu minut, w zależności od czynności.',
      },
      {
        q: 'Co zabrać ze sobą?',
        a: 'Przede wszystkim dokument tożsamości oraz dane potrzebne do sporządzenia oświadczenia.',
      },
    ],
  },

  'czy-mozna-zalatwic-notariusza-zdalnie': {
    intro:
      'Czy formalności notarialne przy najmie okazjonalnym da się załatwić bez wychodzenia z domu? Wyjaśniamy, co można zorganizować zdalnie, a co wymaga osobistej obecności.',
    sections: [
      {
        heading: 'Co organizujemy zdalnie',
        paragraphs: [
          'Poświadczenie podpisu właściciela lokalu zastępczego — którego zapewniamy — organizujemy w ramach usługi, bez Twojego udziału. Komplet dokumentów wysyłamy tam, gdzie ich potrzebujesz.',
        ],
      },
      {
        heading: 'Co po stronie najemcy',
        paragraphs: [
          'Oświadczenie najemcy o poddaniu się egzekucji wymaga formy aktu notarialnego, co zwykle wiąże się z wizytą najemcy u notariusza. Jeśli to konieczne, pomożemy zaplanować ten krok wygodnie.',
        ],
      },
      {
        heading: 'Maksymalnie wygodnie',
        bullets: [
          'zamówienie i kontakt — w pełni online,',
          'oświadczenie właściciela lokalu i poświadczenie — po naszej stronie,',
          'czynności wymagające najemcy — ograniczone do minimum.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę całość załatwić bez wychodzenia z domu?',
        a: 'Część po naszej stronie realizujemy zdalnie. Oświadczenie najemcy może wymagać wizyty u notariusza — uprzedzimy o tym i pomożemy to zorganizować.',
      },
      {
        q: 'Czy dokumenty dostanę pocztą?',
        a: 'Tak, gotowy komplet wysyłamy pocztą lub kurierem na wskazany adres.',
      },
    ],
  },

  'ustawa-o-ochronie-praw-lokatorow': {
    intro:
      'Najem okazjonalny opiera się na ustawie o ochronie praw lokatorów. Przedstawiamy najważniejsze zasady, które z niej wynikają — bez prawniczego żargonu.',
    sections: [
      {
        heading: 'Czego dotyczy ustawa',
        paragraphs: [
          'Ustawa z dnia 21 czerwca 2001 r. o ochronie praw lokatorów reguluje zasady najmu lokali mieszkalnych, w tym szczególną formę, jaką jest najem okazjonalny. Określa prawa i obowiązki stron oraz wymogi formalne umowy.',
        ],
      },
      {
        heading: 'Kluczowe zasady najmu okazjonalnego',
        bullets: [
          'wymóg oświadczenia najemcy o poddaniu się egzekucji,',
          'wskazanie lokalu zastępczego i zgoda jego właściciela,',
          'brak wymogu pokrewieństwa z właścicielem wskazanego lokalu,',
          'zgłoszenie umowy do urzędu skarbowego w 14 dni.',
        ],
      },
      {
        heading: 'Po co to wszystko',
        paragraphs: [
          'Celem przepisów jest wyważenie interesów najemcy i właściciela — ochrona lokatora przy jednoczesnym ułatwieniu właścicielowi odzyskania lokalu w razie naruszeń umowy.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy ustawa wymaga, by adres był od rodziny?',
        a: 'Nie. Ustawa nie stawia wymogu pokrewieństwa z właścicielem wskazanego lokalu.',
      },
      {
        q: 'Czy najem okazjonalny pozbawia najemcę ochrony?',
        a: 'Nie. Najemca zachowuje podstawową ochronę; zmienia się głównie procedura zakończenia najmu i opróżnienia lokalu.',
      },
    ],
  },

  'najem-okazjonalny-a-wspolwlasnosc-lokalu': {
    intro:
      'Co zrobić, gdy lokal wskazany w oświadczeniu ma kilku właścicieli? Współwłasność wymaga dodatkowej uwagi przy zgodzie na zamieszkanie. Wyjaśniamy, jak to poprawnie ułożyć.',
    sections: [
      {
        heading: 'Dlaczego współwłasność ma znaczenie',
        paragraphs: [
          'Jeśli lokal zastępczy należy do kilku osób, oświadczenie o zgodzie na zamieszkanie najemcy powinno uwzględniać zgodę uprawnionych współwłaścicieli. Brak tej zgody może podważyć skuteczność dokumentu.',
        ],
      },
      {
        heading: 'Jak to rozwiązać',
        bullets: [
          'ustal, kto jest współwłaścicielem lokalu,',
          'zadbaj o zgodę uprawnionych osób,',
          'poświadcz podpisy notarialnie.',
        ],
      },
      {
        heading: 'Bezpieczniej z gotowym dokumentem',
        paragraphs: [
          'Aby uniknąć błędów, zapewniamy lokal i kompletne, poprawne oświadczenie — także w sytuacjach, gdy wymaga to uwzględnienia współwłasności. Otrzymujesz dokument gotowy do użycia.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy wystarczy zgoda jednego współwłaściciela?',
        a: 'Co do zasady oświadczenie powinno uwzględniać zgodę uprawnionych współwłaścicieli. Dbamy o to, aby dokument był kompletny.',
      },
      {
        q: 'Czy to komplikuje cały najem?',
        a: 'Nie, jeśli dokument przygotuje wyspecjalizowany podmiot. Wówczas kwestia współwłasności jest po prostu uwzględniona.',
      },
    ],
  },

  'co-sie-dzieje-gdy-wlasciciel-lokalu-umrze': {
    intro:
      'Co dzieje się z najmem okazjonalnym, gdy umiera właściciel lokalu wskazanego w oświadczeniu? To rzadka, ale ważna sytuacja. Wyjaśniamy skutki i jak zachować zgodność umowy.',
    sections: [
      {
        heading: 'Skutek śmierci właściciela lokalu',
        paragraphs: [
          'Zgoda właściciela lokalu zastępczego co do zasady wygasa wraz z jego śmiercią. Oznacza to, że dotychczasowe wskazanie adresu może przestać być aktualne.',
        ],
      },
      {
        heading: 'Co należy zrobić',
        bullets: [
          'wskazać nowy lokal zastępczy,',
          'uzyskać nowe oświadczenie właściciela tego lokalu,',
          'poświadczyć podpis notarialnie i zaktualizować dokumenty umowy.',
        ],
      },
      {
        heading: 'Jak pomagamy',
        paragraphs: [
          'W takiej sytuacji przygotujemy zaktualizowany komplet dokumentów — nowy adres i oświadczenie z poświadczeniem notarialnym — abyś nie musiał szukać rozwiązania na własną rękę.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy umowa najmu od razu wygasa?',
        a: 'Sama umowa najmu trwa, ale wskazanie adresu zastępczego trzeba zaktualizować, by zachować pełne zabezpieczenia najmu okazjonalnego.',
      },
      {
        q: 'Jak szybko można zaktualizować dokumenty?',
        a: 'Nowy komplet przygotowujemy zwykle w 24–48 godzin.',
      },
    ],
  },

  'sprzedaz-lokalu-wskazanego-w-oswiadczeniu': {
    intro:
      'Lokal wskazany w oświadczeniu został sprzedany — czy to problem dla Twojego najmu okazjonalnego? Wyjaśniamy konsekwencje i jak zachować ciągłość zabezpieczeń.',
    sections: [
      {
        heading: 'Co zmienia sprzedaż lokalu',
        paragraphs: [
          'Po sprzedaży lokalu zmienia się jego właściciel. Dotychczasowe oświadczenie pochodziło od poprzedniego właściciela, dlatego może wymagać aktualizacji, aby pozostać skuteczne.',
        ],
      },
      {
        heading: 'Możliwe rozwiązania',
        bullets: [
          'uzyskanie nowego oświadczenia od aktualnego właściciela lokalu,',
          'wskazanie innego lokalu zastępczego,',
          'poświadczenie notarialne nowego dokumentu.',
        ],
      },
      {
        heading: 'Spokojnie — zajmiemy się tym',
        paragraphs: [
          'Jeśli dojdzie do takiej sytuacji, przygotujemy nowy komplet dokumentów, dzięki czemu Twoja umowa pozostanie zgodna z wymogami najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy muszę reagować natychmiast?',
        a: 'Warto zaktualizować dokumenty, gdy tylko dowiesz się o zmianie właściciela wskazanego lokalu, aby utrzymać pełne zabezpieczenia.',
      },
      {
        q: 'Czy nowy właściciel musi się zgodzić?',
        a: 'Skuteczne oświadczenie wymaga zgody aktualnego właściciela lokalu. Alternatywnie można wskazać inny lokal.',
      },
    ],
  },

  'wypowiedzenie-zgody-na-adres': {
    intro:
      'Czy właściciel lokalu zastępczego może wycofać zgodę na adres? Wyjaśniamy, jak to wygląda i co zrobić, by Twoja umowa była dalej zabezpieczona.',
    sections: [
      {
        heading: 'Charakter zgody',
        paragraphs: [
          'Oświadczenie właściciela lokalu składane jest na potrzeby konkretnej umowy najmu. Co do zasady pozostaje ono ważne dla tej umowy, jednak w praktyce mogą zdarzyć się sytuacje sporne.',
        ],
      },
      {
        heading: 'Gdyby zgoda przestała być aktualna',
        bullets: [
          'szybko zapewniamy nowe oświadczenie od innego właściciela lokalu,',
          'organizujemy poświadczenie notarialne,',
          'aktualizujemy komplet dokumentów do umowy.',
        ],
      },
      {
        heading: 'Po co działać z wyprzedzeniem',
        paragraphs: [
          'Utrzymanie aktualnego, poprawnego oświadczenia to gwarancja, że Twoja umowa zachowuje pełne zabezpieczenia najmu okazjonalnego. Lepiej zareagować od razu niż w pośpiechu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy właściciel może ot tak cofnąć zgodę?',
        a: 'Oświadczenie składane na potrzeby umowy zasadniczo pozostaje ważne. W razie problemów pomożemy szybko zapewnić nowe.',
      },
      {
        q: 'Co, jeśli zostanę bez ważnego adresu?',
        a: 'Przygotujemy nowy komplet dokumentów, aby Twoja umowa była dalej zabezpieczona.',
      },
    ],
  },

  'zmiana-adresu-w-trakcie-najmu': {
    intro:
      'Twoja sytuacja się zmieniła i chcesz lub musisz zmienić wskazany adres zastępczy w trakcie najmu? Wyjaśniamy, jak to zrobić bez ryzyka dla umowy.',
    sections: [
      {
        heading: 'Kiedy zmienia się adres',
        paragraphs: [
          'Zmiana bywa konieczna np. po sprzedaży lokalu zastępczego, śmierci jego właściciela albo gdy z innych powodów dotychczasowe oświadczenie traci aktualność.',
        ],
      },
      {
        heading: 'Jak przeprowadzić zmianę',
        bullets: [
          'wskazanie nowego lokalu zastępczego,',
          'nowe oświadczenie właściciela tego lokalu,',
          'poświadczenie notarialne i aktualizacja dokumentów umowy.',
        ],
      },
      {
        heading: 'Wsparcie w aktualizacji',
        paragraphs: [
          'Pomagamy przygotować zaktualizowany komplet dokumentów, dzięki czemu zmiana adresu nie zaburza ciągłości zabezpieczeń najmu okazjonalnego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy zmiana adresu unieważnia umowę?',
        a: 'Nie, o ile prawidłowo zaktualizujesz wskazanie adresu i oświadczenie. Wtedy umowa zachowuje swoje zabezpieczenia.',
      },
      {
        q: 'Ile trwa aktualizacja?',
        a: 'Nowy komplet dokumentów przygotowujemy zwykle w 24–48 godzin.',
      },
    ],
  },

  'najem-okazjonalny-a-najem-instytucjonalny': {
    intro:
      'Najem okazjonalny i najem instytucjonalny to dwie formy najmu z dodatkowym zabezpieczeniem. Łatwo je pomylić — wyjaśniamy kluczowe różnice.',
    sections: [
      {
        heading: 'Najem okazjonalny',
        paragraphs: [
          'Przeznaczony dla właścicieli będących osobami fizycznymi, które nie wynajmują w ramach działalności gospodarczej. Wymaga m.in. wskazania lokalu zastępczego i oświadczenia jego właściciela.',
        ],
      },
      {
        heading: 'Najem instytucjonalny',
        paragraphs: [
          'Skierowany do podmiotów prowadzących wynajem w ramach działalności gospodarczej. Również zawiera oświadczenie najemcy o poddaniu się egzekucji, ale co do zasady nie wymaga wskazywania lokalu zastępczego.',
        ],
      },
      {
        heading: 'Którą formę wybrać',
        bullets: [
          'osoba fizyczna wynajmująca prywatnie → najem okazjonalny,',
          'firma/profesjonalny wynajem → najem instytucjonalny.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy jako osoba prywatna mogę zawrzeć najem instytucjonalny?',
        a: 'Najem instytucjonalny jest przeznaczony dla podmiotów prowadzących działalność w zakresie wynajmu. Dla wynajmu prywatnego właściwy jest najem okazjonalny.',
      },
      {
        q: 'Czy obie formy wymagają notariusza?',
        a: 'Tak, obie opierają się na oświadczeniu najemcy w formie aktu notarialnego.',
      },
    ],
  },

  'orzecznictwo-dotyczace-najmu-okazjonalnego': {
    intro:
      'Praktyka sądowa pomaga zrozumieć, jak przepisy o najmie okazjonalnym działają w realnych sporach. Omawiamy ogólne wnioski płynące z orzecznictwa — bez wchodzenia w zawiłości.',
    sections: [
      {
        heading: 'Czego najczęściej dotyczą spory',
        bullets: [
          'kompletności i poprawności wymaganych dokumentów,',
          'skuteczności wskazania lokalu zastępczego,',
          'dochowania terminu zgłoszenia umowy do urzędu skarbowego.',
        ],
      },
      {
        heading: 'Wniosek praktyczny',
        paragraphs: [
          'Najwięcej problemów wynika z braków formalnych — niekompletnych oświadczeń, braku poświadczenia notarialnego czy spóźnionego zgłoszenia. Staranność na etapie dokumentów oszczędza kłopotów później.',
        ],
      },
      {
        heading: 'Jak ograniczyć ryzyko',
        paragraphs: [
          'Powierzenie przygotowania dokumentów wyspecjalizowanemu podmiotowi minimalizuje ryzyko błędów formalnych, które najczęściej bywają przyczyną sporów.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy ten artykuł to porada prawna?',
        a: 'Nie. To ogólne informacje. W indywidualnej sprawie sądowej warto skorzystać z pomocy profesjonalnego pełnomocnika.',
      },
      {
        q: 'Co najczęściej przesądza spory?',
        a: 'Najczęściej kompletność i poprawność dokumentów oraz dochowanie wymaganych terminów.',
      },
    ],
  },

  'najczestsze-bledy-przy-najmie-okazjonalnym': {
    intro:
      'Najem okazjonalny działa tak dobrze, jak dobre są dokumenty. Zebraliśmy najczęstsze błędy, które unieważniają zabezpieczenia umowy — i pokazujemy, jak ich uniknąć.',
    sections: [
      {
        heading: 'Najczęstsze pomyłki',
        bullets: [
          'brak oświadczenia najemcy w formie aktu notarialnego,',
          'brak poświadczenia podpisu właściciela lokalu zastępczego,',
          'niekompletne lub nieprecyzyjne wskazanie adresu,',
          'pominięcie zgody współwłaścicieli lokalu,',
          'spóźnione zgłoszenie umowy do urzędu skarbowego.',
        ],
      },
      {
        heading: 'Dlaczego to groźne',
        paragraphs: [
          'Każdy z tych błędów może sprawić, że umowa straci szczególne zabezpieczenia najmu okazjonalnego i będzie traktowana jak zwykły najem — z trudniejszym odzyskaniem lokalu.',
        ],
      },
      {
        heading: 'Jak ich uniknąć',
        paragraphs: [
          'Najprościej zadbać o komplet dokumentów przygotowany rzetelnie i poświadczony notarialnie. Tym właśnie się zajmujemy, eliminując najczęstsze przyczyny problemów.',
        ],
      },
    ],
    faq: [
      {
        q: 'Który błąd jest najczęstszy?',
        a: 'Braki w dokumentach związanych z adresem zastępczym oraz spóźnione zgłoszenie umowy do urzędu skarbowego.',
      },
      {
        q: 'Czy błąd da się naprawić po podpisaniu umowy?',
        a: 'Część braków można uzupełnić, ale lepiej uniknąć ich od początku, kompletując dokumenty prawidłowo.',
      },
    ],
  },

  'czas-trwania-umowy-najmu-okazjonalnego': {
    intro:
      'Na jak długo zawiera się najem okazjonalny i czy można go przedłużyć? Wyjaśniamy zasady dotyczące czasu trwania tej formy umowy.',
    sections: [
      {
        heading: 'Umowa na czas oznaczony',
        paragraphs: [
          'Najem okazjonalny zawiera się na czas oznaczony. Przepisy określają maksymalny okres, na jaki można zawrzeć taką umowę, dlatego warto ustalić długość najmu już na starcie.',
        ],
      },
      {
        heading: 'Przedłużenie najmu',
        paragraphs: [
          'Po upływie okresu umowy strony mogą zawrzeć kolejną umowę najmu okazjonalnego. Wiąże się to z ponownym skompletowaniem wymaganych dokumentów, w tym aktualnego oświadczenia właściciela lokalu zastępczego.',
        ],
      },
      {
        heading: 'O czym pamiętać przy odnowieniu',
        bullets: [
          'sprawdź, czy wskazany adres jest nadal aktualny,',
          'zadbaj o świeże poświadczenie notarialne,',
          'pamiętaj o ponownym zgłoszeniu umowy do urzędu skarbowego.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy najem okazjonalny może być bezterminowy?',
        a: 'Nie. Zawiera się go na czas oznaczony, z zachowaniem maksymalnego okresu wynikającego z przepisów.',
      },
      {
        q: 'Czy przy przedłużeniu potrzebne są nowe dokumenty?',
        a: 'Tak, zwykle trzeba ponownie skompletować dokumenty. Pomagamy w sprawnym odnowieniu.',
      },
    ],
  },

  'najem-okazjonalny-a-dzialalnosc-gospodarcza': {
    intro:
      'Czy pod adresem wynajmowanego mieszkania można zarejestrować firmę? I czy najem okazjonalny jest dla osób prowadzących działalność? Rozwiewamy wątpliwości.',
    sections: [
      {
        heading: 'Kto może wynajmować w tej formie',
        paragraphs: [
          'Najem okazjonalny jest przeznaczony dla właścicieli będących osobami fizycznymi, które nie wynajmują lokali w ramach działalności gospodarczej. Dla profesjonalnego wynajmu właściwy jest najem instytucjonalny.',
        ],
      },
      {
        heading: 'Rejestracja firmy pod wynajmowanym adresem',
        paragraphs: [
          'To, czy najemca może zarejestrować działalność pod adresem mieszkania, zależy przede wszystkim od zgody właściciela i zapisów umowy. Warto ustalić tę kwestię przed podpisaniem umowy.',
        ],
      },
      {
        heading: 'Praktyczna wskazówka',
        bullets: [
          'omów z wynajmującym możliwość rejestracji firmy,',
          'zapisz ustalenia w umowie,',
          'pamiętaj, że adres firmowy to odrębna kwestia od adresu zastępczego z oświadczenia.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy mogę prowadzić firmę w wynajmowanym mieszkaniu?',
        a: 'Zależy to od zgody właściciela i zapisów umowy. Najlepiej ustalić to wprost przed podpisaniem.',
      },
      {
        q: 'Czy najem okazjonalny jest dla wynajmujących profesjonalnie?',
        a: 'Nie. Dla wynajmu w ramach działalności gospodarczej przewidziano najem instytucjonalny.',
      },
    ],
  },

  'podwyzka-czynszu-w-najmie-okazjonalnym': {
    intro:
      'Czy i kiedy właściciel może podnieść czynsz w trakcie najmu okazjonalnego? Wyjaśniamy zasady, które chronią obie strony przed nieporozumieniami.',
    sections: [
      {
        heading: 'Decyduje treść umowy',
        paragraphs: [
          'Zasady podwyżki czynszu powinny wynikać z umowy. Jeśli umowa przewiduje mechanizm waloryzacji lub warunki podwyżki, obowiązują ustalenia stron z zachowaniem przepisów.',
        ],
      },
      {
        heading: 'Ochrona najemcy',
        paragraphs: [
          'Przepisy o ochronie praw lokatorów ograniczają dowolność podwyżek i przewidują m.in. zachowanie odpowiednich terminów oraz formy. Najemca nie może zostać zaskoczony arbitralną zmianą z dnia na dzień.',
        ],
      },
      {
        heading: 'Co zrobić w razie wątpliwości',
        bullets: [
          'sprawdź zapisy umowy dotyczące czynszu,',
          'poproś o podwyżkę na piśmie wraz z uzasadnieniem terminu,',
          'w razie sporu zachowaj korespondencję.',
        ],
      },
    ],
    faq: [
      {
        q: 'Czy właściciel może podnieść czynsz w dowolnym momencie?',
        a: 'Nie. Podwyżka powinna wynikać z umowy i przepisów, z zachowaniem odpowiednich terminów i formy.',
      },
      {
        q: 'Czy mogę nie zgodzić się na podwyżkę?',
        a: 'Zależy to od umowy i przepisów. W razie wątpliwości warto przeanalizować zapisy umowy i zachować korespondencję.',
      },
    ],
  },
};

export function getArticleContent(slug: string): ArticleContent | undefined {
  return articleContent[slug];
}
