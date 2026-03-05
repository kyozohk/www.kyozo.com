/**
 * Kyozo Email Templates
 * 
 * Email templates for the Kyozo platform using Resend
 */

// Brand colors
const BRAND_COLORS = {
  primary: '#433F36',
  secondary: '#926B7F',
  accent: '#23AF98',
  background: '#F5F1E8',
  muted: '#6b7280',
  white: '#ffffff',
};

// Base email wrapper with Kyozo branding
function getEmailWrapper(content: string, previewText?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Kyozo</title>
  ${previewText ? `<!--[if !mso]><!--><meta name="x-apple-disable-message-reformatting"><!--<![endif]--><style>@media only screen{.preview-text{display:none!important}}</style>` : ''}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f4f5;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: ${BRAND_COLORS.background};
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      .content-padding {
        padding: 24px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5;">
  ${previewText ? `<div class="preview-text" style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">${previewText}</div>` : ''}
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f5;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container" style="margin: 0 auto; background-color: ${BRAND_COLORS.background}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 32px 40px 24px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${BRAND_COLORS.primary}; letter-spacing: -0.5px;">Kyozo</h1>
            </td>
          </tr>
          <!-- Main Content -->
          <tr>
            <td class="content-padding" style="padding: 0 40px 40px 40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: ${BRAND_COLORS.primary}; text-align: center;">
              <p style="margin: 0 0 8px 0; color: ${BRAND_COLORS.white}; font-size: 14px; opacity: 0.9;">
                © ${new Date().getFullYear()} Kyozo. All rights reserved.
              </p>
              <p style="margin: 0; color: ${BRAND_COLORS.white}; font-size: 12px; opacity: 0.7;">
                Where creative minds converge
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Verification code display
function getVerificationCodeBlock(code: string): string {
  return `
    <div style="background-color: ${BRAND_COLORS.white}; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; border: 2px dashed ${BRAND_COLORS.secondary};">
      <p style="margin: 0 0 8px 0; color: ${BRAND_COLORS.muted}; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your verification code</p>
      <p style="margin: 0; font-size: 42px; font-weight: 700; color: ${BRAND_COLORS.primary}; letter-spacing: 8px; font-family: 'Courier New', monospace;">
        ${code}
      </p>
      <p style="margin: 16px 0 0 0; color: ${BRAND_COLORS.muted}; font-size: 12px;">
        This code expires in 10 minutes
      </p>
    </div>
  `;
}

/**
 * Email verification code for signup
 */
export function getVerificationEmail(recipientName: string, code: string): string {
  const content = `
    <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: ${BRAND_COLORS.primary}; line-height: 1.3;">
      Verify your email
    </h1>
    <p style="margin: 0 0 8px 0; font-size: 16px; color: ${BRAND_COLORS.primary}; line-height: 1.6; opacity: 0.85;">
      Hi ${recipientName},
    </p>
    <p style="margin: 0 0 24px 0; font-size: 16px; color: ${BRAND_COLORS.primary}; line-height: 1.6; opacity: 0.85;">
      Please use the verification code below to complete your Kyozo account setup.
    </p>
    
    ${getVerificationCodeBlock(code)}
    
    <p style="margin: 0 0 16px 0; font-size: 14px; color: ${BRAND_COLORS.muted}; line-height: 1.6;">
      If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake.
    </p>
    
    <p style="margin: 16px 0 0 0; font-size: 14px; color: ${BRAND_COLORS.primary};">
      — The Kyozo Team
    </p>
  `;
  
  return getEmailWrapper(content, `Your Kyozo verification code is ${code}`);
}
