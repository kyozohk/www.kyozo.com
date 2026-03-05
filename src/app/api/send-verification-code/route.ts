import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';
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
    
    // Send verification email using the email service
    console.log('📧 [VERIFICATION] Sending verification email...');
    try {
      const response = await emailService.sendVerificationEmail(email, code, name);
      
      console.log(`✅ Verification email sent to ${email}. Message ID: ${response.id}`);
      
      return NextResponse.json({ 
        success: true,
        message: 'Verification code sent successfully',
        messageId: response.id,
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
