'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, Loader2 } from 'lucide-react';

type AuthStep = 'form' | 'verification';

interface UnifiedAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
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
  onShowPrivacyPolicy: () => void;
  onSendVerificationCode?: (email: string) => Promise<void>;
  onVerifyCode?: (code: string) => Promise<boolean>;
  communityName?: string;
  prefillData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

export const UnifiedAuthDialog: React.FC<UnifiedAuthDialogProps> = ({
  isOpen,
  onClose,
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
  onShowPrivacyPolicy,
  onSendVerificationCode,
  onVerifyCode,
  communityName = 'Willer',
  prefillData
}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [step, setStep] = useState<AuthStep>('form');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasPrefilled = useRef(false);

  // Reset when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setCode(['', '', '', '']);
      setVerificationError(null);
      setConfirmPassword('');
      setPasswordError('');
      hasPrefilled.current = false;
    }
  }, [isOpen]);

  // Pre-fill form data when dialog opens with invite data (only once)
  useEffect(() => {
    if (isOpen && prefillData && !hasPrefilled.current) {
      if (prefillData.firstName) onFirstNameChange(prefillData.firstName);
      if (prefillData.lastName) onLastNameChange(prefillData.lastName);
      if (prefillData.email) onEmailChange(prefillData.email);
      setIsSignUp(true);
      hasPrefilled.current = true;
    }
  }, [isOpen, prefillData, onFirstNameChange, onLastNameChange, onEmailChange]);

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

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setPasswordError('');
    setConfirmPassword('');
  };

  const handleSubmitForm = async () => {
    setPasswordError('');

    // Validation
    if (isSignUp) {
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setPasswordError('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }
      if (!agreedToPrivacy) {
        setPasswordError('You must agree to the privacy policy');
        return;
      }

      // Send verification code for sign-up
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
      // Sign in
      if (!email || !password) {
        setPasswordError('Please enter email and password');
        return;
      }
      onSubmit();
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setVerificationError(null);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

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
      <DialogContent className="sm:max-w-[640px] !p-0 overflow-hidden !bg-white !rounded-[24px] !border-0 [&>button]:hidden">
        <DialogTitle className="sr-only">
          {step === 'form' ? (isSignUp ? `Sign Up for ${communityName}` : `Sign In to ${communityName}`) : 'Verify your email'}
        </DialogTitle>
        
        {/* Custom Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 px-8 md:px-12 py-12">
          {/* Form Step */}
          {step === 'form' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4f4949] mb-4">
                  {isSignUp ? 'Sign in to continue reading' : 'Sign in to continue reading'}
                </h2>
                <p className="text-base text-[#6b6767] leading-relaxed">
                  Create a free Kyozo account to access full articles, audio content, and exclusive community features.
                </p>
              </div>

              <div className="space-y-3">
                {/* Error Message */}
                {(error || passwordError) && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-xs">
                    {error || passwordError}
                  </div>
                )}

                {/* Name Fields (Sign Up only) - Floating Labels */}
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => onFirstNameChange(e.target.value)}
                        placeholder=" "
                        className="peer w-full px-3 pt-5 pb-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-sm"
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                      >
                        First Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => onLastNameChange(e.target.value)}
                        placeholder=" "
                        className="peer w-full px-3 pt-5 pb-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-sm"
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                      >
                        Last Name
                      </label>
                    </div>
                  </div>
                )}

                {/* Email - Floating Label */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-3 pt-5 pb-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-sm"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                  >
                    Email
                  </label>
                </div>

                {/* Password - Floating Label */}
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-3 pt-5 pb-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-sm"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password (Sign Up only) - Floating Label */}
                {isSignUp && (
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder=" "
                      className="peer w-full px-3 pt-5 pb-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4C5DD]/50 focus:border-[#D4C5DD] text-sm"
                      required
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute left-3 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Privacy Policy (Sign Up only) */}
                {isSignUp && (
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => onAgreedToPrivacyChange(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5"
                    />
                    <label className="text-xs text-gray-600 leading-tight">
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
                  onClick={handleSubmitForm}
                  disabled={loading}
                  className="w-full h-12 bg-[#926b7f] hover:bg-[#7d5a6b] text-white font-semibold rounded-full transition-all disabled:opacity-50 text-sm uppercase tracking-wide mt-6"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </span>
                  ) : (
                    'SIGN IN'
                  )}
                </button>

                {/* Back to Feed Button */}
                <button
                  onClick={onClose}
                  className="w-full h-12 bg-transparent border-2 border-[#e8dfd0] text-[#504c4c] font-semibold rounded-full hover:bg-[#f5f1e8] transition-all text-sm uppercase tracking-wide mt-3"
                >
                  BACK TO FEED
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
                  onClick={() => setStep('form')}
                  className="text-base text-gray-600 hover:text-gray-900 font-medium"
                >
                  ← Back to form
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
