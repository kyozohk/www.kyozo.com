import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 [MINIMAL] Starting minimal email test');
  
  try {
    const body = await request.json();
    const { email } = body;
    
    console.log('📧 [MINIMAL] Request body:', { email });

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Test direct Resend API call
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('📧 [MINIMAL] RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
    }

    console.log('📧 [MINIMAL] RESEND_API_KEY is present');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kyozo <will@contact.kyozo.com>',
        to: [email],
        subject: 'Test Minimal Email',
        html: '<h1>This is a minimal test email</h1>',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('📧 [MINIMAL] Resend API error:', errorData);
      return NextResponse.json({ 
        error: `Resend API error: ${errorData.message || response.statusText}` 
      }, { status: response.status });
    }

    const data = await response.json();
    console.log('✅ [MINIMAL] Email sent successfully:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      id: data.id 
    });

  } catch (error) {
    console.error('❌ [MINIMAL] API Error:', error);
    return NextResponse.json({ 
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
