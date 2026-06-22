import { Order } from '@/types';
import { getPackageById } from './packages';
import { getAddonById } from './addons';
import { company, fullAddress } from './company';
import { LEGAL } from './legal';
import { RENEWAL_DISCOUNT_CODE, getDiscount } from './discounts';

/**
 * Moduł e-mail oparty o Resend (https://resend.com) — wywoływany przez REST API
 * (fetch), bez dodatkowych zależności npm.
 *
 * Konfiguracja (.env):
 *   RESEND_API_KEY  — klucz API z panelu Resend
 *   EMAIL_FROM      — adres nadawcy (np. noreply@najemokazjonalny24.com)
 *   EMAIL_TO        — adres powiadomień dla firmy (kontakt@najemokazjonalny24.com)
 *
 * Jeśli RESEND_API_KEY nie jest ustawiony — funkcje logują treść i kończą się bez
 * błędu (bezpieczne w developmencie; nie blokuje płatności/formularzy).
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@najemokazjonalny24.com';
const EMAIL_TO = process.env.EMAIL_TO || company.email;

function formatPLN(n: number): string {
  return `${n.toLocaleString('pl-PL')} zł`;
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  /** Załączniki Resend: { filename, content (base64) }. */
  attachments?: { filename: string; content: string }[];
}): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log('[email] RESEND_API_KEY nieustawiony — pomijam wysyłkę:', {
      to: opts.to,
      subject: opts.subject,
      attachments: opts.attachments?.map((a) => a.filename),
    });
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Najem Okazjonalny <${EMAIL_FROM}>`,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        ...(opts.attachments ? { attachments: opts.attachments } : {}),
      }),
    });

    if (!res.ok) {
      console.error('[email] Resend błąd:', res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('[email] Wyjątek wysyłki:', error);
    return false;
  }
}

function layout(title: string, inner: string): string {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #243b53;">
    <div style="background:#102a43; padding:20px 24px; border-radius:12px 12px 0 0;">
      <span style="color:#d4af37; font-weight:bold; font-size:18px;">Najem Okazjonalny</span>
    </div>
    <div style="border:1px solid #d9e2ec; border-top:none; padding:24px; border-radius:0 0 12px 12px;">
      <h1 style="font-size:20px; color:#102a43; margin-top:0;">${title}</h1>
      ${inner}
      <hr style="border:none; border-top:1px solid #d9e2ec; margin:24px 0;" />
      <p style="font-size:12px; color:#627d98; line-height:1.6;">
        ${company.legalName} · ${fullAddress}<br/>
        NIP: ${company.nip} · REGON: ${company.regon} · KRS: ${company.krs}<br/>
        ${company.email} · ${company.phone}
      </p>
      <p style="font-size:11px; color:#829ab1; line-height:1.6;">
        Serwis nie świadczy pomocy prawnej. Usługa polega na przygotowaniu kompletu dokumentów do
        najmu okazjonalnego. Klient odpowiada za poprawność danych oraz sposób wykorzystania dokumentów.
      </p>
    </div>
  </div>`;
}

/** Wysyła dokument sprzedaży (faktura/rachunek) jako załącznik PDF do klienta. */
export async function sendInvoiceEmail(
  order: Order,
  doc: { number: string; type: 'faktura' | 'rachunek'; pdf: Buffer }
): Promise<boolean> {
  const label = doc.type === 'faktura' ? 'Faktura' : 'Rachunek';
  const filename = `${doc.type}-${doc.number.replace(/[ /]/g, '_')}.pdf`;
  const inner = `
    <p>Dzień dobry,</p>
    <p>w załączniku przesyłamy <strong>${label.toLowerCase()} ${doc.number}</strong> do zamówienia
      <strong>${order.orderId}</strong>.</p>
    <p>Dokument wystawiony elektronicznie, nie wymaga podpisu.</p>`;
  return sendEmail({
    to: order.personalData.email,
    subject: `${label} ${doc.number} — Najem Okazjonalny`,
    html: layout(`${label} ${doc.number}`, inner),
    attachments: [{ filename, content: doc.pdf.toString('base64') }],
  });
}

