'use client';

import { useState, useRef, useEffect } from 'react';
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
  communityIcon?: string;
  onSignIn?: () => void;
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
  communityIcon,
  onSignIn,
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
      if (onSignIn) {
        onSignIn();
      } else {
        onSubmit();
      }
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

  if (!isOpen) return null;

  return (
    <>
      {/* Full-screen overlay with blurred background */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:py-8 sm:px-4"
        onClick={onClose}
      >
        {/* Dialog content - full screen on mobile, centered card on desktop */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            height: '100%',
            maxHeight: 'none',
            borderRadius: '0',
          }}
          className="bg-white sm:h-auto sm:max-h-[90vh] sm:rounded-[24px] max-w-full sm:max-w-[640px] shadow-2xl overflow-hidden relative flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <h2 id="dialog-title" className="sr-only">
            {step === 'form'
              ? (isSignUp ? `Sign Up for ${communityName}` : `Sign In to ${communityName}`)
              : 'Verify your email'}
          </h2>

          {/* Custom Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-600 transition-colors bg-white/80 rounded-full p-1.5"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div
            className="relative z-10 px-4 sm:px-8 md:px-12 py-8 sm:py-8 overflow-y-auto h-full max-h-full sm:max-h-[90vh] flex flex-col justify-center sm:justify-start"
          >
          {/* Form Step */}
          {step === 'form' && (
            <>
              {/* Community Header */}
              <div className="flex flex-col items-center mb-6">
                {communityIcon && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e8dfd0] mb-3 shadow-sm">
                    <img src={communityIcon} alt={communityName} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-sm font-semibold text-[#926b7f] uppercase tracking-wider">{communityName}</p>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold text-[#4f4949] mb-3">
                  {isSignUp ? 'Sign up to continue' : 'Sign in to continue'}
                </h2>
                <p className="text-base sm:text-sm md:text-base text-[#6b6767] leading-relaxed max-w-md mx-auto">
                  Create a free Kyozo account to access full articles, audio content, and exclusive community features.
                </p>
              </div>

              <div className="space-y-4">
                {/* Error Message */}
                {(error || passwordError) && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-sm">
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
                        className="peer w-full px-3 sm:px-4 pt-5 pb-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#926b7f] text-base transition-colors h-12 sm:h-auto"
                        required
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute left-3 sm:left-4 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#926b7f]"
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
                        className="peer w-full px-3 sm:px-4 pt-5 pb-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#926b7f] text-base transition-colors h-12 sm:h-auto"
                        required
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute left-3 sm:left-4 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#926b7f]"
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
                    className="peer w-full px-3 sm:px-4 pt-5 pb-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#926b7f] text-base transition-colors h-12 sm:h-auto"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 sm:left-4 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#926b7f]"
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
                    className="peer w-full px-3 sm:px-4 pt-5 pb-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#926b7f] text-base transition-colors h-12 sm:h-auto"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 sm:left-4 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#926b7f]"
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
                      className="peer w-full px-3 sm:px-4 pt-5 pb-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#926b7f] text-base transition-colors h-12 sm:h-auto"
                      required
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute left-3 sm:left-4 top-1.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-[#926b7f]"
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Privacy Policy (Sign Up only) */}
                {isSignUp && (
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => onAgreedToPrivacyChange(e.target.checked)}
                      className="mt-0.5 w-4 h-4"
                    />
                    <label className="text-sm text-gray-600 leading-tight">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={onShowPrivacyPolicy}
                        className="text-[#926b7f] hover:underline font-medium"
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
                  className="w-full h-12 sm:h-11 bg-[#926b7f] hover:bg-[#7d5a6b] text-white font-semibold rounded-full transition-all disabled:opacity-50 text-base sm:text-sm uppercase tracking-wide mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </span>
                  ) : (
                    isSignUp ? 'SIGN UP' : 'SIGN IN'
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500 uppercase tracking-wide">Or</span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  onClick={onGoogleSignIn}
                  disabled={loading}
                  className="w-full h-12 sm:h-11 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-full transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-base sm:text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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

                {/* Toggle Sign In / Sign Up */}
                <div className="text-center text-sm text-gray-600 mt-4">
                  {isSignUp ? (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-[#926b7f] hover:underline font-semibold"
                      >
                        Sign In
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={toggleMode}
                        className="text-[#926b7f] hover:underline font-semibold"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
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
        </div>
      </div>
    </>
  );
};
