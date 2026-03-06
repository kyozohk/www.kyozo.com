import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  console.log('📧 [TEST] Starting simple email test');
  
  try {
    const body = await request.json();
    const { email, name } = body;
    
    console.log('📧 [TEST] Request body:', { email, name });

    if (!email) {
      console.error('📧 [TEST] ERROR: Email is missing from request');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate 4-digit verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    
    console.log('📧 [TEST] Generated code:', code);

    // Send verification email using the email service
    console.log('📧 [TEST] Sending verification email...');
    try {
      const response = await emailService.sendVerificationEmail(email, code, name);
      
      console.log(`✅ [TEST] Verification email sent to ${email}. Message ID: ${response.id}`);
      
      return NextResponse.json({ 
        success: true,
        message: 'Verification code sent successfully',
        messageId: response.id,
        // In development, return the code for testing
        ...(process.env.NODE_ENV === 'development' && { code })
      });

    } catch (emailError) {
      console.error('❌ [TEST] Error sending verification email:', emailError);
      
      // Return a more specific error message
      if (emailError instanceof Error) {
        return NextResponse.json({ 
          error: `Email service error: ${emailError.message}` 
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        error: 'Failed to send verification email. Please try again.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ [TEST] API Error:', error);
    return NextResponse.json({ 
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
