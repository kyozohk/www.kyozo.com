import { useOutletContext } from "react-router";
const imgListenVertical = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop";
const imgListenVertical1 = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop";
const imgListenVertical2 = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop";

type FilterType = "All" | "Read" | "Listen" | "Watch";

type OutletContext = {
  activeFilter: FilterType;
};

export function VisionaryCircleFeed() {
  const { activeFilter } = useOutletContext<OutletContext>();

  const shouldShowArticle = (type: "Text" | "Audio" | "Watch") => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Read" && type === "Text") return true;
    if (activeFilter === "Listen" && type === "Audio") return true;
    if (activeFilter === "Watch" && type === "Watch") return true;
    return false;
  };

  return (
    <main className="max-w-[1090px] mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-12 md:pb-20">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#c5b9cb] mb-2">Investment Feed</h1>
        <p className="text-base md:text-lg text-[#b0b0b0]">
          Latest insights, updates, and opportunities from Visionary Circle
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {/* Article 1 - Market Update */}
        {shouldShowArticle("Text") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                  READ
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  Q1 2026 Market Analysis: Creative Tech Sector
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Comprehensive analysis of market trends, emerging opportunities, and strategic recommendations for the coming quarter.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Feb 20, 2026</span>
                  <span>•</span>
                  <span>12 min read</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Article 2 - Portfolio Update Podcast */}
        {shouldShowArticle("Audio") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                  LISTEN
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  Monthly Portfolio Briefing - February 2026
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Portfolio performance review, strategic updates, and upcoming investment opportunities discussed by the investment committee.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Feb 15, 2026</span>
                  <span>•</span>
                  <span>28 min listen</span>
                </div>
              </div>
              <img src={imgListenVertical} alt="Audio thumbnail" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            </div>
          </article>
        )}

        {/* Article 3 - Investment Opportunity */}
        {shouldShowArticle("Text") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#9b8ea5] text-white text-xs font-semibold rounded-full mb-3">
                  OPPORTUNITY
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  New Deal: AI-Powered Music Production Platform
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Series A opportunity in a revolutionary AI-driven music creation platform. Early access for Visionary Circle members.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Feb 12, 2026</span>
                  <span>•</span>
                  <span>10 min read</span>
                  <span className="px-2 py-1 bg-[#7c6f84] text-white rounded-full">Active Deal</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Article 4 - Insights Audio */}
        {shouldShowArticle("Audio") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                  LISTEN
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  Investment Insights: The Sound of Innovation
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Exploring opportunities at the intersection of creativity and technology in the modern investment landscape.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Feb 8, 2026</span>
                  <span>•</span>
                  <span>18 min listen</span>
                </div>
              </div>
              <img src={imgListenVertical1} alt="Audio thumbnail" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            </div>
          </article>
        )}

        {/* Article 5 - Video Interview */}
        {shouldShowArticle("Watch") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                  WATCH
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  Visionary Conversations: Future of Creative Economy
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Exclusive interview with industry leaders discussing the evolution of creative technology and investment opportunities.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Feb 5, 2026</span>
                  <span>•</span>
                  <span>42 min watch</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Article 6 - Deep Dive */}
        {shouldShowArticle("Text") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                  READ
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  Deep Dive: Emerging Trends in Audio Technology
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Detailed analysis of breakthrough innovations in spatial audio, AI-generated sound, and next-generation audio interfaces.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Feb 1, 2026</span>
                  <span>•</span>
                  <span>15 min read</span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Article 7 - Investor Update */}
        {shouldShowArticle("Audio") && (
          <article className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[16px] md:rounded-[20px] p-4 md:p-6 shadow-lg border border-[#5a5a5a] hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-3">
                  LISTEN
                </span>
                <h3 className="font-bold text-xl md:text-2xl text-[#e0e0e0] mb-2 leading-tight">
                  Investor Roundtable: 2026 Strategic Outlook
                </h3>
                <p className="text-sm md:text-base text-[#b0b0b0] mb-3">
                  Key members share their perspectives on strategic positioning and opportunities for the year ahead.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#9b8ea5]">
                  <span>Published: Jan 28, 2026</span>
                  <span>•</span>
                  <span>35 min listen</span>
                </div>
              </div>
              <img src={imgListenVertical2} alt="Audio thumbnail" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
