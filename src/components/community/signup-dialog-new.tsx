'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Loader2 } from 'lucide-react';

type SignupStep = 'initial' | 'email-form' | 'verification';

interface SignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isSignup: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreedToPrivacy: boolean;
  error: string | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onAgreedToPrivacyChange: (value: boolean) => void;
  onSubmit: () => void;
  onGoogleSignIn: () => void;
  onToggleMode: () => void;
  onShowPrivacyPolicy: () => void;
  onSendVerificationCode?: (email: string) => Promise<void>;
  onVerifyCode?: (code: string) => Promise<boolean>;
  communityName?: string;
}

export const SignupDialog: React.FC<SignupDialogProps> = ({
  isOpen,
  onClose,
  isSignup,
  firstName,
  lastName,
  email,
  password,
  agreedToPrivacy,
  error,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onAgreedToPrivacyChange,
  onSubmit,
  onGoogleSignIn,
  onToggleMode,
  onShowPrivacyPolicy,
  onSendVerificationCode,
  onVerifyCode,
  communityName = 'Willer'
}) => {
  const [step, setStep] = useState<SignupStep>('initial');
  const [code, setCode] = useState(['', '', '', '']);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset step when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setStep('initial');
      setCode(['', '', '', '']);
      setVerificationError(null);
    }
  }, [isOpen]);

  // Focus first input when verification step opens
  useEffect(() => {
    if (step === 'verification') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleEmailSignupClick = () => {
    setStep('email-form');
  };

  const handleBackToInitial = () => {
    setStep('initial');
  };

  const handleSubmitEmailForm = async () => {
    // Validate form
    if (isSignup) {
      if (!firstName || !lastName || !email || !password || !agreedToPrivacy) {
        return;
      }
      // Send verification code
      if (onSendVerificationCode) {
        setLoading(true);
        try {
          await onSendVerificationCode(email);
          setStep('verification');
          setResendCooldown(60);
        } catch (err) {
          // Error handled by parent
        } finally {
          setLoading(false);
        }
      }
    } else {
      // Sign in directly
      onSubmit();
    }
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setVerificationError(null);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (value && index === 3 && newCode.every(d => d)) {
      handleVerifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pastedData.length === 4) {
      const newCode = pastedData.split('');
      setCode(newCode);
      handleVerifyCode(pastedData);
    }
  };

  const handleVerifyCode = async (verificationCode: string) => {
    if (!onVerifyCode) {
      onSubmit();
      return;
    }

    setLoading(true);
    setVerificationError(null);

    try {
      const isValid = await onVerifyCode(verificationCode);
      if (isValid) {
        onSubmit();
      } else {
        setVerificationError('Invalid code. Please try again.');
        setCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setVerificationError('Something went wrong. Please try again.');
      setCode(['', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !onSendVerificationCode) return;
    
    setResending(true);
    setVerificationError(null);

    try {
      await onSendVerificationCode(email);
      setResendCooldown(60);
      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setVerificationError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] p-0 overflow-hidden bg-[#f5f5f5] rounded-[32px] border-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 px-12 py-10">
          {/* Initial Step - Google/Email Options */}
          {step === 'initial' && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  Sign In to {communityName}
                </h2>
                <p className="text-base text-gray-600">
                  Welcome back! Sign in to continue
                </p>
              </div>

              <div className="space-y-4">
                {/* Google Sign In - Primary */}
                <button
                  onClick={onGoogleSignIn}
                  className="w-full h-14 bg-[#D4C5DD] hover:bg-[#c4b5cd] text-[#6B4C7A] font-semibold rounded-full transition-all flex items-center justify-center gap-3 text-lg border-2 border-[#D4C5DD]"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#f5f5f5] text-gray-500">Or</span>
                  </div>
                </div>

                {/* Email Sign Up/In Button */}
                <button
                  onClick={handleEmailSignupClick}
                  className="w-full h-14 bg-[#D4C5DD] hover:bg-[#c4b5cd] text-[#6B4C7A] font-semibold rounded-full transition-all text-lg border-2 border-[#D4C5DD]"
                >
                  Continue with Email
                </button>

                {/* Toggle Mode */}
                <div className="text-center text-base text-gray-700 pt-6">
                  {isSignup ? "Don't have an account?" : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="text-[#8B6B9B] hover:underline font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email Form Step */}
          {step === 'email-form' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  {isSignup ? 'Create Account' : 'Sign In'}
                </h2>
                <p className="text-base text-gray-600">
                  {isSignup ? 'Enter your details to get started' : 'Enter your credentials'}
                </p>
              </div>

              <div className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
                    {error}
                  </div>
                )}

                {/* Name Fields (Signup only) */}
                {isSignup && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => onFirstNameChange(e.target.value)}
                        placeholder="John"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => onLastNameChange(e.target.value)}
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-base"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-base"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-base"
                    required
                  />
                </div>

                {/* Privacy Policy (Signup only) */}
                {isSignup && (
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => onAgreedToPrivacyChange(e.target.checked)}
                      className="mt-1 w-4 h-4"
                    />
                    <label className="text-sm text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={onShowPrivacyPolicy}
                        className="text-[#8B6B9B] hover:underline font-medium"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmitEmailForm}
                  disabled={loading}
                  className="w-full h-14 bg-[#D4C5DD] hover:bg-[#c4b5cd] text-[#6B4C7A] font-semibold rounded-full transition-all disabled:opacity-50 text-lg mt-6"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {isSignup ? 'Sending code...' : 'Signing in...'}
                    </span>
                  ) : (
                    isSignup ? 'Continue' : 'Sign In'
                  )}
                </button>

                {/* Back Button */}
                <button
                  onClick={handleBackToInitial}
                  className="w-full h-14 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-full transition-all text-lg"
                >
                  Back
                </button>
              </div>
            </>
          )}

          {/* Verification Code Step */}
          {step === 'verification' && (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#D4C5DD] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#6B4C7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-3">Verify your email</h2>
                <p className="text-base text-gray-600">
                  We've sent a 4-digit code to <span className="font-semibold">{email}</span>
                </p>
              </div>

              <div className="flex flex-col items-center py-4">
                {/* Code input boxes */}
                <div className="flex gap-4 mb-8" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={loading}
                      className="w-16 h-20 text-center text-3xl font-bold bg-white border-2 border-gray-300 rounded-2xl focus:border-[#D4C5DD] focus:outline-none focus:ring-2 focus:ring-[#D4C5DD]/30 transition-all disabled:opacity-50"
                    />
                  ))}
                </div>

                {verificationError && (
                  <div className="text-sm text-red-500 mb-6 text-center">
                    {verificationError}
                  </div>
                )}

                {loading && (
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-base">Verifying...</span>
                  </div>
                )}

                <div className="text-center text-base text-gray-700 mb-6">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending || resendCooldown > 0}
                    className="text-[#8B6B9B] hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {resending ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}
                  </button>
                </div>

                <button
                  onClick={() => setStep('email-form')}
                  className="text-base text-gray-600 hover:text-gray-900 font-medium"
                >
                  ← Back to email
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
