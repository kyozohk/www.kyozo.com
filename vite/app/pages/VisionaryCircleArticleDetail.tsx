import { useParams, Link, useNavigate } from "react-router";
import imgListenVertical from "/assets/imgListenVertical.png";
import { AnimatedArticleLayout } from "../components/AnimatedArticleLayout";
import bgTileImage from "/assets/text_bg.png";

export function VisionaryCircleArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock article data
  const articles: Record<string, { title: string; content: string; type: string; image?: string }> = {
    "investment-insights": {
      title: "Investment Insights: The Sound of Innovation",
      type: "Audio",
      content: "Exploring opportunities at the intersection of creativity and technology in the modern investment landscape. This comprehensive analysis examines how creative innovation is reshaping traditional sectors and creating unprecedented investment opportunities for forward-thinking investors.",
      image: imgListenVertical,
    },
    "q4-portfolio-review": {
      title: "Q4 Portfolio Review",
      type: "Featured",
      content: "Quarterly insights and strategic updates from our investment committee. Our portfolio companies continue to demonstrate strong growth across key metrics, with particular strength in the creative technology and digital innovation sectors.",
    },
    "visionary-conversations": {
      title: "Visionary Conversations",
      type: "Video",
      content: "Exclusive interviews with industry leaders and innovators shaping tomorrow's creative economy. In this series, we sit down with founders, investors, and thought leaders who are defining the future of creative innovation and technology.",
    },
    "market-analysis": {
      title: "Market Analysis: Creative Tech Sector",
      type: "Text",
      content: "Deep dive into emerging trends and investment opportunities in the creative technology sector for Q1 2026. The creative technology market continues to expand at an unprecedented rate, with new opportunities emerging across multiple verticals including music tech, design tools, and creative AI.",
    },
    "portfolio-update-podcast": {
      title: "Portfolio Update Podcast",
      type: "Audio",
      content: "Monthly briefing on portfolio performance, strategic initiatives, and upcoming opportunities. This month we discuss key performance metrics, recent strategic pivots, and exciting new investment opportunities in the pipeline.",
    },
  };

  const article = articles[id || ""] || {
    title: "Article Not Found",
    type: "Unknown",
    content: "The requested article could not be found.",
  };

  return (
    <AnimatedArticleLayout onClose={() => navigate(-1)}>
      {(handleClose) => (
        <>
          {/* Left Panel - Article Content */}
          <div 
            className="flex-1 overflow-y-auto px-6 md:px-12 py-8 md:py-16"
            style={{
              backgroundColor: '#f5f1e8',
              backgroundImage: `url(${bgTileImage})`,
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
            }}
          >
            <div className="max-w-3xl mx-auto">
              <button 
                onClick={handleClose}
                className="inline-flex items-center gap-2 text-[#504c4c] hover:text-[#926b7f] transition-colors mb-8 text-sm font-medium cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Visionary Circle
              </button>

              <span className="inline-block px-4 py-1.5 bg-[#7c6f84] text-white text-xs font-semibold rounded-full mb-6 uppercase tracking-wide">
                {article.type}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4f4949] mb-8 leading-tight tracking-tight">
                {article.title}
              </h1>

              {article.image && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                  <img src={article.image} alt={article.title} className="w-full h-auto" />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-[#504c4c] leading-relaxed mb-6 font-light">
                  {article.content}
                </p>

                <div className="mt-12 pt-8 border-t border-[#e8dfd0]">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#4f4949] mb-6">Key Insights</h2>
                  
                  <div className="space-y-6 text-[#504c4c]">
                    <div className="bg-white/60 rounded-xl p-6 border border-[#e8dfd0]">
                      <h3 className="text-xl font-bold text-[#7c6f84] mb-3">Market Opportunity</h3>
                      <p className="leading-relaxed">
                        The creative technology sector continues to demonstrate strong growth metrics, with increasing adoption across enterprise and consumer segments. Early-stage companies in this space are particularly well-positioned for significant returns.
                      </p>
                    </div>

                    <div className="bg-white/60 rounded-xl p-6 border border-[#e8dfd0]">
                      <h3 className="text-xl font-bold text-[#7c6f84] mb-3">Strategic Positioning</h3>
                      <p className="leading-relaxed">
                        Investors who understand the intersection of creativity and technology can identify unique opportunities that traditional venture capital often overlooks. This creates alpha-generating potential for informed participants.
                      </p>
                    </div>

                    <div className="bg-white/60 rounded-xl p-6 border border-[#e8dfd0]">
                      <h3 className="text-xl font-bold text-[#7c6f84] mb-3">Future Outlook</h3>
                      <p className="leading-relaxed">
                        As creative tools become increasingly sophisticated and accessible, we anticipate continued expansion in both market size and investment opportunities. The next 18-24 months present a particularly attractive entry point.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 bg-gradient-to-br from-[#7c6f84] to-[#6a5f74] rounded-2xl p-8 text-center border border-[#9b8ea5]">
                  <h3 className="text-2xl font-bold text-white mb-4">Interested in Learning More?</h3>
                  <p className="text-[#e0e0e0] mb-6 max-w-2xl mx-auto">
                    Visionary Circle members receive detailed investment memos, exclusive deal flow access, and direct communication with our investment committee.
                  </p>
                  <button className="px-8 py-3 bg-white text-[#6a5f74] font-bold rounded-full hover:bg-[#f0f0f0] transition-colors">
                    Contact Investment Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Related Content */}
          <div className="w-full lg:w-96 bg-[#3a3a3a] px-6 py-8 lg:py-16 border-l border-[#5a5a5a]">
            <div className="lg:sticky lg:top-8">
              <h3 className="text-xl font-bold text-[#e0e0e0] mb-6">Related Insights</h3>
              
              <div className="space-y-4">
                <Link 
                  to="/visionary-circle/article/market-analysis" 
                  className="block bg-[#4a4a4a] rounded-xl p-4 hover:bg-[#5a5a5a] transition-colors border border-[#5a5a5a]"
                >
                  <span className="text-xs text-[#9b8ea5] uppercase tracking-wide font-semibold">Read</span>
                  <h4 className="font-bold text-[#e0e0e0] mt-2 mb-1">Market Analysis: Creative Tech Sector</h4>
                  <p className="text-sm text-[#b0b0b0] line-clamp-2">Deep dive into emerging trends and investment opportunities...</p>
                </Link>

                <Link 
                  to="/visionary-circle/article/portfolio-update-podcast" 
                  className="block bg-[#4a4a4a] rounded-xl p-4 hover:bg-[#5a5a5a] transition-colors border border-[#5a5a5a]"
                >
                  <span className="text-xs text-[#9b8ea5] uppercase tracking-wide font-semibold">Listen</span>
                  <h4 className="font-bold text-[#e0e0e0] mt-2 mb-1">Portfolio Update Podcast</h4>
                  <p className="text-sm text-[#b0b0b0] line-clamp-2">Monthly briefing on portfolio performance and upcoming opportunities...</p>
                </Link>

                <Link 
                  to="/visionary-circle/article/visionary-conversations" 
                  className="block bg-[#4a4a4a] rounded-xl p-4 hover:bg-[#5a5a5a] transition-colors border border-[#5a5a5a]"
                >
                  <span className="text-xs text-[#9b8ea5] uppercase tracking-wide font-semibold">Watch</span>
                  <h4 className="font-bold text-[#e0e0e0] mt-2 mb-1">Visionary Conversations</h4>
                  <p className="text-sm text-[#b0b0b0] line-clamp-2">Exclusive interviews with industry leaders and innovators...</p>
                </Link>
              </div>

              <div className="mt-8 bg-[#4a4a4a] rounded-xl p-6 border border-[#5a5a5a]">
                <h4 className="font-bold text-[#e0e0e0] mb-3">About Visionary Circle</h4>
                <p className="text-sm text-[#b0b0b0] leading-relaxed mb-4">
                  A private, invitation-only community for strategic partners and investors shaping the future of creative innovation.
                </p>
                <Link 
                  to="/visionary-circle/bio" 
                  className="text-sm text-[#9b8ea5] hover:text-[#b0a9b5] font-semibold transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatedArticleLayout>
  );
}