function deliveryHtml(order: Order): string {
  const d = order.delivery;
  if (!d) return '';
  let line = '';
  if (d.method === 'paczkomat') {
    line = `Paczkomat InPost: <strong>${d.pointCode || '—'}</strong>${d.pointAddress ? ` (${d.pointAddress})` : ''}`;
  } else if (d.method === 'kurier') {
    line = `Kurier: ${d.recipientName || ''}, ${d.street || ''}, ${d.postalCode || ''} ${d.city || ''}`;
  } else {
    line = 'Elektronicznie (na adres e-mail)';
  }
  return `<p style="line-height:1.7;"><strong>Dostawa:</strong> ${line}</p>`;
}

function orderItemsHtml(order: Order): string {
  const pkg = getPackageById(order.package);
  const rows: string[] = [];
  if (pkg) rows.push(`<li>Pakiet ${pkg.name} — ${formatPLN(pkg.price)}</li>`);
  (order.addons || []).forEach((id) => {
    const a = getAddonById(id);
    if (a) rows.push(`<li>${a.name} — ${formatPLN(a.price)}</li>`);
  });
  return `<ul style="padding-left:18px; line-height:1.7;">${rows.join('')}</ul>`;
}

const EXPRESS_PACKAGES = ['premium', 'vip'];

/** Czy zamówienie ma priorytet ekspresowy (pakiet lub dodatek „ekspres"). */
function isExpressOrder(order: Order): boolean {
  return EXPRESS_PACKAGES.includes(order.package) || (order.addons || []).includes('ekspres');
}

/** Blok terminu realizacji (SLA przygotowania + orientacyjna data) — mail wewnętrzny. */
function slaBlockHtml(order: Order): string {
  const express = isExpressOrder(order);
  const hours = express ? 24 : order.package === 'basic' ? 72 : 48;
  const due = new Date(Date.now() + hours * 3600 * 1000);
  const label = express
    ? 'EKSPRES — do 24 h, priorytet (poza kolejnością)'
    : order.package === 'basic'
    ? '2–3 dni robocze'
    : '24–48 h';
  const bg = express ? '#fdecec' : '#faf4e7';
  const border = express ? '#f3b4b4' : '#efdca7';
  return `
    <div style="background:${bg}; border:1px solid ${border}; border-radius:12px; padding:14px 18px; margin:0 0 18px;">
      <p style="margin:0; font-size:13px; color:#627d98;">Termin realizacji (przygotowanie dokumentów, bez wysyłki):</p>
      <p style="margin:6px 0 0; font-size:16px;"><strong>${label}</strong></p>
      <p style="margin:6px 0 0; font-size:13px; color:#486581;">Orientacyjnie do: <strong>${due.toLocaleString('pl-PL')}</strong> (licząc w dni robocze).</p>
    </div>`;
}

