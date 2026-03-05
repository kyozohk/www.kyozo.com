import { Link, useLocation } from "react-router";
import svgPaths from "@/imports/svg-yz0m3yj1hh";
import modalSvgPaths from "@/imports/svg-ivmz7r094b";

type VisionaryCircleSidebarProps = {
  setShowSignInModal: (show: boolean) => void;
  setShowJoinKyozoModal: (show: boolean) => void;
};

export function VisionaryCircleSidebar({ setShowSignInModal, setShowJoinKyozoModal }: VisionaryCircleSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Sidebar with darker theme */}
      <aside className="sticky left-0 top-[10px] h-[calc(100vh-20px)] w-[80px] bg-[#3a3a3a] rounded-[24px] z-40 flex flex-col items-center p-[2px] border-2 border-[#2a2a2a] shrink-0 ml-[10px]">
        {/* Kyozo Icon at Top */}
        <button
          onClick={() => {/* Navigate to Kyozo overview or home */}}
          className="relative rounded-[13.168px] shrink-0 size-[60px] mt-[10px] hover:bg-[#4a4a4a] transition-colors flex flex-col items-center justify-center"
        >
          <div className="h-[36.69px] w-[31.448px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4483 36.6896">
              <path d={svgPaths.p1b92c200} fill="#b0b0b0" />
            </svg>
          </div>
        </button>

        {/* Divider */}
        <div className="h-[17px] w-[56px] px-[4px] mt-[8px]">
          <div className="bg-[rgba(255,255,255,0.2)] h-px w-full" />
        </div>

        {/* Visionary Circle Section */}
        <div className="flex flex-col items-center gap-[8px] py-[8px]">
          {/* Profile Circle with VC initials */}
          <div className="relative shrink-0">
            <div className="relative rounded-full shadow-[0px_0px_0px_2px_#2a2a2a] shrink-0 size-[38px] bg-[#7c6f84] border-2 border-[#9b8ea5] flex items-center justify-center">
              <span className="text-sm font-bold text-white">VC</span>
            </div>
          </div>

          {/* Visionary Circle Title - Clickable Link to Home */}
          <Link 
            to="/visionary-circle"
            className="h-[34px] relative rounded-[10px] shrink-0 w-[56px] flex flex-col items-center hover:bg-[#4a4a4a] transition-colors cursor-pointer"
          >
            <p className="font-bold leading-[16px] text-[#e0e0e0] text-[12px] text-center">Visionary</p>
            <p className="font-bold leading-[16px] text-[#e0e0e0] text-[12px] text-center whitespace-pre-wrap">Circle</p>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-[17px] w-[56px] px-[4px]">
          <div className="bg-[rgba(255,255,255,0.2)] h-px w-full" />
        </div>

        {/* Main Navigation */}
        <div className="flex-1 w-full flex flex-col items-center gap-[8px] pt-[10px]">
          {/* Navigation Links */}
          <div className="flex flex-col gap-[12px] items-center">
            {/* About Link */}
            <Link
              to="/visionary-circle/bio"
              className={`flex flex-col h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
                location.pathname === "/visionary-circle/bio" ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
              }`}
            >
              <div className="relative shrink-0 size-[32px]">
                <div className="flex flex-col items-center justify-center overflow-clip rounded-inherit size-full">
                  <div className="flex flex-col gap-[1.067px] items-center justify-center px-[0.853px] py-[2.347px] size-full">
                    <div className="h-[5.813px] w-[20.693px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
                        <path d={svgPaths.p3ac88f00} fill="#b0b0b0" />
                        <path d={svgPaths.p3db55400} fill="#b0b0b0" />
                      </svg>
                    </div>
                    <div className="h-[4.053px] w-[18.862px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2889 4.48">
                        <path d={svgPaths.p34fb9080} fill="#b0b0b0" />
                        <path d={svgPaths.p29813280} fill="#b0b0b0" />
                        <path d={svgPaths.p13f2d100} fill="#b0b0b0" />
                      </svg>
                    </div>
                    <div className="h-[5.813px] w-[20.693px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
                        <path d={svgPaths.p3ac88f00} fill="#b0b0b0" />
                        <path d={svgPaths.p3db55400} fill="#b0b0b0" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(224,224,224,0.9)] text-center">About</p>
            </Link>

            {/* Feed Link */}
            <Link
              to="/visionary-circle/feed"
              className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
                location.pathname === "/visionary-circle/feed" ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
              }`}
            >
              <div className="rotate-180">
                <div className="relative size-[32px]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                    <path d={svgPaths.pb1b74f0} fill="#b0b0b0" />
                    <path d={svgPaths.p1310b200} stroke="#b0b0b0" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(224,224,224,0.9)] text-center">Feed</p>
            </Link>

            {/* Community Link - Commented Out */}
            {/* <Link
              to="/visionary-circle/community"
              className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
                location.pathname === "/visionary-circle/community" ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
              }`}
            >
              <div className="relative shrink-0 size-[30.916px]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.9157 30.9157">
                  <path d={svgPaths.p34d77080} fill="#b0b0b0" stroke="#b0b0b0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
                  <path d={svgPaths.p3f012300} stroke="#b0b0b0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
                  <path d={svgPaths.p28826c40} stroke="#b0b0b0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.21739" />
                </svg>
              </div>
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(224,224,224,0.9)] text-center">Community</p>
            </Link> */}
          </div>

          {/* Divider */}
          <div className="h-[32px] w-[56px] px-[4px]">
            <div className="bg-[rgba(255,255,255,0.2)] h-px w-full" />
          </div>

          {/* Join Us and Do More Section */}
          <div className="flex flex-col gap-[12px] items-center">
            {/* Sign In Button */}
            <button
              onClick={() => setShowSignInModal(true)}
              className="flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors hover:bg-[#4a4a4a]"
            >
              <div className="relative shrink-0 size-[32px]">
                <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                  <path d="M16 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" stroke="#b0b0b0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#b0b0b0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(224,224,224,0.9)] text-center">Sign In</p>
            </button>

            {/* Explore Button - Commented Out */}
            {/* <Link
              to="/explore"
              className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
                location.pathname === "/explore" ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
              }`}
            >
              <div className="relative shrink-0 size-[32px]">
                <svg className="block size-full" fill="none" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="10" fill="none" stroke="#b0b0b0" strokeWidth="2" />
                  <path d="M16 8 L16 24 M8 16 L24 16" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="8" r="1.5" fill="#b0b0b0" />
                  <circle cx="16" cy="24" r="1.5" fill="#b0b0b0" />
                  <circle cx="8" cy="16" r="1.5" fill="#b0b0b0" />
                  <circle cx="24" cy="16" r="1.5" fill="#b0b0b0" />
                </svg>
              </div>
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(224,224,224,0.9)] text-center">Explore</p>
            </Link> */}
          </div>
        </div>

        {/* Modal Link - Bottom */}
        <Link
          to="/modal"
          className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors mb-[10px] ${
            location.pathname === "/modal" ? "bg-[#4a4a4a]" : "hover:bg-[#4a4a4a]"
          }`}
        >
          <div className="relative shrink-0 size-[40px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318.746 264.195">
              <g>
                <path d={modalSvgPaths.p2691ca00} fill="#5a5a5a" stroke="#b0b0b0" strokeWidth="15" />
                <path d={modalSvgPaths.p31747500} fill="#5a5a5a" stroke="#b0b0b0" strokeWidth="15" />
                <path d={modalSvgPaths.p3f19bb00} fill="#5a5a5a" stroke="#b0b0b0" strokeWidth="15" />
                <path d={modalSvgPaths.p8032400} fill="#6a6a6a" stroke="#b0b0b0" strokeWidth="15" />
                <path d={modalSvgPaths.p1c380780} fill="#6a6a6a" stroke="#b0b0b0" strokeWidth="15" />
                <path d={modalSvgPaths.p369c1080} fill="#6a6a6a" stroke="#b0b0b0" strokeWidth="15" />
              </g>
            </svg>
          </div>
          <p className="font-semibold leading-[16px] text-[12px] text-[rgba(224,224,224,0.9)] text-center">Modal</p>
        </Link>
      </aside>
    </>
  );
}
