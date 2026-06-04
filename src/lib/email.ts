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
}): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log('[email] RESEND_API_KEY nieustawiony — pomijam wysyłkę:', {
      to: opts.to,
      subject: opts.subject,
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

  const adminHtml = layout(
    'Nowe opłacone zamówienie',
    `
    <p style="line-height:1.8;">
      <strong>Nr:</strong> ${order.orderId}<br/>
      <strong>Kwota:</strong> ${formatPLN(order.amount)}<br/>
      <strong>Klient:</strong> ${order.personalData.firstName} ${order.personalData.lastName}<br/>
      <strong>E-mail:</strong> ${order.personalData.email}<br/>
      <strong>Telefon:</strong> ${order.personalData.phone}<br/>
      <strong>Miasto adresu:</strong> ${order.rentalData.desiredCity}
    </p>
    <p><strong>Zakres:</strong></p>
    ${orderItemsHtml(order)}
    ${deliveryHtml(order)}
    `
  );

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
