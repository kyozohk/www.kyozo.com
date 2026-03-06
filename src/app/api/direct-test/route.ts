import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Test direct Resend API call with hardcoded values
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer re_B4TWHaq1_A85tbBcBhgrPELAvbAnzhENP`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Kyozo <will@contact.kyozo.com>',
        to: [email],
        subject: 'Direct Test Email',
        html: '<h1>This is a direct test email</h1>',
      }),
    });

    const data = await response.json();
    
    return NextResponse.json({
      status: response.status,
      ok: response.ok,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
