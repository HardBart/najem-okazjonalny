import { NextRequest, NextResponse } from 'next/server';
import { Przelewy24Service } from '@/lib/przelewy24';
import { StorageService } from '@/lib/storage';
import { getPackageById } from '@/lib/packages';
import { getAddonById, sumAddons } from '@/lib/addons';
import { getDiscount, discountAmountFor, normalizeCode } from '@/lib/discounts';
import { Order } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, package: packageId, addons, personalData, rentalData, consents, regulaminVersion, discountCode, delivery } = body;

    // Validate package
    const selectedPackage = getPackageById(packageId);
    if (!selectedPackage) {
      return NextResponse.json(
        { error: 'Invalid package selected' },
        { status: 400 }
      );
    }

    // Validate add-ons (ignore unknown ids) and compute total server-side
    const addonIds: string[] = Array.isArray(addons)
      ? addons.filter((id: string) => getAddonById(id))
      : [];
    const baseAmount = selectedPackage.price + sumAddons(addonIds);

    // Walidacja kodu rabatowego po stronie serwera
    const validDiscount = discountCode && getDiscount(discountCode) ? normalizeCode(discountCode) : undefined;
    const discountAmount = validDiscount ? discountAmountFor(baseAmount, validDiscount) : 0;
    const totalAmount = baseAmount - discountAmount;

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    // Create order in storage
    const order: Order = {
      id: Date.now().toString(),
      orderId,
      package: packageId,
      addons: addonIds,
      personalData,
      rentalData,
      delivery,
      paymentStatus: 'pending',
      orderStatus: 'new',
      amount: totalAmount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      regulaminVersion,
      ip,
      discountCode: validDiscount,
      discountAmount: discountAmount || undefined,
      consents,
    };

    await StorageService.saveOrder(order);

    // Rejestracja płatności w Przelewy24 (sessionId = nasz orderId, kwota w groszach)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const p24 = await Przelewy24Service.registerTransaction({
      sessionId: orderId,
      amount: totalAmount * 100,
      description: `Pakiet ${selectedPackage.name} - Najem Okazjonalny`,
      email: personalData.email,
      urlReturn: `${appUrl}/platnosc/sukces?orderId=${orderId}`,
      urlStatus: `${appUrl}/api/przelewy24/notify`,
    });

    // Zapis tokenu transakcji P24 przy zamówieniu
    await StorageService.updateOrder(orderId, {
      payuOrderId: p24.token,
    });

    return NextResponse.json({
      success: true,
      redirectUrl: p24.redirectUrl,
      orderId,
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const orders = await StorageService.getOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Failed to get orders' },
      { status: 500 }
    );
  }
}
