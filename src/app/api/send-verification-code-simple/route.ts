import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 [SIMPLE] Starting simple verification code request');
  
  try {
    const body = await request.json();
    const { email, name } = body;
    
    console.log('📧 [SIMPLE] Request body:', { email, name });

    if (!email) {
      console.error('📧 [SIMPLE] ERROR: Email is missing from request');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate 4-digit verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    console.log('📧 [SIMPLE] Generated code:', code);

    // Send verification email using direct Resend API
    console.log('📧 [SIMPLE] Sending verification email...');
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      
      console.log('📧 [SIMPLE] RESEND_API_KEY exists:', !!RESEND_API_KEY);
      console.log('📧 [SIMPLE] RESEND_API_KEY length:', RESEND_API_KEY?.length || 0);
      
      if (!RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured');
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kyozo <will@contact.kyozo.com>',
          to: [email],
          subject: '📧 Your Kyozo verification code',
          html: getVerificationEmailTemplate(code, name),
        }),
      });

      console.log('📧 [SIMPLE] Resend response status:', response.status);
      console.log('📧 [SIMPLE] Resend response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('📧 [SIMPLE] Resend error data:', errorData);
        throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ [SIMPLE] Verification email sent to ${email}. Message ID: ${data.id}`);
      
      return NextResponse.json({ 
        success: true,
        message: 'Verification code sent successfully',
        messageId: data.id,
        // In development, return the code for testing
        ...(process.env.NODE_ENV === 'development' && { code })
      });

    } catch (emailError) {
      console.error('❌ [SIMPLE] Error sending verification email:', emailError);
      
      return NextResponse.json({ 
        error: `Email service error: ${emailError instanceof Error ? emailError.message : 'Unknown error'}` 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ [SIMPLE] API Error:', error);
    return NextResponse.json({ 
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}

function getVerificationEmailTemplate(code: string, recipientName?: string): string {
  const name = recipientName || 'there';
  
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f4f5;">
      <div style="background: linear-gradient(135deg, #926b7f 0%, #7d5a6b 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 32px; font-weight: 700;">📧 Verify Your Email</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Hi ${name},</p>
      </div>
      
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #4f4949; margin: 0 0 20px; font-size: 24px;">Your Verification Code</h2>
        
        <div style="background: #f5f1e8; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center; border: 2px solid #e8dfd0;">
          <span style="font-size: 36px; font-weight: bold; color: #926b7f; letter-spacing: 8px; font-family: 'Courier New', monospace;">${code}</span>
        </div>
        
        <div style="background: #fef7e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f0c679;">
          <p style="margin: 0; color: #504c4c; font-size: 14px;">
            <strong>⏰ This code will expire in 10 minutes.</strong><br>
            Please enter it in the verification form to complete your registration.
          </p>
        </div>
        
        <p style="color: #978f82; font-size: 12px; margin: 30px 0 0; text-align: center;">
          If you didn't request this code, please ignore this email. Your account remains secure.
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #978f82; font-size: 12px;">
        <p>© 2024 Kyozo. Building the future of creative communities.</p>
      </div>
    </div>
  `;
}
