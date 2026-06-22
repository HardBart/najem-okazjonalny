/* eslint-disable */
/**
 * Lokalny test webhooka Przelewy24 (/api/przelewy24/notify) BEZ konta sandbox.
 *
 * Jak działa:
 *  - sieje testowe zamówienia w data/orders.json,
 *  - wysyła do webhooka syntetyczne powiadomienia z POPRAWNYM podpisem SHA-384
 *    (liczonym tym samym CRC co serwer, czytanym z .env),
 *  - realną weryfikację po stronie P24 omija mock (P24_MOCK_VERIFY=true, tylko poza produkcją),
 *  - sprawdza scenariusze: happy path, idempotencja, brak zamówienia (404),
 *    błędny podpis (400), niezgodna kwota (400).
 *
 * Wymaga uruchomionego serwera dev (port 3000) z P24_MOCK_VERIFY=true.
 *   node scripts/test-webhook-p24.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const ORDERS_FILE = path.join(ROOT, 'data', 'orders.json');
const REGISTRY_FILE = path.join(ROOT, 'data', 'invoice-registry.json');
const BASE = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

// --- .env (tylko P24_CRC) ---
function readEnv(key) {
  const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
  const m = env.match(new RegExp('^' + key + '=(.*)$', 'm'));
  return m ? m[1].trim() : '';
}
const CRC = readEnv('P24_CRC');

function sha384(payload) {
  return crypto.createHash('sha384').update(JSON.stringify(payload)).digest('hex');
}

// Podpis powiadomienia — kolejność pól MUSI odpowiadać verifyNotificationSignature.
function signNotification(n) {
  return sha384({
    merchantId: n.merchantId,
    posId: n.posId,
    sessionId: n.sessionId,
    amount: n.amount,
    originAmount: n.originAmount,
    currency: n.currency,
    orderId: n.orderId,
    methodId: n.methodId,
    statement: n.statement,
    crc: CRC,
  });
}

function buildNotification({ sessionId, amount }) {
  const n = {
    merchantId: 123456,
    posId: 123456,
    sessionId,
    amount,
    originAmount: amount,
    currency: 'PLN',
    orderId: Math.floor(Math.random() * 1e9),
    methodId: 1,
    statement: 'TEST',
  };
  n.sign = signNotification(n);
  return n;
}

function readOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); } catch { return []; }
}
function writeOrders(orders) {
  fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}
function readRegistry() {
  try { return JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8')); } catch { return null; }
}

// Usuwa wpisy testowe (orderId zaczynające się od TEST-) i przelicza liczniki
// z najwyższych numerów pozostałych dokumentów (zachowuje realną numerację).
function cleanRegistry() {
  let reg;
  try { reg = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8')); } catch { return; }
  if (!reg || !Array.isArray(reg.documents)) return;
  reg.documents = reg.documents.filter((d) => !String(d.orderId).startsWith('TEST-'));
  const counters = {};
  for (const d of reg.documents) {
    const m = String(d.number).match(/^(FV|R)\s+(\d+)\/(\d+)\//);
    if (!m) continue;
    const key = `${m[1]}-${m[3]}`;
    counters[key] = Math.max(counters[key] || 0, parseInt(m[2], 10));
  }
  reg.counters = counters;
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(reg, null, 2));
}

function seedOrder(orderId, amountZl) {
  const now = new Date().toISOString();
  const order = {
    id: Date.now().toString() + Math.floor(Math.random() * 1000),
    orderId,
    package: 'standard',
    addons: [],
    personalData: { firstName: 'Jan', lastName: 'Testowy', email: 'test@example.com', phone: '+48500600700', pesel: '' },
    rentalData: { currentAddress: 'ul. Testowa 1, 10-001 Olsztyn', rentalPurpose: 'mieszkaniowy' },
    delivery: { method: 'email' },
    paymentStatus: 'pending',
    orderStatus: 'new',
    amount: amountZl,
    createdAt: now,
    updatedAt: now,
    invoice: { wantInvoice: false },
    consents: { terms: true, privacy: true, marketing: false, immediateService: true },
  };
  const orders = readOrders();
  writeOrders([...orders.filter((o) => o.orderId !== orderId), order]);
  return order;
}

async function postNotify(body) {
  const res = await fetch(`${BASE}/api/przelewy24/notify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let json = null;
  try { json = await res.json(); } catch {}
  return { status: res.status, json };
}

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`${BASE}/api/przelewy24/notify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      if (r.status) return true; // jakikolwiek HTTP = serwer żyje
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

const results = [];
function check(name, cond, detail) {
  results.push({ name, ok: !!cond, detail });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
}

(async () => {
  if (!CRC) { console.error('Brak P24_CRC w .env'); process.exit(1); }
  console.log('Czekam na serwer dev…');
  if (!(await waitForServer())) { console.error('Serwer dev nie odpowiada na ' + BASE); process.exit(1); }

  const stamp = Date.now();
  const idA = `TEST-A-${stamp}`;
  const idB = `TEST-B-${stamp}`;
  const amountA = 389;
  seedOrder(idA, amountA);
  seedOrder(idB, amountA);

  // 1) Happy path
  const happy = buildNotification({ sessionId: idA, amount: amountA * 100 });
  const r1 = await postNotify(happy);
  check('1. Happy path → HTTP 200 + success', r1.status === 200 && r1.json && r1.json.success === true, `status=${r1.status}`);
  const orderA1 = readOrders().find((o) => o.orderId === idA);
  check('1a. Zamówienie opłacone (completed)', orderA1 && orderA1.paymentStatus === 'completed', `paymentStatus=${orderA1 && orderA1.paymentStatus}`);
  check('1b. Dokument wystawiony (invoiceDoc)', orderA1 && orderA1.invoiceDoc && orderA1.invoiceDoc.number, orderA1 && orderA1.invoiceDoc && `${orderA1.invoiceDoc.type} ${orderA1.invoiceDoc.number}`);
  check('1c. p24TransactionId zapisany', orderA1 && !!orderA1.p24TransactionId, `p24=${orderA1 && orderA1.p24TransactionId}`);
  const firstNumber = orderA1 && orderA1.invoiceDoc && orderA1.invoiceDoc.number;

  // 2) Idempotencja — ponowny webhook nie tworzy nowego numeru
  const reg1 = readRegistry();
  const r2 = await postNotify(happy);
  const orderA2 = readOrders().find((o) => o.orderId === idA);
  const reg2 = readRegistry();
  const countFor = (reg) => reg && Array.isArray(reg.documents) ? reg.documents.filter((d) => d.orderId === idA).length : (reg ? JSON.stringify(reg).split(idA).length - 1 : 0);
  check('2. Idempotencja → HTTP 200', r2.status === 200, `status=${r2.status}`);
  check('2a. Numer dokumentu bez zmian', orderA2 && orderA2.invoiceDoc && orderA2.invoiceDoc.number === firstNumber, `${firstNumber} == ${orderA2 && orderA2.invoiceDoc && orderA2.invoiceDoc.number}`);
  check('2b. Rejestr nie urósł dla tego orderId', countFor(reg1) === countFor(reg2), `przed=${countFor(reg1)} po=${countFor(reg2)}`);

  // 3) Brak zamówienia → 404
  const r3 = await postNotify(buildNotification({ sessionId: `NOPE-${stamp}`, amount: amountA * 100 }));
  check('3. Brak zamówienia → HTTP 404', r3.status === 404, `status=${r3.status}`);

  // 4) Błędny podpis → 400
  const bad = buildNotification({ sessionId: idB, amount: amountA * 100 });
  bad.sign = 'deadbeef';
  const r4 = await postNotify(bad);
  check('4. Błędny podpis → HTTP 400', r4.status === 400, `status=${r4.status}`);

  // 5) Niezgodna kwota (poprawny podpis dla złej kwoty) → 400
  const wrongAmt = buildNotification({ sessionId: idB, amount: 99999 });
  const r5 = await postNotify(wrongAmt);
  check('5. Niezgodna kwota → HTTP 400', r5.status === 400, `status=${r5.status}`);

  // Sprzątanie: usuń testowe zamówienia oraz wpisy testowe z rejestru faktur,
  // przeliczając liczniki z pozostałych (realnych) dokumentów — żeby test nie
  // zaburzał numeracji produkcyjnej.
  writeOrders(readOrders().filter((o) => o.orderId !== idA && o.orderId !== idB));
  cleanRegistry();

  const regAfter = readRegistry();
  const leftoverTest = regAfter && Array.isArray(regAfter.documents)
    ? regAfter.documents.filter((d) => String(d.orderId).startsWith('TEST-')).length : 0;
  check('6. Rejestr posprzątany (brak wpisów TEST-*)', leftoverTest === 0, `pozostało=${leftoverTest}`);

  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== ${results.length - failed.length}/${results.length} PASS ===`);
  process.exit(failed.length ? 1 : 0);
})();
