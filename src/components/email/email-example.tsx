/**
 * 📱 Email Service Integration Example Component
 * 
 * This component demonstrates how to use the email service hooks
 * for various email operations in a React application.
 */

'use client';

import React, { useState } from 'react';
import { useEmailService, useVerificationEmail, useBulkEmailService } from '@/hooks/use-email-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, CheckCircle, AlertCircle, Send } from 'lucide-react';

export function EmailServiceExample() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📧 Email Service Examples</h1>
        <p className="text-gray-600">Demonstrating various email service integrations</p>
      </div>

      <VerificationEmailExample />
      <WelcomeEmailExample />
      <PasswordResetExample />
      <BulkEmailExample />
      <CustomEmailExample />
    </div>
  );
}

function VerificationEmailExample() {
  const { sendVerificationEmail, loading, error, lastResponse } = useVerificationEmail();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sentCode, setSentCode] = useState<string | null>(null);

  const handleSendVerification = async () => {
    if (!email) return;

    try {
      // Generate a test code for demonstration
      const testCode = Math.floor(1000 + Math.random() * 9000).toString();
      await sendVerificationEmail(email, testCode, name || undefined);
      setSentCode(testCode);
    } catch (err) {
      console.error('Failed to send verification email:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Verification Email
        </CardTitle>
        <CardDescription>
          Send verification codes to users for email confirmation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="Recipient name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleSendVerification}
          disabled={!email || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Verification Code...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Verification Code
            </>
          )}
        </Button>

        {sentCode && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Verification code sent! Test code: <strong>{sentCode}</strong>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>❌ {error}</AlertDescription>
          </Alert>
        )}

        {lastResponse?.success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Email sent successfully! Message ID: {lastResponse.id}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function WelcomeEmailExample() {
  const { sendWelcomeEmail, loading, error, lastResponse } = useEmailService();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleSendWelcome = async () => {
    if (!email || !userName) return;

    try {
      await sendWelcomeEmail(email, userName);
    } catch (err) {
      console.error('Failed to send welcome email:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Welcome Email
        </CardTitle>
        <CardDescription>
          Send welcome emails to new users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="User name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleSendWelcome}
          disabled={!email || !userName || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Welcome Email...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Welcome Email
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>❌ {error}</AlertDescription>
          </Alert>
        )}

        {lastResponse?.success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Welcome email sent successfully! Message ID: {lastResponse.id}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function PasswordResetExample() {
  const { sendPasswordResetEmail, loading, error, lastResponse } = useEmailService();
  const [email, setEmail] = useState('');

  const handleSendPasswordReset = async () => {
    if (!email) return;

    try {
      const resetLink = `https://kyozo.com/reset-password?token=${Date.now()}`;
      await sendPasswordResetEmail(email, resetLink);
    } catch (err) {
      console.error('Failed to send password reset email:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Password Reset Email
        </CardTitle>
        <CardDescription>
          Send password reset links to users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <Button 
          onClick={handleSendPasswordReset}
          disabled={!email || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Password Reset...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Password Reset
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>❌ {error}</AlertDescription>
          </Alert>
        )}

        {lastResponse?.success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Password reset email sent successfully! Message ID: {lastResponse.id}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function BulkEmailExample() {
  const { sendBulkEmails, loading, progress, total, errors, completed } = useBulkEmailService();
  const [recipients, setRecipients] = useState('user1@example.com,user2@example.com,user3@example.com');

  const handleSendBulk = async () => {
    const emails = recipients.split(',').map(email => email.trim()).filter(Boolean);
    
    const requests = emails.map(email => ({
      to: email,
      subject: '📢 Important Community Update',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #926b7f; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0;">Community Update</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <p>Hello community member!</p>
            <p>We have exciting updates to share with you...</p>
          </div>
        </div>
      `,
    }));

    try {
      await sendBulkEmails(requests);
    } catch (err) {
      console.error('Failed to send bulk emails:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Bulk Email
        </CardTitle>
        <CardDescription>
          Send emails to multiple recipients at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Comma-separated email addresses"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />

        {loading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: {completed}/{total}</span>
              <span>{Math.round((completed / total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <Button 
          onClick={handleSendBulk}
          disabled={!recipients || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Bulk Emails...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Bulk Emails
            </>
          )}
        </Button>

        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              ❌ Some emails failed to send:
              <ul className="mt-2 list-disc list-inside">
                {errors.slice(0, 3).map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
                {errors.length > 3 && (
                  <li className="text-sm">...and {errors.length - 3} more</li>
                )}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {!loading && completed > 0 && completed === total && errors.length === 0 && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ All {total} emails sent successfully!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function CustomEmailExample() {
  const { sendEmail, loading, error, lastResponse } = useEmailService();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCustom = async () => {
    if (!email || !subject || !message) return;

    try {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4f4949; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0;">${subject}</h1>
          </div>
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `;

      await sendEmail({
        to: email,
        subject,
        html,
      });
    } catch (err) {
      console.error('Failed to send custom email:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Custom Email
        </CardTitle>
        <CardDescription>
          Send custom emails with your own content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Message content"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
        />

        <Button 
          onClick={handleSendCustom}
          disabled={!email || !subject || !message || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Custom Email...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Custom Email
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>❌ {error}</AlertDescription>
          </Alert>
        )}

        {lastResponse?.success && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ✅ Custom email sent successfully! Message ID: {lastResponse.id}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
