import svgPaths from "@/imports/svg-1sunrosh10";

type FilterType = "All" | "Read" | "Listen" | "Watch";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex justify-center items-center gap-1">
      {/* All */}
      <button
        onClick={() => onFilterChange("All")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group transition-all duration-200 rounded-lg px-3 py-2 md:px-4 md:py-2.5 min-w-[64px] md:min-w-[80px] ${
          activeFilter === "All" 
            ? "opacity-100 bg-[rgba(214,212,201,0.5)]" 
            : "opacity-60 hover:opacity-80 hover:bg-[rgba(214,212,201,0.3)]"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="relative size-[14px] md:size-[17.754px]">
            <div className="absolute inset-[-16.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.491 23.491">
                <g>
                  <g filter="url(#filter0_all_btn)">
                    <path d={svgPaths.p2498fbc0} stroke={activeFilter === "All" ? "#926b7f" : "#3A3630"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                  </g>
                  <g filter="url(#filter1_all_btn)">
                    <path d={svgPaths.p23028ec0} stroke={activeFilter === "All" ? "#926b7f" : "#3A3630"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                  </g>
                  <g filter="url(#filter2_all_btn)">
                    <path d={svgPaths.p1ffdf280} stroke={activeFilter === "All" ? "#926b7f" : "#3A3630"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                  </g>
                  <g filter="url(#filter3_all_btn)">
                    <path d={svgPaths.p3ada3100} stroke={activeFilter === "All" ? "#926b7f" : "#3A3630"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                  </g>
                </g>
                <defs>
                  <filter id="filter0_all_btn"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter1_all_btn"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter2_all_btn"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter3_all_btn"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <span className={`font-['Inter',sans-serif] font-semibold leading-[16px] md:leading-[20px] text-[11px] ${
          activeFilter === "All" ? "text-[#926b7f]" : "text-[#171717]"
        }`}>All</span>
      </button>

      {/* Read */}
      <button
        onClick={() => onFilterChange("Read")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group transition-all duration-200 rounded-lg px-3 py-2 md:px-4 md:py-2.5 min-w-[64px] md:min-w-[80px] ${
          activeFilter === "Read" 
            ? "opacity-100 bg-[rgba(214,212,201,0.5)]" 
            : "opacity-60 hover:opacity-80 hover:bg-[rgba(214,212,201,0.3)]"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="h-[17px] md:h-[21.198px] w-[19px] md:w-[24px]">
            <div className="relative inset-[-1.23%_-1.15%_-1.3%_-1.15%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5517 21.7356">
                <g>
                  <g>
                    <g filter="url(#filter0_read)">
                      <path d={svgPaths.p271e3c00} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                    </g>
                    <g filter="url(#filter1_read)">
                      <path d={svgPaths.p236af3f0} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                    </g>
                    <g filter="url(#filter2_read)">
                      <path d={svgPaths.p25bef480} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                    </g>
                    <g filter="url(#filter3_read)">
                      <path d={svgPaths.p36d19000} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                    </g>
                    <g filter="url(#filter4_read)">
                      <path d={svgPaths.p1f23100} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                    </g>
                  </g>
                  <g filter="url(#filter5_read)">
                    <path d={svgPaths.pe50c4f2} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                  </g>
                  <g filter="url(#filter6_read)">
                    <path d={svgPaths.p3d33d700} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                  </g>
                  <g filter="url(#filter7_read)">
                    <path d={svgPaths.p17b28c00} fill={activeFilter === "Read" ? "#926b7f" : "#3A3630"} />
                  </g>
                </g>
                <defs>
                  <filter id="filter0_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter1_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter2_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter3_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter4_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter5_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter6_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter7_read"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <span className={`font-['Inter',sans-serif] font-semibold leading-[16px] md:leading-[20px] text-[11px] ${
          activeFilter === "Read" ? "text-[#926b7f]" : "text-[#171717]"
        }`}>Read</span>
      </button>

      {/* Listen */}
      <button
        onClick={() => onFilterChange("Listen")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group transition-all duration-200 rounded-lg px-3 py-2 md:px-4 md:py-2.5 min-w-[64px] md:min-w-[80px] ${
          activeFilter === "Listen" 
            ? "opacity-100 bg-[rgba(214,212,201,0.5)]" 
            : "opacity-60 hover:opacity-80 hover:bg-[rgba(214,212,201,0.3)]"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="h-[21px] md:h-[27px] w-[23px] md:w-[29px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 27">
              <g>
                <g>
                  <mask fill="white" id="path-1-listen">
                    <path d={svgPaths.p1300a200} />
                  </mask>
                  <path d={svgPaths.p1300a200} fill={activeFilter === "Listen" ? "#926b7f" : "#3A3630"} />
                  <path d={svgPaths.p2eac6000} fill="white" mask="url(#path-1-listen)" />
                </g>
                <g>
                  <mask fill="white" id="path-2-listen">
                    <path d={svgPaths.p1968b780} />
                  </mask>
                  <path d={svgPaths.p1968b780} fill={activeFilter === "Listen" ? "#926b7f" : "#3A3630"} />
                  <path d={svgPaths.p39ddb840} fill="white" mask="url(#path-2-listen)" />
                </g>
                <g>
                  <mask fill="white" id="path-3-listen">
                    <path d={svgPaths.p36a97b00} />
                  </mask>
                  <path d={svgPaths.p36a97b00} fill={activeFilter === "Listen" ? "#926b7f" : "#3A3630"} />
                  <path d={svgPaths.p12047480} fill="white" mask="url(#path-3-listen)" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <span className={`font-['Inter',sans-serif] font-semibold leading-[16px] md:leading-[20px] text-[11px] ${
          activeFilter === "Listen" ? "text-[#926b7f]" : "text-[#171717]"
        }`}>Listen</span>
      </button>

      {/* Watch */}
      <button
        onClick={() => onFilterChange("Watch")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group transition-all duration-200 rounded-lg px-3 py-2 md:px-4 md:py-2.5 min-w-[64px] md:min-w-[80px] ${
          activeFilter === "Watch" 
            ? "opacity-100 bg-[rgba(214,212,201,0.5)]" 
            : "opacity-60 hover:opacity-80 hover:bg-[rgba(214,212,201,0.3)]"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="h-[13px] md:h-[16.687px] w-[21px] md:w-[26px]">
            <div className="relative inset-[-1.36%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 17.1406">
                <g>
                  <g filter="url(#filter0_watch)">
                    <path d={svgPaths.p2902dd80} fill={activeFilter === "Watch" ? "#926b7f" : "#3A3630"} />
                  </g>
                  <g filter="url(#filter1_watch)">
                    <path d={svgPaths.p121c8480} fill={activeFilter === "Watch" ? "#926b7f" : "#3A3630"} />
                  </g>
                </g>
                <defs>
                  <filter id="filter0_watch"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                  <filter id="filter1_watch"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" /></filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <span className={`font-['Inter',sans-serif] font-semibold leading-[16px] md:leading-[20px] text-[11px] ${
          activeFilter === "Watch" ? "text-[#926b7f]" : "text-[#171717]"
        }`}>Watch</span>
      </button>
    </div>
  );
}