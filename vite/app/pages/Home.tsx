import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import svgPaths from "@/imports/svg-q2sjy0v5jo";
import imgListenVertical from "/assets/imgListenVertical.png";
import imgListenVertical1 from "/assets/imgListenVertical.png";
import imgHerbieHancocksModalJazzGem from "/assets/imgListenVertical.png";
import imgListenVertical2 from "/assets/imgListenVertical.png";
import imgEllipse1 from "/assets/imgListenVertical.png";
import AudioWave from "@/imports/AudioWave";

type FilterType = "All" | "Read" | "Listen" | "Watch";

type OutletContext = {
  isLoggedIn: boolean;
  hasJoinedCommunity: boolean;
  activeFilter: FilterType;
  setShowJoinCommunityModal: (show: boolean) => void;
  setShowSignInModal: (show: boolean) => void;
};

export function Home() {
  const { isLoggedIn, hasJoinedCommunity, activeFilter, setShowJoinCommunityModal, setShowSignInModal } = useOutletContext<OutletContext>();
  const [email, setEmail] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for joining! We'll send updates to ${email}`);
      setEmail("");
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Helper function to determine if an article should be shown based on active filter
  const shouldShowArticle = (type: "Text" | "Image" | "Audio" | "Watch") => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Read" && type === "Text") return true;
    if (activeFilter === "Listen" && type === "Audio") return true;
    if (activeFilter === "Watch" && (type === "Watch" || type === "Image")) return true;
    return false;
  };

  return (
    <main className="max-w-[1090px] mx-auto px-0 pt-6 md:pt-6 pb-12 md:pb-20">
      {/* Hero Section with Profile Picture */}
      <section className="mb-4 md:mb-6 flex flex-col md:flex-row items-start justify-between gap-3 md:gap-6 px-[12px] pt-[0px] pb-[12px]">
        <div className="flex-1 w-full">
          <h2
            className="font-bold leading-[32px] md:leading-[52px] tracking-[-0.5px] md:tracking-[-1px] bg-clip-text text-[32px] md:text-[48px] mx-[0px] mt-[0px] mb-[12px]"
            style={{
              backgroundImage: "linear-gradient(166.8195deg, rgb(90, 155, 185) 11.465%, rgb(75, 135, 170) 106.65%)",
              WebkitTextFillColor: "transparent",
            }}
          >Welcome to the Willer.fm community</h2>
          <p className="font-normal leading-[22px] md:leading-normal text-[#68a5ba] text-[15px] md:text-[18px]">A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.</p>
        </div>
        <div className="flex-shrink-0 hidden md:block">
          <img 
            src={imgEllipse1} 
            alt="Willer's profile" 
            className="size-[100px] rounded-full object-cover shadow-lg border-4 border-[#e8dfd0]" 
          />
        </div>
      </section>

      {/* Compact Join CTA */}
      {!isLoggedIn && !hasJoinedCommunity && (
        <section 
          className="rounded-[12px] mb-4 md:mb-8 p-[16px] md:p-[20px] flex flex-col md:flex-row md:items-center md:justify-between gap-[4px]"
          style={{
            backgroundImage: "linear-gradient(-8.19332deg, rgb(143, 195, 212) 17.065%, rgb(116, 176, 207) 98.418%)"
          }}
        >
          <style>
            {`
              @media (min-width: 768px) {
                section[style*="linear-gradient(-8.19332deg"] {
                  background-image: linear-gradient(-1.55475deg, rgb(143, 195, 212) 17.065%, rgb(116, 176, 207) 98.418%) !important;
                }
              }
            `}
          </style>
          <div className="flex flex-col gap-[4px] md:flex-1">
            <p className="font-bold leading-[26px] text-[#ffdea8] text-[24px] tracking-[-0.4125px]">
              I'd love you to join the community
            </p>
            <p className="font-normal leading-[20px] text-[#f5f1e8] text-[14px] md:text-[15px] tracking-[-0.4125px]">
              View full content, updates and insights. Please join or sign in.
            </p>
          </div>
          <div className="flex gap-[8px] items-center mx-[0px] mt-[8px] md:mt-0 mb-[0px]">
            <button
              onClick={() => setShowJoinCommunityModal(true)}
              className="bg-[#9bd9e6] border border-[#5293a1] h-[36px] md:h-[40px] w-[120px] rounded-[99px] font-bold text-[12px] text-[#42808e] hover:bg-[#8bc9d6] transition-colors"
            >
              Join
            </button>
            <button
              onClick={() => setShowSignInModal(true)}
              className="bg-[#42808e] border border-[#42808e] h-[36px] md:h-[40px] w-[120px] rounded-[99px] font-bold text-[12px] text-white hover:bg-[#377380] transition-colors"
            >
              Sign in
            </button>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Row 1 - Two column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Modal Jazz Article */}
          {shouldShowArticle("Text") && (
            <Link to="/article/modal-jazz-renaissance" className="flex-1">
              <article className="bg-[#fbfaf4] rounded-[20px] p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-3 md:mb-4">
                  <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-[10.5px] md:text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <h3 className="font-bold text-[28px] md:text-4xl text-[#807A72] tracking-[-1px] leading-[30px] md:leading-[38px] mb-3 md:mb-4">
                  Modal Jazz Renaissance: Miles Davis to NYC 2026
                </h3>
                <p className="text-[14px] md:text-base text-[#978F82] leading-[22px] md:leading-6 tracking-[-0.2px] mb-3 md:mb-4">
                  Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz. Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazzEver wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz…
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-[12px] md:text-sm text-[#847B74] uppercase tracking-[0.3px] leading-none px-[0px] pt-[8px] pb-[0px]">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Sound Healing Article */}
          {shouldShowArticle("Image") && (
            <Link to="/article/sound-healing-symphony" className="flex-1">
              <article className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group md:h-full">
                <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgListenVertical} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative p-4 md:p-6 flex flex-col gap-16">
                  <div>
                    <div className="flex gap-2 items-center mb-3 md:mb-4">
                      <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Image
                      </span>
                      <span className="text-[10.5px] md:text-xs text-[#d9d9d9] uppercase tracking-wide">1 min read • Jan 2026</span>
                    </div>
                    <h3 className="font-bold text-[28px] md:text-4xl text-white tracking-[-0.72px] leading-[30px] md:leading-10 mb-3 md:mb-4">
                      Sound Healing <br />
                      Symphony
                    </h3>
                    <p className="text-[14px] md:text-base text-[rgba(255,255,255,0.8)] leading-[22px] md:leading-6 tracking-[-0.2px]">
                      Ancient vibrations from Tibetan bowls and gongs that realign body, mind, and spirit
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="font-semibold text-[12px] md:text-sm text-white uppercase tracking-wide px-[0px] pt-[8px] pb-[0px]">View →</span>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Row 2 - Two column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* How Sound Restores Article */}
          {shouldShowArticle("Text") && (
            <Link to="/article/sound-restores" className="flex-1">
              <article className="bg-[#fbfaf4] rounded-[20px] p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-3 md:mb-4">
                  <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-[10.5px] md:text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <h3 className="font-bold text-[28px] md:text-4xl text-[#807A72] tracking-[-1px] leading-[30px] md:leading-[38px] mb-3 md:mb-4">
                  How Sound Restores <br />
                  Body and Mind
                </h3>
                <p className="text-[14px] md:text-base text-[#978F82] leading-[22px] md:leading-6 tracking-[-0.2px] mb-3 md:mb-4">
                  Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate,
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-[12px] md:text-sm text-[#847B74] uppercase tracking-[0.3px] leading-none px-[0px] pt-[8px] pb-[0px]">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Age of Materialism Article */}
          {shouldShowArticle("Text") && (
            <Link to="/article/age-of-materialism" className="flex-1">
              <article className="bg-[#fbfaf4] rounded-[20px] p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-3 md:mb-4">
                  <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-[10.5px] md:text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <h3 className="font-bold text-[28px] md:text-4xl text-[#807A72] tracking-[-1px] leading-[30px] md:leading-[38px] mb-3 md:mb-4">
                  The Age of materialism <br />
                  ends here and now
                </h3>
                <p className="text-[14px] md:text-base text-[#978F82] leading-[22px] md:leading-6 tracking-[-0.2px] mb-3 md:mb-4">
                  The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct. The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-[12px] md:text-sm uppercase tracking-wide text-[#847b74] px-[0px] pt-[8px] pb-[0px]">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Row 3 - Two column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Living Journal Article */}
          {shouldShowArticle("Image") && (
            <Link to="/article/living-journal" className="flex-1">
              <article className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgListenVertical1} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative p-4 md:p-6 flex flex-col gap-16">
                  <div>
                    <div className="flex gap-2 items-center mb-3 md:mb-4">
                      <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Image
                      </span>
                      <span className="text-[10.5px] md:text-xs text-[#d9d9d9] uppercase tracking-wide">1 min read • Jan 2026</span>
                    </div>
                    <h3 className="font-bold text-[28px] md:text-4xl text-white tracking-[-0.72px] leading-[30px] md:leading-10 mb-3 md:mb-4">
                      A living journal of ideas, process, and creative evolution
                    </h3>
                    <p className="text-[14px] md:text-base text-[rgba(255,255,255,0.8)] leading-[22px] md:leading-6 tracking-[-0.2px]">
                      Exploring the space between sound and thought
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="font-semibold text-[12px] md:text-sm text-white uppercase tracking-wide">View →</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Herbie Hancock Article */}
          {shouldShowArticle("Text") && (
            <Link to="/article/herbie-hancock-modal-jazz" className="flex-1">
              <article className="bg-[#fbfaf4] rounded-[20px] p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-3 md:mb-4">
                  <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-[0.38px]">
                    Text
                  </span>
                  <span className="text-[10.5px] text-[#3f3d3d] uppercase tracking-[0.35px]">1 min read • Jan 2026</span>
                </div>
                <div className="flex gap-3 mb-3 md:mb-4">
                  <img
                    alt=""
                    className="w-[90px] h-[115px] object-cover rounded-[10px]"
                    src={imgHerbieHancocksModalJazzGem}
                  />
                  <h3 className="flex-1 font-bold text-[28px] md:text-4xl text-[#807A72] tracking-[-0.25px] leading-[30px] md:leading-[38px] flex items-start md:items-center pt-[0.6px] md:pt-0">
                    Herbie Hancock's <br />
                    Modal Jazz Gem
                  </h3>
                </div>
                <p className="text-[14px] md:text-base text-[#978F82] leading-[22px] md:leading-6 tracking-[-0.15px] mb-[14px]">
                  Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)—a five-note mode that sails…Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold uppercase tracking-[0.3px] text-[#847b74] text-[12px] px-[0px] pt-[8px] pb-[0px]">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Row 4 - Two column layout with Audio Player */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Modal Jazz Audio */}
          {shouldShowArticle("Audio") && (
            <article className="flex-1 bg-[#fbfaf4] rounded-[20px] px-4 pt-4 pb-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-2 items-center mb-3 md:mb-4">
                <span className="bg-[#6e94b1] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-[0.38px]">
                  Audio
                </span>
                <span className="text-[10.5px] text-[#3f3d3d] uppercase tracking-[0.35px]">Listen • 3:07</span>
              </div>
              <h3 className="font-bold text-[28px] md:text-4xl text-[#807A72] tracking-[-0.25px] leading-[30px] mb-[12px] pt-[0.5px]">
                Modal Jazz
              </h3>
              <p className="text-[14px] md:text-base text-[#978F82] leading-[22px] md:leading-6 tracking-[-0.15px] mb-[36px] h-[48px] overflow-clip">
                Modal jazz emerged in the late 1950s as a shift from chord-heavy bebop
              </p>
              <div className="flex gap-3 items-center">
                <AudioWave onClick={togglePlay} />
              </div>
            </article>
          )}

          {/* How Vibration Shaped Video */}
          {shouldShowArticle("Watch") && (
            <article className="flex-1 relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgListenVertical2} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="relative p-4 md:p-6 flex flex-col justify-between h-full min-h-[400px]">
                <div>
                  <div className="flex gap-2 items-center mb-3 md:mb-4">
                    <span className="bg-[#f0c679] text-black text-[10px] font-medium px-2.5 py-1.5 rounded-full uppercase tracking-[0.5px]">
                      Watch
                    </span>
                    <span className="text-[10.5px] md:text-xs text-[#d9d9d9] uppercase tracking-wide">1 min read  Jan 2026</span>
                  </div>
                  <h3 className="font-bold text-[28px] md:text-4xl text-white tracking-[-0.72px] leading-[30px] md:leading-10 mb-3 md:mb-4">
                    How Vibration <br />
                    Shaped Our Minds
                  </h3>
                  <p className="text-[14px] md:text-base text-[rgba(255,255,255,0.8)] leading-[22px] md:leading-6 tracking-[-0.2px]">
                    Exploring the space between sound and thought
                  </p>
                </div>
                <div className="flex gap-4 items-center w-full max-w-[485px]">
                  <button
                    onClick={togglePlay}
                    className="bg-[#f0c679] rounded-full size-12 flex items-center justify-center hover:bg-[#e8be67] transition-colors relative"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    <svg className="size-5 absolute left-[calc(50%+1px)] top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 20 20">
                      <path
                        d={svgPaths.p262abc00}
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.66667"
                      />
                    </svg>
                  </button>
                  <div className="flex-1 flex flex-col gap-1.5 justify-center">
                    <p className="text-sm font-medium text-white leading-5">0:00 / 0:00</p>
                    <div className="bg-[#c4c4c4] border border-[#8f8f8f] rounded-full w-full p-px">
                      <div className="bg-[#f7d47a] rounded-full size-2" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
}