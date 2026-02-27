import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { FilterTabs } from "@/app/components/FilterTabs";
import { Sidebar } from "@/app/components/Sidebar";
import svgPathsNav from "@/imports/svg-hs9nmjokmr";
import svgBrandMark from "@/imports/svg-dbcm4od5aw";
import svgModalLogo from "@/imports/svg-idr7sqy0wm";
const imgEllipse1 = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";
const imgImageProfile = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop";

type FilterType = "All" | "Read" | "Listen" | "Watch";

export function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showJoinKyozoModal, setShowJoinKyozoModal] = useState(false);
  const [showJoinCommunityModal, setShowJoinCommunityModal] = useState(false);
  const [showKyozoMenu, setShowKyozoMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [hasJoinedCommunity, setHasJoinedCommunity] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  
  // Sign in form fields (simplified)
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Join Kyozo form fields
  const [kyozoGivenName, setKyozoGivenName] = useState("");
  const [kyozoLastName, setKyozoLastName] = useState("");
  const [kyozoEmail, setKyozoEmail] = useState("");
  const [kyozoMobileNumber, setKyozoMobileNumber] = useState("");
  const [kyozoVerificationCode, setKyozoVerificationCode] = useState("");
  const [kyozoAgreedToTerms, setKyozoAgreedToTerms] = useState(false);
  
  // Join Willer Universe form fields
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Step tracking
  const [joinKyozoStep, setJoinKyozoStep] = useState(1); // 1: form, 2: 2FA, 3: success
  const [joinCommunityStep, setJoinCommunityStep] = useState(1); // 1: form, 2: 2FA, 3: success

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (signInEmail && signInPassword) {
      // Extract name from email or use a default
      const nameFromEmail = signInEmail.split('@')[0];
      setLoginName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
      setIsLoggedIn(true);
      setShowSignInModal(false);
      resetSignInForm();
    }
  };

  const handleJoinKyozoNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinKyozoStep === 1 && kyozoGivenName && kyozoLastName && kyozoEmail && kyozoMobileNumber && kyozoAgreedToTerms) {
      setJoinKyozoStep(2);
    } else if (joinKyozoStep === 2 && kyozoVerificationCode) {
      setJoinKyozoStep(3);
      setTimeout(() => {
        setLoginName(kyozoGivenName);
        setIsLoggedIn(true);
        setShowJoinKyozoModal(false);
        resetJoinKyozoForm();
      }, 2000);
    }
  };

  const handleJoinCommunityNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinCommunityStep === 1 && givenName && lastName && email && mobileNumber && agreedToTerms) {
      setJoinCommunityStep(2);
    } else if (joinCommunityStep === 2 && verificationCode) {
      setJoinCommunityStep(3);
      setTimeout(() => {
        setLoginName(givenName);
        setIsLoggedIn(true);
        setHasJoinedCommunity(true);
        setShowJoinCommunityModal(false);
        resetJoinCommunityForm();
      }, 2000);
    }
  };

  const resetSignInForm = () => {
    setSignInEmail("");
    setSignInPassword("");
    setRememberMe(false);
  };

  const resetJoinKyozoForm = () => {
    setKyozoGivenName("");
    setKyozoLastName("");
    setKyozoEmail("");
    setKyozoMobileNumber("");
    setKyozoVerificationCode("");
    setKyozoAgreedToTerms(false);
    setJoinKyozoStep(1);
  };

  const resetJoinCommunityForm = () => {
    setGivenName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
    setVerificationCode("");
    setAgreedToTerms(false);
    setJoinCommunityStep(1);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setLoginName("");
    setHasJoinedCommunity(false);
  };

  // Determine if the current page should show filter tabs
  const showFilterTabs = location.pathname === "/" || location.pathname === "/feed";

  return (
    <div className="relative min-h-screen bg-[#bfbebd] flex">
      {/* New Sidebar Component */}
      <Sidebar 
        setShowSignInModal={setShowSignInModal}
        setShowJoinKyozoModal={setShowJoinKyozoModal}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Background overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(231,226,215,0.8)] inset-0 mix-blend-overlay" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-[2px] px-2 md:px-12 pt-[13px] pb-2 md:py-4">
          <div className="max-w-[1632px] mx-auto flex items-center justify-center md:justify-between gap-3 md:gap-8 relative">
            {/* Filter Tabs - Centered between sidebar and right edge on mobile */}
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1 flex items-center justify-center" style={{ left: 'calc(30px + 50%)' }}>
              {showFilterTabs && (
                <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              )}
            </div>

            {/* User Profile Display (if logged in) */}
            {isLoggedIn && (
              <div className="hidden md:flex items-center gap-2 md:gap-3 bg-gradient-to-br from-[#d5cab8] to-[#c9bfad] px-2 md:px-4 py-1.5 md:py-2 rounded-xl shadow-md h-[32px] md:h-[40px]">
                <div className="size-6 md:size-8 rounded-full bg-[#926b7f] flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {loginName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-xs md:text-sm text-[#3A3630] hidden sm:inline">{loginName}</span>
                <button
                  onClick={handleSignOut}
                  className="ml-1 md:ml-2 text-[10px] md:text-xs text-[#3A3630] hover:underline hidden sm:inline"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Sign In Modal */}
        {showSignInModal && (
          <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center md:p-4">
            <div className="bg-gradient-to-br from-[#f8f7fc] to-[#fefefe] w-full h-full md:h-auto md:rounded-3xl shadow-2xl md:max-w-md p-6 md:p-10 animate-in fade-in md:zoom-in-95 duration-200 overflow-y-auto relative">
              {/* Exit Button */}
              <button
                onClick={() => {
                  setShowSignInModal(false);
                  resetSignInForm();
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group z-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-[#9ca3af] group-hover:text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Sign In</h2>
                <p className="text-sm md:text-base text-[#6b7280]">
                  Welcome back to Kyozo
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="signin-email" className="block text-sm font-semibold text-[#111827] mb-2">
                    Email Address <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="signin-password" className="block text-sm font-semibold text-[#111827] mb-2">
                    Password <span className="text-[#ef4444]">*</span>
                  </label>
                  <input
                    id="signin-password"
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="signin-remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-5 rounded border-[#e5e7eb] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]"
                  />
                  <label htmlFor="signin-remember" className="text-sm text-[#6b7280]">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Sign In
                </button>
              </form>

              {/* Don't have an account link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-[#6b7280]">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setShowSignInModal(false);
                      resetSignInForm();
                      setShowJoinCommunityModal(true);
                    }}
                    className="text-[#6366f1] hover:underline font-semibold"
                  >
                    Join
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Join Kyozo Modal */}
        {showJoinKyozoModal && (
          <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center md:p-4">
            <div className="bg-gradient-to-br from-[#f8f7fc] to-[#fefefe] w-full h-full md:h-auto md:rounded-3xl shadow-2xl md:max-w-lg p-6 md:p-10 animate-in fade-in md:zoom-in-95 duration-200 overflow-y-auto relative">
              {/* Exit Button */}
              <button
                onClick={() => {
                  setShowJoinKyozoModal(false);
                  resetJoinKyozoForm();
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group z-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-[#9ca3af] group-hover:text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {joinKyozoStep === 1 && (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide">STEP 1 OF 2</span>
                      <span className="text-sm font-semibold text-[#9ca3af]">50%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] rounded-full"></div>
                    </div>
                  </div>

                  {/* Header with Kyozo Logo */}
                  <div className="flex items-start justify-between mb-8 pr-8">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="relative shrink-0 size-12 md:size-14 mt-1 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" preserveAspectRatio="none" viewBox="0 0 106 128">
                          <path d={svgBrandMark.p25ca700} fill="#3F3F3F" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-[#111827] mb-2 md:mb-3">Welcome to Kyozo</h2>
                        <p className="text-sm md:text-base text-[#6b7280]">Let's start with your basic information</p>
                      </div>
                    </div>
                    <button className="hidden md:flex px-5 py-2 border-2 border-[#6366f1] text-[#6366f1] rounded-full text-sm font-semibold hover:bg-[#6366f1] hover:text-white transition-colors whitespace-nowrap">
                      Fill Info
                    </button>
                  </div>

                  <form onSubmit={handleJoinKyozoNext} className="space-y-4 md:space-y-5">
                    <div>
                      <label htmlFor="kyozo-givenName" className="block text-sm font-semibold text-[#111827] mb-2">
                        Given Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="kyozo-givenName"
                        type="text"
                        value={kyozoGivenName}
                        onChange={(e) => setKyozoGivenName(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="Enter your given name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="kyozo-lastName" className="block text-sm font-semibold text-[#111827] mb-2">
                        Last Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="kyozo-lastName"
                        type="text"
                        value={kyozoLastName}
                        onChange={(e) => setKyozoLastName(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="kyozo-email" className="block text-sm font-semibold text-[#111827] mb-2">
                        Email Address <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="kyozo-email"
                        type="email"
                        value={kyozoEmail}
                        onChange={(e) => setKyozoEmail(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="kyozo-mobileNumber" className="block text-sm font-semibold text-[#111827] mb-2">
                        Mobile Number <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="kyozo-mobileNumber"
                        type="tel"
                        value={kyozoMobileNumber}
                        onChange={(e) => setKyozoMobileNumber(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        id="kyozo-terms"
                        type="checkbox"
                        checked={kyozoAgreedToTerms}
                        onChange={(e) => setKyozoAgreedToTerms(e.target.checked)}
                        className="mt-1 size-5 rounded border-[#e5e7eb] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]"
                        required
                      />
                      <label htmlFor="kyozo-terms" className="text-sm text-[#6b7280]">
                        I agree to the <a href="#" className="text-[#6366f1] hover:underline">Terms and Conditions</a> and consent to being contacted
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-4 md:pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowJoinKyozoModal(false);
                          resetJoinKyozoForm();
                        }}
                        className="flex items-center gap-2 px-4 md:px-5 py-3 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center justify-center gap-2 mt-6 md:mt-8 text-sm text-[#9ca3af]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Private invitation-only access
                  </div>
                </>
              )}

              {joinKyozoStep === 2 && (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide">STEP 2 OF 2</span>
                      <span className="text-sm font-semibold text-[#9ca3af]">100%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full w-[100%] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] rounded-full"></div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Verify Your Identity</h2>
                    <p className="text-sm md:text-base text-[#6b7280]">
                      We've sent a verification code to <span className="font-semibold text-[#111827]">{kyozoMobileNumber}</span>
                    </p>
                  </div>

                  <form onSubmit={handleJoinKyozoNext} className="space-y-6">
                    <div>
                      <label htmlFor="kyozo-code" className="block text-sm font-semibold text-[#111827] mb-2 text-center">
                        Enter Verification Code
                      </label>
                      <input
                        id="kyozo-code"
                        type="text"
                        value={kyozoVerificationCode}
                        onChange={(e) => setKyozoVerificationCode(e.target.value)}
                        className="w-full px-4 md:px-5 py-4 md:py-5 bg-white border-2 border-[#e5e7eb] rounded-2xl text-2xl text-center font-bold text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all tracking-widest"
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full text-center text-sm text-[#6366f1] hover:underline font-medium"
                    >
                      Resend Code
                    </button>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setJoinKyozoStep(1)}
                        className="flex items-center gap-2 px-4 md:px-5 py-3 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Verify
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </>
              )}

              {joinKyozoStep === 3 && (
                <div className="flex flex-col items-center justify-center py-8 md:py-12">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 text-center">Welcome to Kyozo!</h2>
                  <p className="text-base md:text-lg text-[#6b7280] text-center">
                    Your account has been successfully created
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Join Community Modal */}
        {showJoinCommunityModal && (
          <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center md:p-4">
            <div className="bg-gradient-to-br from-[#f8f7fc] to-[#fefefe] w-full h-full md:h-auto md:rounded-3xl shadow-2xl md:max-w-lg p-6 md:p-10 animate-in fade-in md:zoom-in-95 duration-200 overflow-y-auto relative">
              {/* Exit Button */}
              <button
                onClick={() => {
                  setShowJoinCommunityModal(false);
                  resetJoinCommunityForm();
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group z-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-[#9ca3af] group-hover:text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {joinCommunityStep === 1 && (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide">STEP 1 OF 2</span>
                      <span className="text-sm font-semibold text-[#9ca3af]">50%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] rounded-full"></div>
                    </div>
                  </div>

                  {/* Header with Willer Universe Logo */}
                  <div className="flex items-start justify-between mb-8 pr-8">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="relative shrink-0 size-12 md:size-14 mt-1">
                        <img alt="Willer Universe" className="block size-full rounded-full" src={imgEllipse1} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-[#111827] mb-2 md:mb-3">Willer Universe</h2>
                        <p className="text-sm md:text-base text-[#6b7280]">Let's start with your basic information</p>
                      </div>
                    </div>
                    <button className="hidden md:flex px-5 py-2 border-2 border-[#6366f1] text-[#6366f1] rounded-full text-sm font-semibold hover:bg-[#6366f1] hover:text-white transition-colors whitespace-nowrap">
                      Fill Info
                    </button>
                  </div>

                  <form onSubmit={handleJoinCommunityNext} className="space-y-4 md:space-y-5">
                    <div>
                      <label htmlFor="community-givenName" className="block text-sm font-semibold text-[#111827] mb-2">
                        Given Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="community-givenName"
                        type="text"
                        value={givenName}
                        onChange={(e) => setGivenName(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="Enter your given name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="community-lastName" className="block text-sm font-semibold text-[#111827] mb-2">
                        Last Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="community-lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="community-email" className="block text-sm font-semibold text-[#111827] mb-2">
                        Email Address <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="community-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="community-mobileNumber" className="block text-sm font-semibold text-[#111827] mb-2">
                        Mobile Number <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        id="community-mobileNumber"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        id="community-terms"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 size-5 rounded border-[#e5e7eb] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]"
                        required
                      />
                      <label htmlFor="community-terms" className="text-sm text-[#6b7280]">
                        I agree to the <a href="#" className="text-[#6366f1] hover:underline">Terms and Conditions</a> and consent to being contacted
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-4 md:pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowJoinCommunityModal(false);
                          resetJoinCommunityForm();
                        }}
                        className="flex items-center gap-2 px-4 md:px-5 py-3 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center justify-center gap-2 mt-6 md:mt-8 text-sm text-[#9ca3af]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Private invitation-only access
                  </div>
                </>
              )}

              {joinCommunityStep === 2 && (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide">STEP 2 OF 2</span>
                      <span className="text-sm font-semibold text-[#9ca3af]">100%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full w-[100%] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] rounded-full"></div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Verify Your Identity</h2>
                    <p className="text-sm md:text-base text-[#6b7280]">
                      We've sent a verification code to <span className="font-semibold text-[#111827]">{mobileNumber}</span>
                    </p>
                  </div>

                  <form onSubmit={handleJoinCommunityNext} className="space-y-6">
                    <div>
                      <label htmlFor="community-code" className="block text-sm font-semibold text-[#111827] mb-2 text-center">
                        Enter Verification Code
                      </label>
                      <input
                        id="community-code"
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-4 md:px-5 py-4 md:py-5 bg-white border-2 border-[#e5e7eb] rounded-2xl text-2xl text-center font-bold text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all tracking-widest"
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                    </div>

                    <button
                      type="button"
                      className="w-full text-center text-sm text-[#6366f1] hover:underline font-medium"
                    >
                      Resend Code
                    </button>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setJoinCommunityStep(1)}
                        className="flex items-center gap-2 px-4 md:px-5 py-3 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                      >
                        Verify
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </>
              )}

              {joinCommunityStep === 3 && (
                <div className="flex flex-col items-center justify-center py-8 md:py-12">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 text-center">Welcome to Willer Universe!</h2>
                  <p className="text-base md:text-lg text-[#6b7280] text-center">
                    You've successfully joined the community
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <Outlet context={{ isLoggedIn, hasJoinedCommunity, activeFilter, setShowJoinCommunityModal, setShowSignInModal }} />
      </div>
    </div>
  );
}