import { NextRequest, NextResponse } from 'next/server';
import { StorageService } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Status płatności zamówienia (po orderId) — dla strony powrotu z Przelewy24.
 * Zwraca wyłącznie status (bez danych osobowych). Autorytatywny status ustawia webhook.
 */
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });

  const order = await StorageService.getOrderByOrderId(orderId);
  if (!order) return NextResponse.json({ status: 'not_found' }, { status: 404 });

  return NextResponse.json({
    status: order.paymentStatus,
    orderStatus: order.orderStatus,
  });
}