/** Lista dokumentów/zadań do przygotowania dla zamówienia (wewnętrzne „to do"). */
function deliverablesHtml(order: Order): string {
  const items: string[] = [
    'Oświadczenie właściciela lokalu o zgodzie na zamieszkanie najemcy wraz ze wskazaniem adresu.',
  ];
  if (order.package === 'basic') {
    items.push('Podpis właściciela lokalu: <strong>profil zaufany</strong> (BEZ notariusza).');
  } else {
    items.push('<strong>Notarialne poświadczenie</strong> podpisu właściciela lokalu — organizacja u notariusza.');
  }
  if (order.package === 'vip') {
    items.push('Poddanie się egzekucji z <strong>art. 777 k.p.c.</strong> u notariusza — ustalić termin wizyty z klientem.');
  }
  const addons = order.addons || [];
  if (addons.includes('pakiet-bezpieczny-najem')) {
    items.push('Wysłać <strong>Pakiet „Bezpieczny Najem"</strong>: wzory (umowa najmu, protokół zdawczo-odbiorczy, instrukcja zgłoszenia do US).');
  }
  if (addons.includes('dodatkowe-egzemplarze')) {
    items.push('Przygotować <strong>dodatkowy papierowy komplet</strong> poświadczonych dokumentów.');
  }
  return `<ul style="padding-left:18px; line-height:1.8;">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

/** Dane do faktury (jeśli klient ją zaznaczył) — mail wewnętrzny. */
function invoiceDetailsHtml(order: Order): string {
  const inv = order.invoice;
  if (!inv?.wantInvoice) return '';
  const who =
    inv.buyerType === 'company'
      ? `${inv.companyName || '—'}, NIP: ${inv.nip || '—'}`
      : `${inv.buyerName || '—'}`;
  return `<p style="line-height:1.7;"><strong>Dane do faktury:</strong> ${who}${inv.address ? `, ${inv.address}` : ''}</p>`;
}

/**
 * Buduje treść wewnętrznego powiadomienia o opłaconym zamówieniu (do firmy):
 * termin realizacji, pełne dane klienta, lista dokumentów do przygotowania, zakres.
 * Eksportowane, by można było podejrzeć render (np. dev-route).
 */
export function buildOrderAdminHtml(order: Order): string {
  const pesel = order.personalData.pesel?.trim();
  const peselNote =
    order.package !== 'basic' && !pesel
      ? ' <span style="color:#bb4444;">(brak — dopytać, jeśli wymagany do dokumentu/notariusza)</span>'
      : '';
  return layout(
    'Nowe opłacone zamówienie — do realizacji',
    `
    ${slaBlockHtml(order)}
    <p style="line-height:1.8;">
      <strong>Nr zamówienia:</strong> ${order.orderId}<br/>
      <strong>Data płatności:</strong> ${new Date().toLocaleString('pl-PL')}<br/>
      <strong>Kwota:</strong> ${formatPLN(order.amount)}<br/>
      <strong>Pakiet:</strong> ${getPackageById(order.package)?.name || order.package}
    </p>
    <p style="margin:18px 0 6px; font-weight:bold; color:#102a43;">Klient</p>
    <p style="line-height:1.8;">
      <strong>Imię i nazwisko:</strong> ${order.personalData.firstName} ${order.personalData.lastName}<br/>
      <strong>E-mail:</strong> ${order.personalData.email}<br/>
      <strong>Telefon:</strong> ${order.personalData.phone}<br/>
      <strong>PESEL:</strong> ${pesel || '—'}${peselNote}<br/>
      <strong>Obecny adres:</strong> ${order.rentalData?.currentAddress || '—'}<br/>
      <strong>Cel najmu:</strong> ${order.rentalData?.rentalPurpose || '—'}
    </p>
    ${invoiceDetailsHtml(order)}
    <p style="margin:18px 0 6px; font-weight:bold; color:#102a43;">Do przygotowania</p>
    ${deliverablesHtml(order)}
    <p style="margin:18px 0 6px; font-weight:bold; color:#102a43;">Zamówiony zakres</p>
    ${orderItemsHtml(order)}
    ${deliveryHtml(order)}
    `
  );
}

/**
 * Potwierdzenie zamówienia na TRWAŁYM NOŚNIKU (po zaksięgowaniu płatności).
 * Zawiera: ID, datę, zakres, kwotę, wersję regulaminu, potwierdzenie zgód, disclaimer.
 */
export async function sendOrderConfirmation(order: Order): Promise<void> {
  const date = new Date(order.createdAt).toLocaleString('pl-PL');

  const clientHtml = layout(
    'Potwierdzenie zamówienia',
    `
    <p>Dziękujemy za zamówienie. Potwierdzamy zawarcie umowy oraz przyjęcie płatności.</p>
    <p style="line-height:1.8;">
      <strong>Numer zamówienia:</strong> ${order.orderId}<br/>
      <strong>Data:</strong> ${date}<br/>
      <strong>Kwota:</strong> ${formatPLN(order.amount)}
    </p>
    <p><strong>Zakres zamówienia:</strong></p>
    ${orderItemsHtml(order)}
    ${deliveryHtml(order)}
    <p style="font-size:13px; color:#486581; line-height:1.7;">
      Zaakceptowany regulamin: wersja ${order.regulaminVersion || LEGAL.regulaminVersion}.<br/>
      Wyrażone zgody: akceptacja regulaminu i polityki prywatności${
        order.consents?.immediateService
          ? ', żądanie natychmiastowego wykonania usługi i przyjęcie do wiadomości utraty prawa odstąpienia po jej wykonaniu'
          : ''
      }.
    </p>
    <p>Skontaktujemy się z Tobą w sprawie realizacji. W razie pytań dotyczących zamówienia odpisz na tę wiadomość.</p>
    `
  );

  const adminHtml = buildOrderAdminHtml(order);

  await Promise.all([
    sendEmail({
      to: order.personalData.email,
      subject: `Potwierdzenie zamówienia ${order.orderId} — Najem Okazjonalny`,
      html: clientHtml,
    }),
    sendEmail({
      to: EMAIL_TO,
      subject: `Nowe zamówienie ${order.orderId} (${formatPLN(order.amount)})`,
      html: adminHtml,
      replyTo: order.personalData.email,
    }),
  ]);
}

/**
 * Przypomnienie po ~roku (kampania powrotna) + kod rabatowy na ponowne zamówienie.
 * Wysyłane przez cron (`/api/cron/reminders`).
 */
export async function sendRenewalReminder(order: Order): Promise<boolean> {
  const discount = getDiscount(RENEWAL_DISCOUNT_CODE);
  const percent = discount?.percent ?? 15;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${company.domain}`;
  const orderLink = `${appUrl}/zamowienie?kod=${RENEWAL_DISCOUNT_CODE}`;

  const html = layout(
    'Czas odnowić najem okazjonalny?',
    `
    <p>Dzień dobry${order.personalData.firstName ? ' ' + order.personalData.firstName : ''},</p>
    <p>
      Około rok temu pomogliśmy Ci skompletować dokumenty do najmu okazjonalnego. Umowy tego typu
      często zawierane są na rok — jeśli przedłużasz najem lub potrzebujesz dokumentów do nowej
      umowy, chętnie pomożemy ponownie.
    </p>
    <div style="background:#faf4e7; border:1px solid #efdca7; border-radius:12px; padding:16px 20px; margin:18px 0;">
      <p style="margin:0; font-size:15px;">
        Jako nasz klient otrzymujesz <strong>${percent}% zniżki</strong> na kolejne zamówienie.
      </p>
      <p style="margin:8px 0 0;">
        Kod: <strong style="font-size:18px; color:#102a43;">${RENEWAL_DISCOUNT_CODE}</strong>
      </p>
    </div>
    <p style="text-align:center; margin:24px 0;">
      <a href="${orderLink}" style="display:inline-block; background:#d4af37; color:#102a43; font-weight:bold; text-decoration:none; padding:14px 28px; border-radius:8px;">
        Zamów ze zniżką
      </a>
    </p>
    <p style="font-size:13px; color:#627d98;">
      Kod wpisujesz w koszyku podczas składania zamówienia online.
    </p>
    `
  );

  return sendEmail({
    to: order.personalData.email,
    subject: `Twoja zniżka ${percent}% na najem okazjonalny — Najem Okazjonalny`,
    html,
  });
}

/** Powiadomienie do firmy o wiadomości z formularza kontaktowego / wyceny. */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<void> {
  const html = layout(
    'Nowa wiadomość z formularza',
    `
    <p style="line-height:1.8;">
      <strong>Imię i nazwisko:</strong> ${data.name}<br/>
      <strong>E-mail:</strong> ${data.email}<br/>
      <strong>Telefon:</strong> ${data.phone || '—'}
    </p>
    <p><strong>Treść:</strong></p>
    <p style="white-space:pre-wrap; line-height:1.7;">${data.message}</p>
    `
  );

  await sendEmail({
    to: EMAIL_TO,
    subject: `Nowa wiadomość od ${data.name}`,
    html,
    replyTo: data.email,
  });
}
