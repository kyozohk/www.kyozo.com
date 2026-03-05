export function VisionaryCircleCommunity() {
  return (
    <main className="max-w-[900px] mx-auto px-6 pt-12 pb-20">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#c5b9cb] mb-4">Community</h1>
        <p className="text-xl text-[#b0b0b0]">
          Private Community for Kyozo Investors
        </p>
      </div>

      {/* Private Community Notice */}
      <div className="bg-gradient-to-br from-[#7c6f84] to-[#6a5f74] rounded-[24px] p-8 md:p-12 text-center border-2 border-[#9b8ea5] mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="size-24 mx-auto mb-6 bg-[#9b8ea5] rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Private Community</h2>
          <p className="text-lg md:text-xl text-[#e0e0e0] leading-relaxed mb-6">
            This is a private community for Kyozo investors only.
          </p>
          <p className="text-base text-[#e0e0e0] opacity-90">
            Access to community features, networking events, and private discussions is restricted to verified Visionary Circle members.
          </p>
        </div>
      </div>

      {/* Community Features (For Members) */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#c5b9cb] mb-6">Member Benefits</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[20px] p-6 border border-[#5a5a5a]">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#7c6f84] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#e0e0e0] mb-2">Private Network</h3>
                <p className="text-sm text-[#b0b0b0]">
                  Connect directly with fellow investors, founders, and strategic partners in exclusive forums and events.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[20px] p-6 border border-[#5a5a5a]">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#7c6f84] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#e0e0e0] mb-2">Exclusive Events</h3>
                <p className="text-sm text-[#b0b0b0]">
                  Quarterly gatherings, intimate dinners, and private presentations with industry leaders and portfolio companies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[20px] p-6 border border-[#5a5a5a]">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#7c6f84] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#e0e0e0] mb-2">Deal Flow Access</h3>
                <p className="text-sm text-[#b0b0b0]">
                  First look at curated investment opportunities with comprehensive due diligence and analysis.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[20px] p-6 border border-[#5a5a5a]">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#7c6f84] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#e0e0e0] mb-2">Market Intelligence</h3>
                <p className="text-sm text-[#b0b0b0]">
                  Proprietary research, trend analysis, and strategic insights specific to the creative technology sector.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Join */}
      <div className="mt-12 bg-gradient-to-br from-[#4a4a4a] to-[#3a3a3a] rounded-[20px] p-8 border border-[#5a5a5a]">
        <h2 className="text-2xl font-bold text-[#c5b9cb] mb-4 text-center">Interested in Joining?</h2>
        <p className="text-base text-[#b0b0b0] text-center max-w-2xl mx-auto mb-6">
          Visionary Circle membership is by invitation only. We seek strategic partners who share our vision for the future of creative innovation and technology.
        </p>
        <div className="text-center">
          <a 
            href="mailto:invest@kyozo.com" 
            className="inline-block px-8 py-4 bg-[#7c6f84] text-white font-semibold rounded-full hover:bg-[#8c7f94] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
