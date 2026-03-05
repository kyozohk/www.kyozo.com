import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getVerificationEmail } from '@/lib/email-templates';

// In-memory store for verification codes (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, message: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Store code with 10-minute expiration
    verificationCodes.set(email.toLowerCase(), {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // Send email with verification code using Resend
    try {
      const recipientName = name || email.split('@')[0];
      const htmlContent = getVerificationEmail(recipientName, code);
      
      const { data, error } = await resend.emails.send({
        from: 'Kyozo <willer@contact.kyozo.com>',
        to: email,
        subject: `Your Kyozo verification code is ${code}`,
        html: htmlContent,
      });

      if (error) {
        console.error('❌ Resend API error:', error);
        throw new Error(error.message || 'Failed to send email');
      }

      console.log(`✅ Verification email sent to ${email}. Message ID: ${data?.id}`);
    } catch (emailError: any) {
      console.error('❌ Error sending verification email:', emailError);
      
      // Check for common Resend errors
      if (emailError.message?.includes('domain') || emailError.message?.includes('verified')) {
        return NextResponse.json(
          { success: false, message: 'Email sending failed: Domain not verified. Please contact support.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: `Failed to send verification email: ${emailError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully',
    });
  } catch (error: any) {
    console.error('❌ Error in send-verification-code:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
