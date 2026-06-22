import { NextRequest, NextResponse } from 'next/server';
import { StorageService } from '@/lib/storage';
import { retentionUpdatesFor } from '@/lib/retention';

/**
 * Cron: realizacja polityki retencji danych (RODO).
 *
 * Przechodzi po opłaconych zamówieniach i stosuje minimalizację:
 *  - kasuje PESEL po realizacji,
 *  - anonimizuje dane realizacyjne po okresie przedawnienia roszczeń,
 *  - pełna anonimizacja po okresie księgowym (5 lat).
 *
 * Chronione `CRON_SECRET` (nagłówek `Authorization: Bearer ...` lub `?secret=`).
 * Na VPS uruchamiać z systemowego crona, np. raz dziennie.
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
    const tally: Record<string, number> = { pesel: 0, minimize: 0, anonymize5y: 0 };
    let changed = 0;

    for (const order of orders) {
      const { updates, actions } = retentionUpdatesFor(order, now);
      if (Object.keys(updates).length === 0) continue;
      await StorageService.updateOrder(order.orderId, updates);
      changed += 1;
      for (const a of actions) tally[a] = (tally[a] || 0) + 1;
    }

    return NextResponse.json({ checked: orders.length, changed, ...tally });
  } catch (error) {
    console.error('Cron retention error:', error);
    return NextResponse.json({ error: 'Failed to process retention' }, { status: 500 });
  }
}
