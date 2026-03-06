import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/admin';

export async function POST(request: NextRequest) {
  console.log('📧 [VERIFICATION] Starting send-verification-code request');
  
  try {
    const body = await request.json();
    const { email, name } = body;
    
    console.log('📧 [VERIFICATION] Request body:', { email, name });

    if (!email) {
      console.error('📧 [VERIFICATION] ERROR: Email is missing from request');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate 4-digit verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    console.log('📧 [VERIFICATION] Generated code:', code, 'Expires at:', expiresAt.toISOString());

    // Store verification code in Firestore
    console.log('📧 [VERIFICATION] Storing code in Firestore for email:', email);
    try {
      const verificationRef = db.collection('emailVerifications').doc(email.toLowerCase());
      await verificationRef.set({
        code,
        email: email.toLowerCase(),
        expiresAt,
        createdAt: new Date(),
        verified: false,
      });
      console.log('📧 [VERIFICATION] Successfully stored code in Firestore');
    } catch (firestoreError) {
      console.error('📧 [VERIFICATION] ERROR storing in Firestore:', firestoreError);
      throw firestoreError;
    }
    
    // Send verification email using direct Resend API
    console.log('📧 [VERIFICATION] Sending verification email...');
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY;
      
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Verification email sent to ${email}. Message ID: ${data.id}`);
      
      return NextResponse.json({ 
        success: true,
        message: 'Verification code sent successfully',
        messageId: data.id,
        // In development, return the code for testing
        ...(process.env.NODE_ENV === 'development' && { code })
      });

    } catch (emailError) {
      console.error('❌ Error sending verification email:', emailError);
      
      // Return a more specific error message
      if (emailError instanceof Error) {
        if (emailError.message.includes('domain not verified')) {
          return NextResponse.json({ 
            error: 'Email service configuration error. Please contact support.' 
          }, { status: 500 });
        }
        
        if (emailError.message.includes('timeout')) {
          return NextResponse.json({ 
            error: 'Request timeout. Please check your connection and try again.' 
          }, { status: 408 });
        }
        
        if (emailError.message.includes('Invalid email')) {
          return NextResponse.json({ 
            error: 'Please enter a valid email address.' 
          }, { status: 400 });
        }
      }
      
      return NextResponse.json({ 
        error: 'Failed to send verification email. Please try again.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
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
