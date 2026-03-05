import { useParams, useNavigate, Link } from "react-router";
import { useOutletContext } from "react-router";
import { articles } from "../data/articles";
import { X } from "lucide-react";
import imgSoundHealing from "/assets/imgListenVertical.png";
import imgLivingJournal from "/assets/imgListenVertical.png";
import { AnimatedArticleLayout } from "../components/AnimatedArticleLayout";
import bgTileImage from "/assets/imgListenVertical.png";

type OutletContext = {
  isLoggedIn: boolean;
  hasJoinedCommunity: boolean;
  setShowSignInModal: (show: boolean) => void;
  setShowJoinCommunityModal: (show: boolean) => void;
};

// Map article IDs to their imported images
const articleImages: Record<string, string> = {
  "sound-healing-symphony": imgSoundHealing,
  "living-journal": imgLivingJournal,
};

export function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, hasJoinedCommunity, setShowSignInModal, setShowJoinCommunityModal } = useOutletContext<OutletContext>();
  
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-bold text-4xl text-[#4f4949] mb-4">Article not found</h1>
          <Link to="/feed" className="text-[#926b7f] hover:underline">
            Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  const hasAccess = isLoggedIn && hasJoinedCommunity;
  const articleImage = id ? articleImages[id] : undefined;

  return (
    <AnimatedArticleLayout onClose={() => navigate(-1)}>
      {(handleClose) => (
        <>
          {/* Left Half - Sidebar with article preview */}
          <div 
            className="hidden md:block w-1/2 p-12 overflow-y-auto relative"
            style={{
              backgroundColor: '#f5f1e8',
              backgroundImage: `url(${bgTileImage})`,
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
            }}
          >
            <button
              onClick={handleClose}
              className="mb-8 flex items-center gap-2 text-[#504c4c] hover:text-[#926b7f] transition-colors relative z-10 cursor-pointer"
            >
              <X className="size-6" />
              <span className="font-semibold text-sm uppercase tracking-wide">Close</span>
            </button>
            
            {articleImage && (
              <div className="mb-8 rounded-[20px] overflow-hidden">
                <img 
                  src={articleImage} 
                  alt={article.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            <div className="flex gap-2 items-center mb-6">
              <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                {article.category}
              </span>
              <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">
                {article.readTime} • {article.date}
              </span>
            </div>

            <h1 className="font-bold text-5xl text-[#4f4949] tracking-[-1px] leading-[52px] mb-6">
              {article.title}
            </h1>

            <p className="text-lg text-[#504c4c] leading-7">
              {article.excerpt}
            </p>
          </div>

          {/* Right Half - Full content with permission wall */}
          <div 
            className="w-full md:w-1/2 relative overflow-hidden"
            style={{
              backgroundColor: '#f5f1e8',
              backgroundImage: `url(${bgTileImage})`,
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
            }}
          >
            {/* Mobile close button */}
            <div className="md:hidden sticky top-0 z-10 bg-[#f5f1e8]/95 backdrop-blur-sm border-b border-[#e8dfd0] p-4">
              <button
                onClick={handleClose}
                className="flex items-center gap-2 text-[#504c4c] hover:text-[#926b7f] transition-colors"
              >
                <X className="size-6" />
                <span className="font-semibold text-sm uppercase tracking-wide">Close</span>
              </button>
            </div>

            <div className="h-full overflow-y-auto">
              <div className="max-w-[680px] mx-auto px-6 md:px-12 py-8 md:py-16">
                {/* Mobile header - only show on mobile */}
                <div className="md:hidden mb-8">
                  {articleImage && (
                    <div className="mb-6 rounded-[20px] overflow-hidden">
                      <img 
                        src={articleImage} 
                        alt={article.title}
                        className="w-full h-[250px] object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2 items-center mb-4">
                    <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">
                      {article.readTime} • {article.date}
                    </span>
                  </div>

                  <h1 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[42px] mb-4">
                    {article.title}
                  </h1>
                </div>

                {/* Article content */}
                <div className="relative">
                  <div 
                    className={`prose prose-lg max-w-none ${
                      !hasAccess ? 'mask-gradient' : ''
                    }`}
                    style={!hasAccess ? {
                      WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                      maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                    } : {}}
                  >
                    {article.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-base text-[#504c4c] leading-7 mb-6">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Permission wall overlay */}
                  {!hasAccess && (
                    <div className="absolute inset-0 flex items-end justify-center pb-12">
                      <div className="bg-white/95 backdrop-blur-sm rounded-[20px] p-8 max-w-[500px] mx-4 shadow-2xl border-2 border-[#e8dfd0]">
                        <h3 className="font-bold text-2xl text-[#4f4949] mb-3 text-center">
                          {!isLoggedIn ? 'Sign in to continue reading' : 'Join the community to unlock full access'}
                        </h3>
                        <p className="text-base text-[#504c4c] mb-6 text-center leading-6">
                          {!isLoggedIn 
                            ? 'Create a free Kyozo account to access full articles, audio content, and exclusive community features.'
                            : 'Become a member of Willer Universe to read full articles, listen to exclusive audio, and connect with fellow sound explorers.'
                          }
                        </p>
                        <div className="flex flex-col gap-3">
                          {!isLoggedIn ? (
                            <>
                              <button
                                onClick={() => {
                                  setShowSignInModal(true);
                                }}
                                className="w-full bg-[#926b7f] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#7d5a6b] transition-colors uppercase tracking-wide text-sm"
                              >
                                Sign In
                              </button>
                              <button
                                onClick={() => navigate(-1)}
                                className="w-full bg-transparent border-2 border-[#e8dfd0] text-[#504c4c] font-semibold py-3 px-6 rounded-full hover:bg-[#f5f1e8] transition-colors uppercase tracking-wide text-sm"
                              >
                                Back to Feed
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setShowJoinCommunityModal(true);
                                }}
                                className="w-full bg-[#926b7f] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#7d5a6b] transition-colors uppercase tracking-wide text-sm"
                              >
                                Join Community
                              </button>
                              <button
                                onClick={() => navigate(-1)}
                                className="w-full bg-transparent border-2 border-[#e8dfd0] text-[#504c4c] font-semibold py-3 px-6 rounded-full hover:bg-[#f5f1e8] transition-colors uppercase tracking-wide text-sm"
                              >
                                Back to Feed
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatedArticleLayout>
  );
}