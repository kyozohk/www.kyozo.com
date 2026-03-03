import { NextRequest, NextResponse } from 'next/server';

// In-memory store for verification codes (in production, use Redis or database)
const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Store code with 10-minute expiration
    verificationCodes.set(email.toLowerCase(), {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // TODO: Send email with verification code
    // For now, just log it (in production, integrate with email service)
    console.log(`📧 Verification code for ${email}: ${code}`);

    // In development, you might want to return the code for testing
    // Remove this in production!
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔐 DEV MODE - Verification code: ${code}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully',
      // Only include in development
      ...(process.env.NODE_ENV === 'development' && { devCode: code }),
    });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
