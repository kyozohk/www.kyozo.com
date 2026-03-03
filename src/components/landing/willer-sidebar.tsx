'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarIcons } from '@/lib/svg-icons';

type WillerSidebarProps = {
  onSignInClick?: () => void;
  onJoinClick?: () => void;
  profileImage?: string;
  handle?: string;
};

export function WillerSidebar({ onSignInClick, onJoinClick, profileImage, handle }: WillerSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-[10px] h-[calc(100vh-20px)] w-[80px] bg-white rounded-[24px] z-40 flex flex-col items-center p-[2px] border-2 border-[#e8dfd0] shrink-0 ml-[10px]">
      {/* Kyozo Icon at Top */}
      <Link
        href="/"
        className="relative rounded-[13.168px] shrink-0 size-[60px] mt-[10px] hover:bg-[#f5f1e8] transition-colors flex flex-col items-center justify-center"
      >
        <div className="h-[36.69px] w-[31.448px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4483 36.6896">
            <path d={sidebarIcons.kyozoBrand} fill="#3F3F3F" />
          </svg>
        </div>
      </Link>

      {/* Divider */}
      <div className="h-[17px] w-[56px] px-[4px] mt-[8px]">
        <div className="bg-[rgba(0,0,0,0.1)] h-px w-full" />
      </div>

      {/* Willer Universe Section */}
      <div className="flex flex-col items-center gap-[8px] py-[8px]">
        {/* Profile Image */}
        <div className="relative shrink-0">
          <div className="relative rounded-full shadow-[0px_0px_0px_2px_#e8dfd0] shrink-0 size-[38px]">
            <img 
              alt="Profile" 
              className="absolute bg-clip-padding border-0 border-transparent max-w-none object-cover rounded-full size-full" 
              src={profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"} 
            />
          </div>
        </div>

        {/* Community Title - Clickable Link to Home */}
        <Link 
          href={handle ? `/${handle}` : "/"}
          className="h-[34px] relative rounded-[10px] shrink-0 w-[56px] flex flex-col items-center hover:bg-[#f5f1e8] transition-colors cursor-pointer"
        >
          <p className="font-bold leading-[16px] text-[#4f4949] text-[12px] text-center">{handle || 'Willer'}</p>
          <p className="font-bold leading-[16px] text-[#4f4949] text-[12px] text-center whitespace-pre-wrap">Universe</p>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-[17px] w-[56px] px-[4px]">
        <div className="bg-[rgba(0,0,0,0.1)] h-px w-full" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 w-full flex flex-col items-center gap-[8px] pt-[10px]">
        {/* Navigation Links */}
        <div className="flex flex-col gap-[12px] items-center">
          {/* About Link */}
          <Link
            href={handle ? `/${handle}/about` : "/about"}
            className={`flex flex-col h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
              (handle && pathname === `/${handle}/about`) || (!handle && pathname === "/about") ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
            }`}
          >
            <div className="relative shrink-0 size-[32px]">
              <div className="flex flex-col items-center justify-center overflow-clip rounded-inherit size-full">
                <div className="flex flex-col gap-[1.067px] items-center justify-center px-[0.853px] py-[2.347px] size-full">
                  <div className="h-[5.813px] w-[20.693px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
                      <path d={sidebarIcons.aboutLine1} fill="#3A3630" />
                      <path d={sidebarIcons.aboutLine2} fill="#3A3630" />
                    </svg>
                  </div>
                  <div className="h-[4.053px] w-[18.862px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2889 4.48">
                      <path d={sidebarIcons.aboutLine3} fill="#3A3630" />
                      <path d={sidebarIcons.aboutLine4} fill="#3A3630" />
                      <path d={sidebarIcons.aboutLine5} fill="#3A3630" />
                    </svg>
                  </div>
                  <div className="h-[5.813px] w-[20.693px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
                      <path d={sidebarIcons.aboutLine1} fill="#3A3630" />
                      <path d={sidebarIcons.aboutLine2} fill="#3A3630" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">About</p>
          </Link>

          {/* Feed Link */}
          <Link
            href={handle ? `/${handle}` : "/"}
            className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
              (handle && pathname === `/${handle}`) || (!handle && pathname === "/") ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
            }`}
          >
            <div className="rotate-180">
              <div className="relative size-[32px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                  <path d={sidebarIcons.feedPath1} fill="#4F4949" />
                  <path d={sidebarIcons.feedPath2} stroke="#4F4949" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
            <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">Feed</p>
          </Link>

          {/* Community Link */}
          {/* <Link
            href="/community"
            className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
              pathname === "/community" ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
            }`}
          >
            <div className="relative shrink-0 size-[30.916px]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.9157 30.9157">
                <path d={sidebarIcons.communityCircle} fill="#3A3630" stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
                <path d={sidebarIcons.communityPath1} stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
                <path d={sidebarIcons.communityPath2} stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
              </svg>
            </div>
            <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">Community</p>
          </Link> */}

        </div>

        {/* Divider */}
        <div className="h-[32px] w-[56px] px-[4px]">
          <div className="bg-[rgba(0,0,0,0.1)] h-px w-full" />
        </div>

        {/* Join Us and Do More Section */}
        <div className="flex flex-col gap-[12px] items-center">
          {/* Sign In Button */}
          <button
            onClick={onSignInClick}
            className="flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors hover:bg-[#f5f1e8]"
          >
            <div className="relative shrink-0 size-[32px]">
              <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                <path d="M16 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" stroke="#3A3630" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#3A3630" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">Sign In</p>
          </button>

          {/* Explore Button */}
          {/* <Link
            href="/explore"
            className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
              pathname === "/explore" ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
            }`}
          >
            <div className="relative shrink-0 size-[32px]">
              <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="10" fill="none" stroke="#3A3630" strokeWidth="2" />
                <path d="M16 8 L16 24 M8 16 L24 16" stroke="#3A3630" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="8" r="1.5" fill="#3A3630" />
                <circle cx="16" cy="24" r="1.5" fill="#3A3630" />
                <circle cx="8" cy="16" r="1.5" fill="#3A3630" />
                <circle cx="24" cy="16" r="1.5" fill="#3A3630" />
              </svg>
            </div>
            <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">Explore</p>
          </Link> */}
        </div>
      </div>

      {/* Modal Link - Bottom */}
      <Link
        href="/modal"
        className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors mb-[10px] ${
          pathname === "/modal" ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
        }`}
      >
        <div className="relative shrink-0 size-[40px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318.746 264.195">
            <g>
              <path d={sidebarIcons.modalPath1} fill="#E9D3B3" stroke="#3A3630" strokeWidth="15" />
              <path d={sidebarIcons.modalPath2} fill="#E9D3B3" stroke="#3A3630" strokeWidth="15" />
              <path d={sidebarIcons.modalPath3} fill="#E9D3B3" stroke="#3A3630" strokeWidth="15" />
              <path d={sidebarIcons.modalPath4} fill="#F2ECE3" stroke="#3A3630" strokeWidth="15" />
              <path d={sidebarIcons.modalPath5} fill="#F2ECE3" stroke="#3A3630" strokeWidth="15" />
              <path d={sidebarIcons.modalPath6} fill="#F2ECE3" stroke="#3A3630" strokeWidth="15" />
            </g>
          </svg>
        </div>
        <p className="font-semibold leading-[16px] text-[12px] text-[rgba(79,73,73,0.9)] text-center">Modal</p>
      </Link>
    </aside>
  );
}
