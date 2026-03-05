import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import imgListenVertical from "/assets/imgListenVertical.png";
import imgListenVertical1 from "/assets/imgListenVertical.png";
import imgHerbieHancocksModalJazzGem from "/assets/imgListenVertical.png";
import imgListenVertical2 from "/assets/imgListenVertical.png";

type FilterType = "All" | "Read" | "Listen" | "Watch";

type OutletContext = {
  isLoggedIn: boolean;
  hasJoinedCommunity: boolean;
  activeFilter: FilterType;
  setShowJoinCommunityModal: (show: boolean) => void;
  setShowSignInModal: (show: boolean) => void;
};

export function VisionaryCircleHome() {
  const { isLoggedIn, hasJoinedCommunity, activeFilter, setShowJoinCommunityModal, setShowSignInModal } = useOutletContext<OutletContext>();
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for joining! We'll send updates to ${email}`);
      setEmail("");
    }
  };

  const shouldShowArticle = (type: "Text" | "Image" | "Audio" | "Watch") => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Read" && type === "Text") return true;
    if (activeFilter === "Listen" && type === "Audio") return true;
    if (activeFilter === "Watch" && (type === "Watch" || type === "Image")) return true;
    return false;
  };

  return (
    <main className="max-w-[1090px] mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-12 md:pb-20">
      {/* Hero Section */}
      <section className="mb-4 md:mb-6 flex flex-col md:flex-row items-start justify-between gap-3 md:gap-6">
        <div className="flex-1 w-full">
          <h2 className="font-bold text-2xl md:text-5xl leading-[32px] md:leading-[58px] tracking-[-0.5px] md:tracking-[-1px] mb-2 md:mb-3 text-[#c5b9cb]">
            Welcome to the Visionary Circle
          </h2>
          <p className="text-sm md:text-2xl text-[#b0b0b0] font-normal leading-[22px] md:leading-normal">
            The Kyozo Investor Pool - A private community for strategic partners and investors shaping the future of creative innovation.
          </p>
        </div>
        <div className="flex-shrink-0 hidden md:block">
          <div className="size-[100px] rounded-full bg-[#7c6f84] border-4 border-[#9b8ea5] flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">VC</span>
          </div>
        </div>
      </section>

      {/* Compact Join CTA */}
      {!isLoggedIn && !hasJoinedCommunity && (
        <section className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[12px] md:rounded-[16px] p-3 md:p-4 mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 border border-[#5a5a5a]">
          <div className="flex-1 w-full">
            <p className="text-[13px] md:text-[16px] text-[#e0e0e0] leading-5 md:leading-6 tracking-[-0.1px] md:tracking-[-0.2px]">
              <span className="font-bold text-[#9b8ea5]">This is a private, invitation-only community.</span> Please sign in or request access to view exclusive content and insights.
            </p>
          </div>
          <div className="flex items-center gap-0 flex-shrink-0">
            <button
              onClick={() => setShowJoinCommunityModal(true)}
              className="bg-[#7c6f84] border-2 border-[#9b8ea5] px-3 md:px-4 py-1.5 md:py-2 rounded-l-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#8c7f94] transition-colors h-[32px] md:h-[40px] whitespace-nowrap"
            >
              Request Access
            </button>
            <button
              onClick={() => setShowSignInModal(true)}
              className="bg-[#6a5f74] border-2 border-[#9b8ea5] border-l-0 px-3 md:px-4 py-1.5 md:py-2 rounded-r-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#7a6f84] transition-colors h-[32px] md:h-[40px] whitespace-nowrap"
            >
              Sign in
            </button>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Row 1 - Two column layout */}
        {(shouldShowArticle("Audio") || shouldShowArticle("Image")) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* First Article - Audio */}
            {shouldShowArticle("Audio") && (
              <Link to="/visionary-circle/article/investment-insights" className="block">
                <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all cursor-pointer h-full">
                  <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                    LISTEN
                  </span>
                  <h3 className="font-bold text-lg md:text-xl text-[#e0e0e0] mb-2 leading-tight">
                    Investment Insights: The Sound of Innovation
                  </h3>
                  <p className="text-sm md:text-base text-[#b0b0b0] mb-4 line-clamp-3">
                    Exploring opportunities at the intersection of creativity and technology in the modern investment landscape.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9b8ea5]">12 min listen</span>
                    <img src={imgListenVertical} alt="Audio thumbnail" className="w-16 h-16 rounded-lg object-cover" />
                  </div>
                </article>
              </Link>
            )}

            {/* Second Article - Image/Watch */}
            {shouldShowArticle("Image") && (
              <Link to="/visionary-circle/article/q4-portfolio-review" className="block">
                <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all cursor-pointer h-full">
                  <img src={imgListenVertical1} alt="Featured content" className="w-full h-48 object-cover" />
                  <div className="p-4 md:p-6">
                    <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                      FEATURED
                    </span>
                    <h3 className="font-bold text-lg md:text-xl text-[#e0e0e0] mb-2 leading-tight">
                      Q4 Portfolio Review
                    </h3>
                    <p className="text-sm md:text-base text-[#b0b0b0] line-clamp-2">
                      Quarterly insights and strategic updates from our investment committee.
                    </p>
                  </div>
                </article>
              </Link>
            )}
          </div>
        )}

        {/* Row 2 - Large feature */}
        {shouldShowArticle("Watch") && (
          <Link to="/visionary-circle/article/visionary-conversations" className="block">
            <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all cursor-pointer">
              <div className="md:flex">
                <img src={imgHerbieHancocksModalJazzGem} alt="Featured video" className="w-full md:w-1/2 h-64 md:h-auto object-cover" />
                <div className="p-4 md:p-8 flex flex-col justify-center md:w-1/2">
                  <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3 w-fit">
                    WATCH
                  </span>
                  <h3 className="font-bold text-xl md:text-3xl text-[#e0e0e0] mb-3 leading-tight">
                    Visionary Conversations
                  </h3>
                  <p className="text-sm md:text-lg text-[#b0b0b0] mb-4">
                    Exclusive interviews with industry leaders and innovators shaping tomorrow's creative economy.
                  </p>
                  <span className="text-xs text-[#9b8ea5]">45 min watch</span>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Row 3 - Two column layout */}
        {(shouldShowArticle("Text") || shouldShowArticle("Audio")) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Third Article - Text */}
            {shouldShowArticle("Text") && (
              <Link to="/visionary-circle/article/market-analysis" className="block">
                <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all cursor-pointer h-full">
                  <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                    READ
                  </span>
                  <h3 className="font-bold text-lg md:text-xl text-[#e0e0e0] mb-2 leading-tight">
                    Market Analysis: Creative Tech Sector
                  </h3>
                  <p className="text-sm md:text-base text-[#b0b0b0] line-clamp-4">
                    Deep dive into emerging trends and investment opportunities in the creative technology sector for Q1 2026.
                  </p>
                  <span className="inline-block mt-4 text-xs text-[#9b8ea5]">8 min read</span>
                </article>
              </Link>
            )}

            {/* Fourth Article - Audio */}
            {shouldShowArticle("Audio") && (
              <Link to="/visionary-circle/article/portfolio-update-podcast" className="block">
                <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all cursor-pointer h-full">
                  <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                    LISTEN
                  </span>
                  <h3 className="font-bold text-lg md:text-xl text-[#e0e0e0] mb-2 leading-tight">
                    Portfolio Update Podcast
                  </h3>
                  <p className="text-sm md:text-base text-[#b0b0b0] mb-4 line-clamp-3">
                    Monthly briefing on portfolio performance, strategic initiatives, and upcoming opportunities.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#9b8ea5]">20 min listen</span>
                    <img src={imgListenVertical2} alt="Audio thumbnail" className="w-16 h-16 rounded-lg object-cover" />
                  </div>
                </article>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Email Signup Section */}
      <section className="mt-8 md:mt-12 bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-6 md:p-10 text-center border border-[#5a5a5a]">
        <h3 className="font-bold text-xl md:text-3xl text-[#e0e0e0] mb-3">Stay Informed</h3>
        <p className="text-sm md:text-lg text-[#b0b0b0] mb-6 max-w-2xl mx-auto">
          Receive exclusive updates, market insights, and investment opportunities directly to your inbox.
        </p>
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border-2 border-[#5a5a5a] bg-[#3a3a3a] text-[#e0e0e0] placeholder:text-[#808080] focus:outline-none focus:border-[#9b8ea5]"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#7c6f84] text-white font-semibold rounded-full hover:bg-[#8c7f94] transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}