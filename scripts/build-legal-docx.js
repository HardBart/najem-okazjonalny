/* eslint-disable */
// Generuje pliki Word (PL) z aktualnej treści polityki prywatności i regulaminu.
// Treść = wiążąca wersja polska (mirror legal.privacy / legal.terms z messages.ts).
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat, HeadingLevel,
} = require('docx');

// Wersje i datę czytamy z legal.ts, by Wordy nigdy nie rozjechały się ze stroną.
const legalSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'legal.ts'), 'utf8');
const pick = (key, fallback) => {
  const m = legalSrc.match(new RegExp(key + ":\\s*'([^']+)'"));
  return m ? m[1] : fallback;
};

const TOKENS = {
  legalName: 'ZoFiHel Rental Sp. z o.o.',
  fullAddress: 'ul. Dworcowa 18/45, 10-436 Olsztyn',
  nip: '739-399-72-40',
  regon: '527952735',
  krs: '0001091757',
  email: 'kontakt@najemokazjonalny24.com',
  domain: 'najemokazjonalny24.com',
  payment: pick('paymentProvider', 'Przelewy24 (PayPro S.A.)'),
  date: pick('effectiveDate', '21 czerwca 2026'),
  version: pick('politykaVersion', 'v3_2026-06-21'),
  versionTerms: pick('regulaminVersion', 'v3_2026-06-21'),
};
const subst = (s) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => (TOKENS[k] != null ? TOKENS[k] : `{{${k}}}`));

// Parsuje **pogrubienie** i [etykieta](link) -> TextRun[]
function inline(raw) {
  const text = subst(raw);
  const runs = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) runs.push(new TextRun(text.slice(last, m.index)));
    if (m[1] !== undefined) runs.push(new TextRun({ text: m[1], bold: true }));
    else runs.push(new TextRun(m[2])); // link -> sam tekst etykiety
    last = re.lastIndex;
  }
  if (last < text.length) runs.push(new TextRun(text.slice(last)));
  return runs;
}

function blocksToParas(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.t === 'h3') {
      out.push(new Paragraph({ spacing: { before: 160, after: 80 }, children: [new TextRun({ text: subst(b.text), bold: true, size: 24 })] }));
    } else if (b.t === 'ul') {
      for (const it of b.items) out.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 40 }, children: inline(it) }));
    } else if (b.t === 'note') {
      const lines = subst(b.text).split('\n');
      lines.forEach((ln) => out.push(new Paragraph({ spacing: { after: 0 }, children: inline(ln) })));
    } else {
      out.push(new Paragraph({ spacing: { after: 100 }, children: inline(b.text) }));
    }
  }
  return out;
}

function buildDoc(doc) {
  const children = [];
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: doc.title })] }));
  children.push(new Paragraph({ spacing: { after: 240 }, children: [new TextRun({ text: subst(doc.meta), italics: true, size: 18, color: '666666' })] }));
  if (doc.notice) children.push(new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: subst(doc.notice), italics: true, size: 18, color: '666666' })] }));
  if (doc.highlight) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(doc.highlight.h)] }));
    for (const it of doc.highlight.items) children.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 40 }, children: inline(it) }));
    children.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
  }
  for (const sec of doc.sections) {
    if (sec.h) children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: inline(sec.h) }));
    for (const p of blocksToParas(sec.blocks)) children.push(p);
  }
  return children;
}

function makeDocument(doc, footerNote) {
  return new Document({
    styles: {
      default: { document: { run: { font: 'Arial', size: 22 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 36, bold: true, font: 'Arial', color: '1F3A5F' },
          paragraph: { spacing: { before: 0, after: 120 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 28, bold: true, font: 'Arial', color: '1F3A5F' },
          paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } },
      ],
    },
    numbering: {
      config: [
        { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      ],
    },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children: buildDoc(doc),
    }],
  });
}

// ---- DANE (PL) ----
const privacy = require('./legal-data-pl').privacy;
const terms = require('./legal-data-pl').terms;

const outDir = path.join(__dirname, '..', 'dokumenty-prawne');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const [doc, file] of [[privacy, 'Polityka-prywatnosci_ZoFiHel.docx'], [terms, 'Regulamin_ZoFiHel.docx']]) {
    const buf = await Packer.toBuffer(makeDocument(doc));
    fs.writeFileSync(path.join(outDir, file), buf);
    console.log('zapisano:', path.join('dokumenty-prawne', file));
  }
})();
