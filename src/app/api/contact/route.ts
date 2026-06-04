import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/utils';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, consent } = body;

    // Validation
    if (!name || !email || !message || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      message: sanitizeInput(message),
      timestamp: new Date().toISOString(),
    };

    // Powiadomienie e-mail do firmy (jeśli skonfigurowano RESEND_API_KEY)
    await sendContactNotification({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      message: sanitizedData.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
