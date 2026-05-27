/**
 * � Resend Email Service
 * 
 * This service provides direct integration with Resend API for sending emails
 * without going through the KyozoVerse proxy.
 */

export interface EmailRequest {
  to: string;
  from?: string;
  subject: string;
  html: string;
}

export interface EmailResponse {
  success: boolean;
  id?: string;
  error?: string;
}

export class EmailService {
  private timeout: number;

  constructor(config?: { timeout?: number }) {
    this.timeout = config?.timeout || 10000;
  }

  /**
   * Send email using Resend API directly
   */
  async sendEmail(request: EmailRequest, maxRetries: number = 3): Promise<EmailResponse> {
    const lastError = new Error('Email sending failed after retries');
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.sendResendEmail(request);
        
        if (response.success) {
          this.logSuccess(request.to, response.id);
          return response;
        } else {
          throw new Error(response.error || 'Unknown email sending error');
        }
      } catch (error) {
        lastError.message = error instanceof Error ? error.message : 'Unknown error';
        
        if (attempt === maxRetries) {
          this.logError(request.to, lastError.message);
          throw lastError;
        }
        
        // Exponential backoff: 2^attempt * 1000ms
        const delay = Math.pow(2, attempt) * 1000;
        await this.delay(delay);
      }
    }
    
    throw lastError;
  }

  /**
   * Send email using Resend API
   */
  private async sendResendEmail(request: EmailRequest): Promise<EmailResponse> {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: request.from || 'Kyozo <will@contact.kyozo.com>',
          to: [request.to],
          subject: request.subject,
          html: request.html,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      return { success: true, id: data.id };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      
      throw error;
    }
  }

  /**
   * Send verification email with template
   */
  async sendVerificationEmail(to: string, verificationCode: string, recipientName?: string): Promise<EmailResponse> {
    const html = this.getVerificationEmailTemplate(verificationCode, recipientName);
    
    return this.sendEmail({
      to,
      subject: '📧 Your Kyozo verification code',
      html,
    });
  }

  /**
   * Send welcome email with template
   */
  async sendWelcomeEmail(to: string, userName: string): Promise<EmailResponse> {
    const html = this.getWelcomeEmailTemplate(userName);
    
    return this.sendEmail({
      to,
      subject: '🎉 Welcome to Kyozo!',
      html,
    });
  }

  /**
   * Send password reset email with template
   */
  async sendPasswordResetEmail(to: string, resetLink: string): Promise<EmailResponse> {
    const html = this.getPasswordResetTemplate(resetLink);
    
    return this.sendEmail({
      to,
      subject: '🔐 Reset your Kyozo password',
      html,
    });
  }

  /**
   * Verification email template
   */
  private getVerificationEmailTemplate(code: string, recipientName?: string): string {
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

  /**
   * Welcome email template
   */
  private getWelcomeEmailTemplate(userName: string): string {
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f4f5;">
        <div style="background: linear-gradient(135deg, #6e94b1 0%, #5a7a94 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 700;">🎉 Welcome to Kyozo!</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Hi ${userName},</p>
        </div>
        
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #4f4949; margin: 0 0 20px; font-size: 24px;">Welcome to the Community!</h2>
          
          <p style="color: #504c4c; line-height: 1.6; margin: 0 0 30px;">
            We're excited to have you join our creative community. Your account is now ready and you can start exploring everything Kyozo has to offer.
          </p>
          
          <div style="background: #e8f4f8; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #6e94b1;">
            <h3 style="color: #6e94b1; margin: 0 0 15px; font-size: 18px;">🚀 What's Next?</h3>
            <ul style="color: #504c4c; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>✅ Complete your profile to personalize your experience</li>
              <li>🎨 Explore communities and content that interests you</li>
              <li>👥 Connect with other creative members</li>
              <li>📱 Access our mobile app for on-the-go creativity</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://kyozo.com" style="background: #6e94b1; color: white; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
              Get Started →
            </a>
          </div>
          
          <p style="color: #978f82; font-size: 12px; margin: 30px 0 0; text-align: center;">
            If you have any questions, reply to this email. We're here to help!
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #978f82; font-size: 12px;">
          <p>© 2024 Kyozo. Building the future of creative communities.</p>
        </div>
      </div>
    `;
  }

  /**
   * Password reset email template
   */
  private getPasswordResetTemplate(resetLink: string): string {
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f4f5;">
        <div style="background: linear-gradient(135deg, #f0c679 0%, #d4a017 100%); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: 700;">🔐 Reset Your Password</h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <h2 style="color: #4f4949; margin: 0 0 20px; font-size: 24px;">Password Reset Request</h2>
          
          <p style="color: #504c4c; line-height: 1.6; margin: 0 0 30px;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${resetLink}" style="background: #f0c679; color: #4f4949; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
              Reset Password →
            </a>
          </div>
          
          <div style="background: #fef7e0; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #f0c679;">
            <p style="margin: 0; color: #504c4c; font-size: 14px;">
              <strong>🔒 Security Notice:</strong><br>
              This link will expire in 1 hour for your security. If you didn't request this password reset, please ignore this email.
            </p>
          </div>
          
          <p style="color: #978f82; font-size: 12px; margin: 30px 0 0; text-align: center;">
            If the button above doesn't work, copy and paste this link into your browser:<br>
            <span style="word-break: break-all; color: #6e94b1;">${resetLink}</span>
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #978f82; font-size: 12px;">
          <p>© 2024 Kyozo. Building the future of creative communities.</p>
        </div>
      </div>
    `;
  }

  /**
   * Utility function for delays
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Log successful email sending
   */
  private logSuccess(to: string, emailId?: string): void {
    console.log(`✅ Email sent successfully to ${to}${emailId ? ` (ID: ${emailId})` : ''}`);
  }

  /**
   * Log email sending errors
   */
  private logError(to: string, error: string): void {
    console.error(`❌ Failed to send email to ${to}: ${error}`);
  }
}

// Singleton instance for easy usage
export const emailService = new EmailService();

// Types are already exported above with the interface declarations
