import { Link } from "react-router";
import imgImageProfile from "/assets/imgListenVertical.png";

export function Explore() {
  return (
    <main className="max-w-[900px] mx-auto px-6 pt-12 pb-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#3A3630] mb-3">Explore Communities</h1>
        <p className="text-lg text-[#6b6b6b]">
          Discover and join communities across the Kyozo platform
        </p>
      </div>

      <div className="space-y-4">
        {/* Willer Universe Community Tile */}
        <Link
          to="/"
          className="block group"
        >
          <div className="bg-gradient-to-br from-[#e7e2d7] to-[#d5cab8] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] border border-[#c9bfad]">
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div className="shrink-0">
                <img 
                  src={imgImageProfile} 
                  alt="Willer Universe" 
                  className="size-16 rounded-full object-cover border-2 border-[#926b7f]"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#3A3630] mb-1 group-hover:text-[#926b7f] transition-colors">
                  Willer Universe Community
                </h2>
                <p className="text-sm text-[#6b6b6b] mb-1">
                  Open Community • Sound, Music & Culture
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c9bfad] rounded-full">
                  <svg className="w-3 h-3 text-[#926b7f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-xs font-semibold text-[#3A3630]">Artist</span>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="shrink-0">
                <svg 
                  className="w-6 h-6 text-[#926b7f] opacity-0 group-hover:opacity-100 transition-opacity" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Visionary Circle Community Tile */}
        <Link
          to="/visionary-circle"
          className="block group"
        >
          <div className="bg-gradient-to-br from-[#5a5a5a] to-[#4a4a4a] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] border border-[#3a3a3a]">
            <div className="flex items-center gap-4">
              {/* Profile Picture - Solid Color Circle */}
              <div className="shrink-0">
                <div className="size-16 rounded-full bg-[#7c6f84] border-2 border-[#9b8ea5] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">VC</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-[#9b8ea5] transition-colors">
                  Visionary Circle
                </h2>
                <p className="text-sm text-[#b0b0b0] mb-1">
                  The Kyozo Investor Pool
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3a3a3a] rounded-full">
                  <svg className="w-3 h-3 text-[#9b8ea5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-semibold text-[#b0b0b0]">Private Community</span>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="shrink-0">
                <svg 
                  className="w-6 h-6 text-[#9b8ea5] opacity-0 group-hover:opacity-100 transition-opacity" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}