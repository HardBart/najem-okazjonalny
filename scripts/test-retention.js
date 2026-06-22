/* eslint-disable */
/**
 * Test polityki retencji (RODO) przez endpoint /api/cron/retention.
 * Sieje zamówienia w różnym wieku, uruchamia crona, sprawdza efekty, sprząta.
 * Wymaga uruchomionego serwera dev (port 3000).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORDERS_FILE = path.join(ROOT, 'data', 'orders.json');
const BASE = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

function readEnv(key) {
  try {
    const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
    const m = env.match(new RegExp('^' + key + '=(.*)$', 'm'));
    return m ? m[1].trim() : '';
  } catch { return ''; }
}
const SECRET = readEnv('CRON_SECRET');

const DAY = 24 * 3600 * 1000;
const iso = (msAgo) => new Date(Date.now() - msAgo).toISOString();

function order(id, ageMs, extra = {}) {
  return {
    id: id, orderId: id, package: 'standard', addons: [],
    personalData: { firstName: 'Jan', lastName: 'Testowy', email: 'test@example.com', phone: '+48500600700', pesel: '12345678901' },
    rentalData: { currentAddress: 'ul. Testowa 1, 10-001 Olsztyn', rentalPurpose: 'mieszkaniowy' },
    delivery: { method: 'paczkomat', pointCode: 'OLS01', pointAddress: 'Olsztyn' },
    paymentStatus: 'completed', orderStatus: 'in_progress', amount: 389,
    createdAt: iso(ageMs), updatedAt: iso(ageMs),
    invoice: { wantInvoice: false }, consents: { terms: true, privacy: true, marketing: false },
    ...extra,
  };
}

function readOrders() { try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); } catch { return []; } }
function writeOrders(o) { fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true }); fs.writeFileSync(ORDERS_FILE, JSON.stringify(o, null, 2)); }

async function callCron() {
  const url = `${BASE}/api/cron/retention${SECRET ? `?secret=${encodeURIComponent(SECRET)}` : ''}`;
  for (let i = 0; i < 30; i++) {
    try { const r = await fetch(url); if (r.status) return { status: r.status, json: await r.json().catch(() => null) }; } catch {}
    await new Promise((res) => { const t = setTimeout(res, 1500); if (t.unref) t.unref(); });
  }
  return { status: 0 };
}

const results = [];
const check = (n, c, d) => { results.push(c); console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`); };

(async () => {
  const A = 'RET-A', B = 'RET-B', C = 'RET-C', D = 'RET-D', E = 'RET-E';
  writeOrders([
    order(A, 1 * DAY),                                   // świeże — PESEL zostaje
    order(B, 40 * DAY),                                  // >30 dni — PESEL kasowany
    order(C, 800 * DAY),                                 // >2 lata — minimalizacja
    order(D, 6 * 365 * DAY),                             // >5 lat — pełna anonimizacja
    order(E, 40 * DAY, { paymentStatus: 'pending' }),    // nieopłacone — bez zmian
  ]);

  const r1 = await callCron();
  check('Cron odpowiada 200', r1.status === 200, `status=${r1.status}`);
  const o = Object.fromEntries(readOrders().map((x) => [x.orderId, x]));

  check('A: świeże — PESEL zachowany', o[A].personalData.pesel === '12345678901' && !o[A].peselDeletedAt);
  check('B: >30 dni — PESEL skasowany', o[B].personalData.pesel === '' && !!o[B].peselDeletedAt, `peselDeletedAt=${o[B].peselDeletedAt}`);
  check('B: dane realizacyjne nietknięte', o[B].personalData.phone === '+48500600700' && o[B].rentalData.currentAddress !== '');
  check('C: >2 lata — minimalizacja (telefon/adres puste)', o[C].personalData.phone === '' && o[C].rentalData.currentAddress === '' && !!o[C].dataMinimizedAt);
  check('C: kwota/typ dostawy zachowane (księgowość)', o[C].amount === 389 && o[C].delivery.method === 'paczkomat' && !o[C].delivery.pointCode);
  check('D: >5 lat — pełna anonimizacja (imię/e-mail puste)', o[D].personalData.firstName === '' && o[D].personalData.email === '' && !!o[D].fullyAnonymizedAt);
  check('E: nieopłacone — bez zmian', o[E].personalData.pesel === '12345678901' && !o[E].peselDeletedAt);

  // Idempotencja — drugi przebieg nic nie zmienia
  const r2 = await callCron();
  check('Idempotencja — drugi przebieg changed=0', r2.json && r2.json.changed === 0, `changed=${r2.json && r2.json.changed}`);

  // Sprzątanie
  writeOrders(readOrders().filter((x) => !['RET-A', 'RET-B', 'RET-C', 'RET-D', 'RET-E'].includes(x.orderId)));

  const failed = results.filter((x) => !x).length;
  console.log(`\n=== ${results.length - failed}/${results.length} PASS ===`);
  process.exit(failed ? 1 : 0);
})();
