/* eslint-disable */
// Wyodrębnia obiekt `legal` (wersja PL) bezpośrednio z src/lib/i18n/messages.ts,
// aby pliki Word były zawsze zgodne z treścią na stronie.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'i18n', 'messages.ts'), 'utf8');

// Pierwsze wystąpienie "legal: {" znajduje się w bloku PL.
const marker = 'legal: {';
const start = src.indexOf(marker);
if (start === -1) throw new Error('Nie znaleziono bloku legal w messages.ts');

// Dopasowanie nawiasów klamrowych od pierwszego "{" po "legal:".
let i = src.indexOf('{', start);
let depth = 0, end = -1;
let inStr = false, quote = '';
for (; i < src.length; i++) {
  const ch = src[i];
  const prev = src[i - 1];
  if (inStr) {
    if (ch === quote && prev !== '\\') inStr = false;
    continue;
  }
  if (ch === "'" || ch === '"' || ch === '`') { inStr = true; quote = ch; continue; }
  if (ch === '{') depth++;
  else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
}
if (end === -1) throw new Error('Nie udało się dopasować nawiasów bloku legal');

const objText = src.slice(src.indexOf('{', start), end + 1);
// Treść to czysty literał obiektu (stringi, tablice, klucze t/h/blocks) — bezpieczny eval.
const legal = eval('(' + objText + ')');
module.exports = legal;
