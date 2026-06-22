import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { StorageService } from '@/lib/storage';
import { scrubPeselUpdates } from '@/lib/retention';
import type { Order } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Zmiana statusu realizacji zamówienia (panel admina). Oznaczenie „zrealizowane"
 * traktujemy jako przekazanie dokumentów — wówczas niezwłocznie kasujemy PESEL (RODO).
 * Wymaga ważnego ciasteczka admin-token.
 */
export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin-token')?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { orderId?: string; orderStatus?: Order['orderStatus'] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const allowed: Order['orderStatus'][] = ['new', 'in_progress', 'completed', 'cancelled'];
  if (!body.orderId || !body.orderStatus || !allowed.includes(body.orderStatus)) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const order = await StorageService.getOrderByOrderId(body.orderId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const updates: Partial<Order> = { orderStatus: body.orderStatus };
  if (body.orderStatus === 'completed') {
    Object.assign(updates, scrubPeselUpdates(order));
  }

  await StorageService.updateOrder(body.orderId, updates);
  return NextResponse.json({ ok: true, peselDeleted: !!updates.peselDeletedAt });
}
