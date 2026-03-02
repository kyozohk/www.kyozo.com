import { User, MapPin } from "lucide-react";
const imgEllipse1 = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";
const imgWillerWebsite = "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&h=400&fit=crop";
const imgModalHomepage = "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=400&fit=crop";

export function Bio() {
  return (
    <main className="max-w-[900px] mx-auto px-6 pt-12 pb-20">
      {/* Header Section with Profile Picture */}
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1 className="font-bold text-5xl text-[#4f4949] tracking-[-1px] mb-4">
            About Willer
          </h1>
          <p className="text-xl text-[#6b6b6b] leading-relaxed">
            Musician, Creative Organiser, Founder
          </p>
        </div>
        <div className="flex-shrink-0">
          <img 
            src={imgEllipse1} 
            alt="Willer's profile" 
            className="size-[120px] md:size-[140px] rounded-full object-cover shadow-lg border-4 border-[#e8dfd0]" 
          />
        </div>
      </div>

      {/* Key Info Profile Section */}
      <div className="bg-white rounded-[20px] p-6 mb-8 border-2 border-[#e8dfd0] shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-bold text-sm text-[#6b6b6b] mb-1">Artist Name</p>
            <p className="text-lg text-[#4f4949]">Willer</p>
          </div>
          <div>
            <p className="font-bold text-sm text-[#6b6b6b] mb-1">Location</p>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-[#3A3630]" />
              <p className="text-lg text-[#4f4949]">Hong Kong / London</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        {/* Bio Heading with Symbol */}
        <div className="flex items-center gap-3 mb-4">
          <svg className="size-6 text-[#3A3630]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 className="font-bold text-2xl text-[#4f4949]">Bio</h2>
        </div>
        
        {/* Bio Text Box */}
        <div className="bg-[#f5f1e8] rounded-[20px] p-8 border-2 border-[#e8dfd0]">
          <p className="text-base text-[#504c4c] leading-7">
            Hong Kong based artist Willer is a storyteller at heart — a deep musical empath, whose sets and productions are shaped as immersive journeys. As both an multi-disciplinary artist and a curator, he builds spaces where people can connect, feel, and move together, with a strong focus on groove, flow, and the craft of DJing itself. Across the dancefloor, the studio, and Spin Sum, Willer's work is driven by sensitivity, narrative, and a commitment to creating inclusive experiences that blend music, art, and performance. Each show is an invitation to step inside a shared moment — honest, human, and transformative through sound.
          </p>
        </div>
      </div>

      {/* Head to Willer's Website - Full Horizontal Bar */}
      <a
        href="https://aboutwiller.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block rounded-[20px] overflow-hidden h-[140px] hover:shadow-xl transition-all duration-300 hover:scale-[1.01] mb-6"
      >
        <img
          src={imgWillerWebsite}
          alt="Willer's workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 transition-all duration-300" />
        <div className="absolute inset-0 px-8 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-3xl text-white mb-2 tracking-[-0.5px]">
              Head to Willer's Website
            </h3>
            <p className="text-base text-white/90 font-medium">
              aboutwiller.com →
            </p>
          </div>
          <svg className="size-10 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </a>

      {/* Head to Modal Homepage - Full Horizontal Bar */}
      <a
        href="https://modal-music.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block rounded-[20px] overflow-hidden h-[140px] hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
      >
        <img
          src={imgModalHomepage}
          alt="Modal music theory"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 transition-all duration-300" />
        <div className="absolute inset-0 px-8 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-3xl text-white mb-2 tracking-[-0.5px]">
              Head to Modal Homepage
            </h3>
            <p className="text-base text-white/90 font-medium">
              modalbywiller.com →
            </p>
          </div>
          <svg className="size-10 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </a>
    </main>
  );
}