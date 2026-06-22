/* eslint-disable */
// Generuje krótki opis serwisu dla prawnika (kontekst do oceny polityki i regulaminu).
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat, HeadingLevel } = require('docx');

const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const P = (runs, opts = {}) => new Paragraph({ spacing: { after: 100 }, children: Array.isArray(runs) ? runs : [new TextRun(runs)], ...opts });
const LI = (t) => new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 40 }, children: typeof t === 'string' ? [new TextRun(t)] : t });
const b = (t) => new TextRun({ text: t, bold: true });
const r = (t) => new TextRun(t);

// Wersje czytamy z legal.ts, by opis nie rozjechał się ze stroną.
const legalSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'legal.ts'), 'utf8');
const legalPick = (key, fb) => { const m = legalSrc.match(new RegExp(key + ":\\s*'([^']+)'")); return m ? m[1] : fb; };
const REG_V = legalPick('regulaminVersion', 'v4_2026-06-21');
const POL_V = legalPick('politykaVersion', 'v3_2026-06-21');

const children = [
  H1('Opis serwisu — kontekst dla weryfikacji prawnej'),
  P([r('Dokument pomocniczy do oceny '), b('Polityki Prywatności'), r(' oraz '), b('Regulaminu świadczenia usług'), r('. Opisuje, czym jest serwis i jak faktycznie działa, aby ocena dokumentów odbywała się w realnym kontekście.')], { spacing: { after: 240 } }),

  H2('1. Podmiot i serwis'),
  LI([b('Usługodawca: '), r('ZoFiHel Rental Sp. z o.o., ul. Dworcowa 18/45, 10-436 Olsztyn, NIP 739-399-72-40, REGON 527952735, KRS 0001091757.')]),
  LI([b('Serwis: '), r('najemokazjonalny24.com — sprzedaż online usługi przygotowania dokumentów wskazanych w wybranym pakiecie, służących zawarciu umowy najmu okazjonalnego.')]),
  LI([b('Status: '), r('serwis przed startem („w budowie"); dokumenty mają obowiązywać od uruchomienia sprzedaży.')]),
  LI([b('Języki: '), r('strona w trzech wersjach (polska, angielska, ukraińska). Wiążąca jest wersja polska dokumentów; tłumaczenia mają charakter pomocniczy i zawierają stosowną adnotację.')]),

  H2('2. Na czym polega usługa'),
  P('Klient (najczęściej najemca, który nie ma w Polsce rodziny ani znajomych mogących wskazać adres) zamawia online dokumenty potrzebne do zawarcia umowy najmu okazjonalnego. Na podstawie danych podanych przez klienta serwis przygotowuje:'),
  LI('oświadczenie właściciela lokalu (osoby trzeciej) o wyrażeniu zgody na zamieszkanie najemcy we wskazanym lokalu — wraz ze wskazaniem adresu wymaganym przez ustawę,'),
  LI('w wybranych pakietach — zapewnienie poświadczenia notarialnego podpisu właściciela lokalu.'),
  P([b('Zakres: '), r('serwis NIE przygotowuje samej umowy najmu okazjonalnego — dostarcza oświadczenie właściciela lokalu (adres do najmu) i, w wybranych pakietach, poświadczenie notarialne podpisu. Umowę zawierają między sobą wynajmujący i najemca.')]),
  P([b('Istotne: '), r('poświadczenie notarialne NIE wchodzi w skład pakietu podstawowego (Basic) — jest tylko w pakietach, które wprost je obejmują. W dokumentach jest to ujęte warunkowo.')]),
  P([b('Charakter: '), r('usługa jednorazowa, odpłatna; nie jest pomocą prawną ani doradztwem prawnym i nie obejmuje reprezentacji klienta. Serwis nie weryfikuje poprawności danych podanych przez klienta i nie monitoruje jego terminów (np. 14-dniowego zgłoszenia najmu do US).')]),

  H2('3. Pakiety, ceny, dostawa'),
  LI('Pakiety: Basic, Standard, Premium, VIP — różnią się zakresem (m.in. obecnością obsługi notarialnej) i czasem realizacji; dodatki płatne (m.in. pakiet „Bezpieczny Najem", dodatkowe egzemplarze, opcja ekspresowa).'),
  LI('Ceny brutto, prezentowane przed zamówieniem.'),
  LI('Czas realizacji zwykle 24–48 h (ekspres: ten sam lub następny dzień roboczy) — liczony od zaksięgowania płatności i kompletu danych; NIE obejmuje czasu wysyłki.'),
  LI('Dostawa: elektronicznie, paczkomatem InPost lub kurierem (dopłata). Wysyłkę przesyłek realizuje InPost.'),

  H2('4. Płatności i dokumenty sprzedaży'),
  LI('Płatności: Przelewy24 (PayPro S.A.) — jednorazowe, bez subskrypcji (BLIK, przelewy, karty, Apple/Google Pay).'),
  LI([b('VAT: '), r('usługodawca korzysta ze zwolnienia podmiotowego (art. 113 ust. 1 ustawy o VAT, stawka „zw."); po przekroczeniu rocznego limitu (240 000 zł) — przejście na 23%. Wymaga potwierdzenia z księgowością.')]),
  LI('Po opłaceniu automatycznie wystawiany jest dokument sprzedaży (faktura lub rachunek, osobne serie numeracji) i wysyłany do klienta e-mailem w PDF.'),

  H2('5. Dane osobowe (zakres i obieg)'),
  LI('Zbierane: imię i nazwisko, e-mail, telefon, obecny adres, cel najmu; dane do faktury (firma + NIP albo nabywca + adres); dane do dostawy (kod paczkomatu albo adres kuriera).'),
  LI([b('PESEL: '), r('zbierany warunkowo — tylko gdy niezbędny do dokumentu (pakiet z obsługą notarialną); usuwany po realizacji.')]),
  LI('Odbiorcy/procesorzy: Przelewy24 (odrębny administrator), notariusze/kancelarie, InPost, dostawca e-mail Resend, hosting.'),
  LI([b('Transfer poza EOG: '), r('wysyłka e-maili (w tym dokumentów w załączniku) odbywa się przez Resend, Inc. (USA) — ujawnione w polityce, podstawa: SCC + Data Privacy Framework.')]),
  LI('Retencja: dokumenty sprzedaży do 5 lat (obowiązki podatkowe), e-mail do przypomnienia po ~roku, PESEL usuwany po realizacji, logi do 30 dni.'),

  H2('6. Punkty, na które prosimy zwrócić szczególną uwagę'),
  LI('Utrata prawa odstąpienia konsumenta (art. 38 ust. 1 ustawy o prawach konsumenta) przy pełnym wykonaniu usługi cyfrowej/na żądanie — poprawność zgody i pouczenia.'),
  LI('Warunkowość obsługi notarialnej (tylko wybrane pakiety) — spójność definicji usługi z ofertą.'),
  LI('Status notariusza/InPost/Przelewy24 jako odrębnych administratorów vs procesorów; kompletność umów powierzenia (art. 28 RODO) z Resend i hostingiem.'),
  LI('Transfer danych do USA (Resend) — adekwatność podstawy i opisu.'),
  LI('Zakres i podstawa zbierania PESEL oraz model retencji danych.'),
  LI('Zastrzeżenia dot. braku pomocy prawnej i odpowiedzialności za dane podane przez klienta — czy wystarczające.'),
  LI('Reżim VAT (zwolnienie art. 113 i próg 240 000 zł) — od strony formalnej dokumentów sprzedaży. Do potwierdzenia z księgową/doradcą podatkowym: czy wszystkie elementy usługi (w tym organizacja czynności notarialnych) mieszczą się w zwolnieniu i nie są traktowane jako element usługi prawniczej.'),

  P([r('Wersje dokumentów: regulamin '), b(REG_V), r(', polityka prywatności '), b(POL_V), r('. Treść przekazana do oceny odpowiada wersji opublikowanej na stronie.')], { spacing: { before: 200 } }),
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 34, bold: true, font: 'Arial', color: '1F3A5F' }, paragraph: { spacing: { after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 27, bold: true, font: 'Arial', color: '1F3A5F' }, paragraph: { spacing: { before: 260, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children }],
});

const outDir = path.join(__dirname, '..', 'dokumenty-prawne');
fs.mkdirSync(outDir, { recursive: true });
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(path.join(outDir, 'Opis-serwisu_dla-prawnika.docx'), buf); console.log('zapisano: dokumenty-prawne\\Opis-serwisu_dla-prawnika.docx'); });
