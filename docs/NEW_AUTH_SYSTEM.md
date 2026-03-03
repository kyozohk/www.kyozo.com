# New Authentication System

## Overview
Redesigned signup/signin dialog combining the clean UI from main branch with KyozoVerse authentication logic and email verification.

## Components Created

### 1. SignupDialog (New Design)
**Location**: `src/components/community/signup-dialog-new.tsx`

**Features**:
- Clean, modern UI matching main branch design
- Three-step flow:
  1. **Initial**: Google (primary) or Email options
  2. **Email Form**: Name, email, password (NO mobile number)
  3. **Verification**: 4-digit code input with auto-submit
- Purple/beige color scheme matching Willer theme
- Smooth transitions between steps
- Auto-focus and paste support for verification codes
- Resend code with 60-second cooldown

### 2. API Routes

#### Send Verification Code
**Location**: `src/app/api/send-verification-code/route.ts`
- Generates 4-digit verification code
- Stores in memory with 10-minute expiration
- Returns code in development mode for testing
- TODO: Integrate with email service (SendGrid, AWS SES, etc.)

#### Verify Code
**Location**: `src/app/api/verify-code/route.ts`
- Validates 4-digit code
- Checks expiration
- Removes code after successful verification

### 3. Auth Hook with Verification
**Location**: `src/hooks/use-auth-with-verification.tsx`

**Features**:
- Email verification flow integration
- Stores pending user data during verification
- Creates Firebase user after code verification
- Auto-joins community after signup
- Google sign-in support
- Form state management

## Usage

### Basic Setup

```tsx
import { SignupDialog } from '@/components/community/signup-dialog-new';
import { useAuthWithVerification } from '@/hooks/use-auth-with-verification';
import { PrivacyPolicyDialog } from '@/components/auth/privacy-policy-dialog';

function MyComponent() {
  const {
    dialogState,
    setDialogState,
    formState,
    handleFormChange,
    handleCheckboxChange,
    handleSignUp,
    handleSignIn,
    handleSignInWithGoogle,
    handleToggleMode,
    handleSendVerificationCode,
    handleVerifyCode,
  } = useAuthWithVerification();

  return (
    <>
      <SignupDialog
        isOpen={dialogState.isSignUpOpen || dialogState.isSignInOpen}
        onClose={() => setDialogState({ ...dialogState, isSignUpOpen: false, isSignInOpen: false })}
        isSignup={dialogState.isSignUpOpen}
        communityName="Willer"
        firstName={formState.firstName}
        lastName={formState.lastName}
        email={formState.email}
        password={formState.password}
        agreedToPrivacy={formState.agreedToPrivacy}
        error={formState.error}
        onFirstNameChange={(value) => handleFormChange('firstName', value)}
        onLastNameChange={(value) => handleFormChange('lastName', value)}
        onEmailChange={(value) => handleFormChange('email', value)}
        onPasswordChange={(value) => handleFormChange('password', value)}
        onAgreedToPrivacyChange={(value) => handleCheckboxChange('agreedToPrivacy', value)}
        onSubmit={handleSignUp}
        onGoogleSignIn={handleSignInWithGoogle}
        onToggleMode={handleToggleMode}
        onShowPrivacyPolicy={() => setDialogState({ ...dialogState, showPrivacyPolicy: true })}
        onSendVerificationCode={handleSendVerificationCode}
        onVerifyCode={handleVerifyCode}
      />
      
      <PrivacyPolicyDialog
        open={dialogState.showPrivacyPolicy}
        onOpenChange={(open) => setDialogState({ ...dialogState, showPrivacyPolicy: open })}
      />
    </>
  );
}
```

### For Invite URLs

The same dialog works for invite URLs. Pre-fill the form data:

```tsx
// In invite page
useEffect(() => {
  if (firstName || lastName || email) {
    handleFormChange('firstName', firstName);
    handleFormChange('lastName', lastName);
    handleFormChange('email', email);
    setDialogState({ 
      isSignInOpen: false, 
      isSignUpOpen: true, 
      isResetPasswordOpen: false, 
      showPrivacyPolicy: false 
    });
  }
}, [firstName, lastName, email]);
```

## Flow Diagram

```
┌─────────────────┐
│  Initial Step   │
│                 │
│ [Google Button] │ ──> Google OAuth ──> Auto-join community
│                 │
│ [Email Button]  │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Email Form Step │
│                 │
│ - First Name    │
│ - Last Name     │
│ - Email         │
│ - Password      │
│ - Privacy ☑     │
│                 │
│ [Continue]      │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Verification    │
│                 │
│  [_] [_] [_] [_]│ ──> Auto-submit when complete
│                 │
│ Resend code     │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Create Account  │
│ Join Community  │
│ Redirect        │
└─────────────────┘
```

## Key Differences from Old System

### Removed
- ❌ Mobile number field
- ❌ Multi-step modal complexity
- ❌ Old purple theme (#843484)

### Added
- ✅ Clean initial screen with Google/Email options
- ✅ 4-digit email verification
- ✅ Auto-submit verification code
- ✅ Willer color theme (#926b7f, #E8DFD1)
- ✅ Better UX with auto-focus and paste support
- ✅ Development mode code display

## TODO for Production

1. **Email Integration**:
   - Integrate SendGrid, AWS SES, or similar
   - Update `send-verification-code/route.ts`
   - Create email template with 4-digit code

2. **Persistent Storage**:
   - Replace in-memory Map with Redis or database
   - Share storage between API routes

3. **Security**:
   - Add rate limiting
   - Add CAPTCHA for repeated attempts
   - Remove dev mode code display

4. **Testing**:
   - Test verification flow end-to-end
   - Test invite URL pre-fill
   - Test Google sign-in with community join

## Migration Path

To migrate from old system to new:

1. Replace `SignupDialog` import with `signup-dialog-new`
2. Replace `useAuthAndDialog` with `useAuthWithVerification`
3. Add `onSendVerificationCode` and `onVerifyCode` props
4. Test all flows (signup, signin, invite)
5. Deploy email service integration
6. Remove old components after verification
