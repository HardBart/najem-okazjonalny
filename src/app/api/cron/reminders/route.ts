import { NextRequest, NextResponse } from 'next/server';
import { StorageService } from '@/lib/storage';
import { sendRenewalReminder } from '@/lib/email';
import { RENEWAL_REMINDER_AFTER_DAYS } from '@/lib/discounts';

/**
 * Cron: przypomnienia powrotne po ~roku od opłaconego zamówienia.
 *
 * Uruchamiane codziennie przez Vercel Cron (patrz vercel.json), który dodaje
 * nagłówek `Authorization: Bearer ${CRON_SECRET}`. Do ręcznego testu można podać
 * `?secret=...` (zgodny z CRON_SECRET).
 *
 * Wysyła e-mail tylko raz na zamówienie (oznaczenie `renewalReminderSentAt`).
 * Jeśli wysyłka się nie powiedzie (np. brak RESEND_API_KEY) — nie oznacza, więc
 * przy kolejnym uruchomieniu spróbuje ponownie.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET || '';
  const authHeader = request.headers.get('authorization') || '';
  const querySecret = request.nextUrl.searchParams.get('secret') || '';

  if (secret && authHeader !== `Bearer ${secret}` && querySecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = await StorageService.getOrders();
    const now = Date.now();
    const thresholdMs = RENEWAL_REMINDER_AFTER_DAYS * 24 * 60 * 60 * 1000;

    const due = orders.filter((o) => {
      if (o.paymentStatus !== 'completed') return false;
      if (o.renewalReminderSentAt) return false;
      const ageMs = now - new Date(o.createdAt).getTime();
      return ageMs >= thresholdMs;
    });

    let sent = 0;
    for (const order of due) {
      const ok = await sendRenewalReminder(order);
      if (ok) {
        await StorageService.updateOrder(order.orderId, {
          renewalReminderSentAt: new Date().toISOString(),
        });
        sent += 1;
      }
    }

    return NextResponse.json({ checked: orders.length, due: due.length, sent });
  } catch (error) {
    console.error('Cron reminders error:', error);
    return NextResponse.json({ error: 'Failed to process reminders' }, { status: 500 });
  }
}
