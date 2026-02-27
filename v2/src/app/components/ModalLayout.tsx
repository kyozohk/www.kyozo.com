import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import svgModalLogo from "@/imports/svg-idr7sqy0wm";
import svgBrandMark from "@/imports/svg-dbcm4od5aw";

export function ModalLayout() {
  const location = useLocation();
  const [isLoggedIn] = useState(false);
  const [loginName] = useState("");
  const [showKyozoMenu, setShowKyozoMenu] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#b8c8d8] flex overflow-x-hidden">
      {/* Left Sidebar - Midnight Blue Theme */}
      <aside className="fixed left-[5px] top-[9px] h-[calc(100vh-18px)] w-[60px] md:left-[10px] md:top-[10px] md:h-[calc(100%-20px)] md:w-[85px] bg-[#1e293b]/95 md:bg-[#1e293b] rounded-[10px] md:rounded-[18px] z-40 flex flex-col items-center p-1.5 md:p-[9px] border-2 border-[#334155]">
        {/* Container with logo and navigation */}
        <div className="flex flex-col gap-[4.6px] md:gap-[5px] items-center w-full">
          {/* Logo Container */}
          <div className="flex flex-col gap-[5px] items-center pb-0 pt-2">
            <Link 
              to="/modal" 
              className={`relative shrink-0 size-[32px] md:size-[41px] rounded-lg transition-all flex items-center justify-center ${ 
                location.pathname === "/modal" 
                  ? "shadow-[0px_0px_0px_4px_#475569]" 
                  : "shadow-[0px_0px_0px_2px_#475569] hover:shadow-[0px_0px_0px_3px_#475569]"
              }`}
            >
              <div className="w-[22px] h-[22px] md:w-[28px] md:h-[28px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 305 258">
                  <g clipPath="url(#clip0_162_42)">
                    <path d={svgModalLogo.p2be54f00} fill="#E2E8F0" stroke="#E2E8F0" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="82.6656" x2="155.666" y1="11.7698" y2="57.7698" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="214.672" x2="146.672" y1="20.226" y2="63.226" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="81.0005" x2="82.0005" y1="237.93" y2="166.93" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="85.9259" x2="220.926" y1="164.001" y2="162.001" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="226" x2="226" y1="159" y2="247" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="82.7298" x2="149.73" y1="169.399" y2="59.399" />
                    <line stroke="#E2E8F0" strokeWidth="10" x1="157.185" x2="225.185" y1="59.2638" y2="163.264" />
                  </g>
                  <defs>
                    <clipPath id="clip0_162_42">
                      <rect fill="white" height="258" width="305" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Link>
            <p className="font-extrabold leading-[15px] text-[#e2e8f0] text-[14px] md:text-[16px] text-center tracking-[-0.5px]">
              Modal
            </p>
          </div>

          {/* Navigation List - Placeholder */}
          <div className="flex flex-col gap-[10px] md:gap-6 items-center px-1 md:px-[6px] w-full mt-2">
            <Link 
              to="/modal" 
              className={`content-stretch flex flex-col items-center justify-center rounded-[10px] md:rounded-[13px] shrink-0 w-[48px] h-[48px] md:size-[60px] transition-colors ${
                location.pathname === "/modal" 
                  ? "bg-[#475569] border-[1.5px] md:border-[2.22px] border-[#475569]" 
                  : "bg-[#334155] hover:bg-[#475569]"
              }`}
            >
              <p className="font-semibold leading-[9px] md:leading-[11px] text-[#e2e8f0] text-[9px] md:text-[11.35px] text-center tracking-[-0.3px] md:tracking-[-0.37px]">
                Home
              </p>
            </Link>
          </div>
        </div>

        {/* Bottom Section: Switch to Willer & Kyozo Home */}
        <div className="mt-auto flex flex-col gap-3 md:gap-4 items-center pb-2">
          {/* Switch to Willer Universe */}
          <Link 
            to="/"
            className="bg-[#334155] content-stretch flex flex-col items-center justify-center rounded-[10px] md:rounded-[13px] shrink-0 w-[48px] h-[48px] md:size-[60px] hover:bg-[#475569] transition-colors"
          >
            <p className="font-semibold leading-[9px] md:leading-[11px] text-[#e2e8f0] text-[8px] md:text-[9px] text-center tracking-[-0.3px] md:tracking-[-0.37px] px-0.5">
              Switch to<br />Willer
            </p>
          </Link>

          {/* Kyozo Home */}
          <button
            onClick={() => setShowKyozoMenu(!showKyozoMenu)}
            className="relative bg-[#334155] content-stretch flex flex-col items-center justify-center rounded-[10px] md:rounded-[13px] shrink-0 w-[48px] h-[48px] md:size-[60px] hover:bg-[#475569] transition-colors"
          >
            <div className="flex items-center justify-center w-[24px] h-[28px] md:w-[31px] md:h-[37px] mb-0.5">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106 128">
                <path d={svgBrandMark.p25ca700} fill="#E2E8F0" />
              </svg>
            </div>
            <p className="font-semibold leading-[9px] md:leading-[11px] text-[#e2e8f0] text-[8px] md:text-[9px] text-center tracking-[-0.3px] md:tracking-[-0.37px] px-0.5">
              Kyozo<br />Home
            </p>
          </button>
        </div>
      </aside>

      {/* Kyozo Popup Menu */}
      {showKyozoMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/10 z-30"
            onClick={() => setShowKyozoMenu(false)}
          />
          
          {/* Popup Menu - Modal Theme */}
          <div className="fixed left-[23px] bottom-[90px] md:left-[33px] md:bottom-[110px] z-40 w-[280px]">
            <div className="bg-[#1e293b] content-stretch flex flex-col items-start p-px rounded-[8px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.3),0px_2px_4px_0px_rgba(0,0,0,0.2)] border-2 border-[#334155]">
              <div className="bg-[#1e293b] content-stretch flex flex-col h-auto items-start overflow-clip relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.3),0px_4px_6px_-4px_rgba(0,0,0,0.2)] shrink-0 w-full">
                {/* Sign in */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[45px] flex items-center justify-between px-[16px] pb-px border-b border-[rgba(255,255,255,0.1)] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Sign in
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>

                {/* Kyozo overview */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[45px] flex items-center justify-between px-[16px] pb-px border-b border-[rgba(255,255,255,0.1)] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Kyozo overview
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>

                {/* Explore Artists & Communities */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[45px] flex items-center justify-between px-[16px] pb-px border-b border-[rgba(255,255,255,0.1)] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Explore Artists & Communities
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>

                {/* Join the waitlist */}
                <button 
                  onClick={() => {
                    setShowKyozoMenu(false);
                  }}
                  className="w-full h-[44px] flex items-center justify-between px-[16px] hover:bg-[#334155] transition-colors"
                >
                  <p className="font-medium leading-[20px] text-[#e2e8f0] text-[13px] tracking-[-0.1504px]">
                    Join the waitlist
                  </p>
                  <div className="relative shrink-0 size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M6 12L10 8L6 4" stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 ml-[70px] md:ml-[105px] w-[calc(100%-70px)] md:w-auto">
        {/* Background overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(200,210,220,0.6)] inset-0 mix-blend-overlay" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-[2px] px-2 md:px-12 pt-[13px] pb-2 md:py-4">
          <div className="max-w-[1632px] mx-auto flex items-center justify-end gap-3 md:gap-8">
            {/* Sign In Button - Styled for Modal */}
            {!isLoggedIn && (
              <div className="flex items-center gap-0 flex-shrink-0">
                <button
                  className="backdrop-blur-[4px] bg-[#475569] border-2 border-[#64748b] px-3 md:px-4 py-1.5 md:py-2 rounded-[9px] md:rounded-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#334155] transition-colors h-[40px]"
                >
                  Sign in
                </button>
              </div>
            )}
            {isLoggedIn && (
              <div className="flex items-center gap-2 md:gap-3 bg-gradient-to-br from-[#475569] to-[#334155] px-2 md:px-4 py-1.5 md:py-2 rounded-xl shadow-md h-[32px] md:h-[40px]">
                <div className="size-6 md:size-8 rounded-full bg-[#64748b] flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {loginName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-xs md:text-sm text-white hidden sm:inline">{loginName}</span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
}