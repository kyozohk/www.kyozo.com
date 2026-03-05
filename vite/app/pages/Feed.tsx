import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import svgPaths from "@/imports/svg-q2sjy0v5jo";
import imgListenVertical from "/assets/imgListenVertical.png";
import imgListenVertical1 from "/assets/imgListenVertical.png";
import imgHerbieHancocksModalJazzGem from "/assets/imgListenVertical.png";
import imgListenVertical2 from "/assets/imgListenVertical.png";

type FilterType = "All" | "Read" | "Listen" | "Watch";

type OutletContext = {
  isLoggedIn: boolean;
  hasJoinedCommunity: boolean;
  activeFilter: FilterType;
};

export function Feed() {
  const { activeFilter } = useOutletContext<OutletContext>();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="max-w-[1090px] mx-auto px-3 md:px-6 pt-6 md:pt-12 pb-12 md:pb-20">
      {/* Article Grid */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Row 1 - Two column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Modal Jazz Article - READ */}
          {(activeFilter === "All" || activeFilter === "Read") && (
            <Link to="/article/modal-jazz-renaissance" className="flex-1 block">
              <article className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-4">
                  <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <h3 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] mb-4">
                  Modal Jazz Renaissance: Miles Davis to NYC 2026
                </h3>
                <p className="text-base text-[rgba(80,76,76,0.8)] leading-6 tracking-[-0.2px] mb-4">
                  Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz. Ever wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazzEver wonder why Miles Davis's Kind of Blue (1959) still tops jazz charts in 2026? It pioneered modal jazz…
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-sm text-[#504c4c] uppercase tracking-wide">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Sound Healing Article - WATCH */}
          {(activeFilter === "All" || activeFilter === "Watch") && (
            <Link to="/article/sound-healing-symphony" className="flex-1 block">
              <article className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group min-h-[400px]">
                <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgListenVertical} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-2 items-center mb-4">
                      <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Image
                      </span>
                      <span className="text-xs text-[#d9d9d9] uppercase tracking-wide">1 min read • Jan 2026</span>
                    </div>
                    <h3 className="font-bold text-4xl text-white tracking-[-0.72px] leading-10 mb-4">
                      Sound Healing <br />
                      Symphony
                    </h3>
                    <p className="text-base text-[rgba(255,255,255,0.8)] leading-6 tracking-[-0.2px]">
                      Ancient vibrations from Tibetan bowls and gongs that realign body, mind, and spirit
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="font-semibold text-sm text-white uppercase tracking-wide">View →</span>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Row 2 - Two column layout */}
        {(activeFilter === "All" || activeFilter === "Read") && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* How Sound Restores Article - READ */}
            <Link to="/article/sound-restores-body-mind" className="flex-1 block">
              <article className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-4">
                  <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <h3 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] mb-4">
                  How Sound Restores <br />
                  Body and Mind
                </h3>
                <p className="text-base text-[rgba(80,76,76,0.8)] leading-6 tracking-[-0.2px] mb-4">
                  Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate, Sound can support healing by calming the nervous system, which helps lower stress hormones, heart rate,
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-sm text-[#504c4c] uppercase tracking-wide">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>

            {/* Age of Materialism Article - READ */}
            <Link to="/article/age-of-materialism" className="flex-1 block">
              <article className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-4">
                  <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <h3 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] mb-4">
                  The Age of materialism <br />
                  ends here and now
                </h3>
                <p className="text-base text-[rgba(80,76,76,0.8)] leading-6 tracking-[-0.2px] mb-4">
                  The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct. The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct The age of materialism was built on a simple equation: more output equals more progress. It rewarded efficienct
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-sm text-[#504c4c] uppercase tracking-wide">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Row 3 - Two column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Living Journal Article - WATCH */}
          {(activeFilter === "All" || activeFilter === "Watch") && (
            <Link to="/article/living-journal" className="flex-1 block">
              <article className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group min-h-[400px]">
                <div className="absolute inset-0 overflow-hidden">
                  <img alt="" className="absolute h-[172.22%] left-[-3.39%] top-[-36.11%] w-[106.77%]" src={imgListenVertical1} />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="relative p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex gap-2 items-center mb-4">
                      <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                        Image
                      </span>
                      <span className="text-xs text-[#d9d9d9] uppercase tracking-wide">1 min read • Jan 2026</span>
                    </div>
                    <h3 className="font-bold text-4xl text-white tracking-[-0.72px] leading-10 mb-4">
                      A living journal of ideas, process, and creative evolution
                    </h3>
                    <p className="text-base text-[rgba(255,255,255,0.8)] leading-6 tracking-[-0.2px]">
                      Exploring the space between sound and thought
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="font-semibold text-sm text-white uppercase tracking-wide">View →</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Herbie Hancock Article - READ */}
          {(activeFilter === "All" || activeFilter === "Read") && (
            <Link to="/article/herbie-hancock-maiden-voyage" className="flex-1 block">
              <article className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex gap-2 items-center mb-4">
                  <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Text
                  </span>
                  <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">1 min read • Jan 2026</span>
                </div>
                <div className="flex gap-4 h-[110px] mb-4">
                  <img
                    alt=""
                    className="w-[110px] h-full object-cover rounded-lg"
                    src={imgHerbieHancocksModalJazzGem}
                  />
                  <h3 className="flex-1 font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] flex items-center">
                    Herbie Hancock's <br />
                    Modal Jazz Gem
                  </h3>
                </div>
                <p className="text-sm text-[#5a5a5a] leading-[22.4px] mb-4">
                  Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)—a five-note mode that sails…Dive into modal jazz pure magic with Herbie Hancock's 'Maiden Voyage' (1965)
                </p>
                <div className="flex justify-end">
                  <span className="font-semibold text-sm text-[#504c4c] uppercase tracking-wide">
                    Read Full Article →
                  </span>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Row 4 - Two column layout with Audio Player */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Modal Jazz Audio - LISTEN */}
          {(activeFilter === "All" || activeFilter === "Listen") && (
            <article className="flex-1 bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-2 items-center mb-4">
                <span className="bg-[#6e94b1] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Audio
                </span>
                <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">Listen • 3:07</span>
              </div>
              <h3 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] mb-4">
                Modal Jazz
              </h3>
              <p className="text-sm text-[#5a5a5a] leading-[22.4px] mb-6 truncate">
                Modal jazz emerged in the late 1950s as a shift from chord-heavy bebop
              </p>
              <div className="flex gap-3.5 items-center">
                <button
                  onClick={togglePlay}
                  className="bg-[#6e94b1] rounded-full size-12 flex items-center justify-center hover:bg-[#5d7c96] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  <svg className="size-5" fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.p262abc00}
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </svg>
                </button>
                <div className="flex-1 flex gap-1 items-center justify-between h-[60px]">
                  {[38, 81.11, 92.4, 87.26, 74.62, 38.12, 72.21, 95.09, 70.37, 84.91, 90.7, 71.52, 36.39, 68.27, 60.64, 57.66, 89.88, 42.92, 84.24, 71.38, 75.78, 87.11, 93.05, 70.59, 35.1, 76.94, 63.26, 44.98, 65.27, 39.71, 49.71, 46.71, 82.29, 80.28, 27.03, 50.84, 81.16, 92.13, 63.68, 71.16, 76.09, 84.96, 71.38, 76.09, 65.02, 79.26, 19.7, 93.15, 53.59, 94.83, 22.74, 75.81, 64.91, 83.78, 60.81, 32.09, 24.37, 22.91, 73.16, 82.45, 69.32, 23.71, 75.11, 56.01, 42.42, 90.53, 30.08, 29.15, 52.05, 85.7, 74.38, 32.36, 34.06, 48.47, 32.3, 30.38, 40.51, 95.45, 52.01, 95.89].map((height, i) => (
                    <div
                      key={i}
                      className="bg-[#ccc] w-[3.253px] rounded-full"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* How Vibration Shaped Video - WATCH */}
          {(activeFilter === "All" || activeFilter === "Watch") && (
            <article className="flex-1 relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imgListenVertical2} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="relative p-6 flex flex-col justify-between h-full min-h-[400px]">
                <div>
                  <div className="flex gap-2 items-center mb-4">
                    <span className="bg-[#f0c679] text-black text-[10px] font-medium px-2.5 py-1.5 rounded-full uppercase tracking-[0.5px]">
                      Watch
                    </span>
                    <span className="text-xs text-[#d9d9d9] uppercase tracking-wide">1 min read • Jan 2026</span>
                  </div>
                  <h3 className="font-bold text-4xl text-white tracking-[-0.72px] leading-10 mb-4">
                    How Vibration <br />
                    Shaped Our Minds
                  </h3>
                  <p className="text-base text-[rgba(255,255,255,0.8)] leading-6 tracking-[-0.2px]">
                    Exploring the space between sound and thought
                  </p>
                </div>
                <div className="flex gap-4 items-center w-[485px]">
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