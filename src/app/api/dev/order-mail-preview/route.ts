import { NextRequest, NextResponse } from 'next/server';
import { StorageService } from '@/lib/storage';
import { buildOrderAdminHtml } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Podgląd wewnętrznego maila „nowe opłacone zamówienie" (tylko dev — 404 w produkcji).
 * ?orderId=... albo bez parametru → ostatnie zamówienie.
 */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not found', { status: 404 });
  }
  const orderId = req.nextUrl.searchParams.get('orderId');
  const order = orderId
    ? await StorageService.getOrderByOrderId(orderId)
    : (await StorageService.getOrders()).slice(-1)[0];

  if (!order) return new NextResponse('Brak zamówienia', { status: 404 });

  return new NextResponse(buildOrderAdminHtml(order), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
