# Email Setup Guide

This guide explains how to configure email sending for the Kyozo platform using Resend.

## Overview

The platform uses **Resend** for sending transactional emails, including:
- Email verification codes during signup
- Password reset emails
- Welcome emails
- Community invitations

## Prerequisites

1. A Resend account (sign up at [resend.com](https://resend.com))
2. A verified domain in Resend (or use their test domain for development)

## Setup Steps

### 1. Get Your Resend API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Create a new API key
3. Copy the API key (it will only be shown once)

### 2. Add to Environment Variables

Add the following to your `.env.local` file:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Verify Domain (Production Only)

For production use, you need to verify your domain:

1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain (e.g., `kyozo.com`)
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for verification (usually takes a few minutes)

**For Development:** You can use Resend's test domain `onboarding@resend.dev` without verification.

### 4. Update From Email (Optional)

By default, emails are sent from `Kyozo <dev@kyozo.com>`. To change this:

Edit `src/app/api/send-verification-code/route.ts`:

```typescript
const { data, error } = await resend.emails.send({
  from: 'Kyozo <noreply@yourdomain.com>', // Change this
  to: email,
  subject: `Your Kyozo verification code is ${code}`,
  html: htmlContent,
});
```

## Email Templates

Email templates are located in `src/lib/email-templates.ts`. The platform includes:

- **Verification Email**: Sent during signup with a 4-digit code
- Branded HTML templates with Kyozo colors and styling
- Mobile-responsive design

### Customizing Templates

To customize email templates, edit `src/lib/email-templates.ts`:

```typescript
// Brand colors
const BRAND_COLORS = {
  primary: '#433F36',
  secondary: '#926B7F',
  accent: '#23AF98',
  background: '#F5F1E8',
  muted: '#6b7280',
  white: '#ffffff',
};
```

## Testing

### Development Testing

1. Start your development server: `npm run dev`
2. Attempt to sign up with a real email address
3. Check your email inbox for the verification code
4. The code is also logged to the server console for debugging

### Production Testing

Before going live, test the email flow:

1. Sign up with a test account
2. Verify the email arrives within seconds
3. Check that the verification code works
4. Verify email formatting looks correct on mobile and desktop

## Troubleshooting

### "Email service is not configured"

**Cause:** `RESEND_API_KEY` is not set in environment variables.

**Solution:** Add `RESEND_API_KEY` to your `.env.local` file and restart the server.

### "Domain not verified"

**Cause:** Trying to send from an unverified domain in production.

**Solution:** 
- For development: Use `onboarding@resend.dev` as the from address
- For production: Verify your domain in Resend dashboard

### Emails not arriving

**Possible causes:**
1. Check spam/junk folder
2. Verify the email address is correct
3. Check Resend dashboard for delivery status
4. Verify DNS records are correctly configured (production only)

### Rate Limits

Resend free tier includes:
- 100 emails/day
- 3,000 emails/month

For higher volumes, upgrade your Resend plan.

## Google Sign-In

Google Sign-In is already configured and works independently of email verification. Users can:

1. Click "Continue with Google" in the auth dialog
2. Authenticate with their Google account
3. Automatically join the community

No additional setup is required for Google Sign-In as it uses Firebase Authentication.

## Security Notes

- Verification codes expire after 10 minutes
- Codes are stored in-memory (consider Redis for production scaling)
- Never log verification codes in production
- Use environment variables for API keys (never commit to git)

## Support

For Resend-specific issues, consult:
- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)

For platform-specific issues, contact the development team.
