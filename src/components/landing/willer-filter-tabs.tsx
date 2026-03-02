'use client';

import { filterIcons } from '@/lib/svg-icons';
import { listenIconPaths } from '@/lib/listen-icon-paths';

type FilterType = "All" | "Read" | "Listen" | "Watch";

interface WillerFilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function WillerFilterTabs({ activeFilter, onFilterChange }: WillerFilterTabsProps) {
  return (
    <div className="flex justify-center items-center gap-3 md:gap-5">
      {/* All */}
      <button
        onClick={() => onFilterChange("All")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group ${
          activeFilter === "All" ? "opacity-100" : "opacity-60 hover:opacity-80"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="relative size-[14px] md:size-[17.754px]">
            <div className="absolute inset-[-16.16%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.491 23.491">
                <path d={filterIcons.allPath1} stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                <path d={filterIcons.allPath2} stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                <path d={filterIcons.allPath3} stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
                <path d={filterIcons.allPath4} stroke="#3A3630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.64" />
              </svg>
            </div>
          </div>
        </div>
        <span className="font-['Inter',sans-serif] font-semibold text-[9px] md:text-[11px] text-[#171717] leading-[16px] md:leading-[20px]">All</span>
      </button>

      {/* Read */}
      <button
        onClick={() => onFilterChange("Read")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group ${
          activeFilter === "Read" ? "opacity-100" : "opacity-60 hover:opacity-80"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="h-[17px] md:h-[21.198px] w-[19px] md:w-[24px]">
            <div className="relative inset-[-1.23%_-1.15%_-1.3%_-1.15%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5517 21.7356">
                <path d={filterIcons.readPath1} fill="#3A3630" />
                <path d={filterIcons.readPath2} fill="#3A3630" />
                <path d={filterIcons.readPath3} fill="#3A3630" />
                <path d={filterIcons.readPath4} fill="#3A3630" />
                <path d={filterIcons.readPath5} fill="#3A3630" />
                <path d={filterIcons.readPath6} fill="#3A3630" />
                <path d={filterIcons.readPath7} fill="#3A3630" />
                <path d={filterIcons.readPath8} fill="#3A3630" />
              </svg>
            </div>
          </div>
        </div>
        <span className="font-['Inter',sans-serif] font-semibold text-[9px] md:text-[11px] text-[#171717] leading-[16px] md:leading-[20px]">Read</span>
      </button>

      {/* Listen */}
      <button
        onClick={() => onFilterChange("Listen")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group ${
          activeFilter === "Listen" ? "opacity-100" : "opacity-60 hover:opacity-80"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="h-[21px] md:h-[27px] w-[23px] md:w-[29px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 27">
              <g>
                <g>
                  <mask fill="white" id="path-1-listen">
                    <path d={listenIconPaths.listenFill1} />
                  </mask>
                  <path d={listenIconPaths.listenFill1} fill="#3A3630" />
                  <path d={listenIconPaths.listenMask1} fill="white" mask="url(#path-1-listen)" />
                </g>
                <g>
                  <mask fill="white" id="path-2-listen">
                    <path d={listenIconPaths.listenFill2} />
                  </mask>
                  <path d={listenIconPaths.listenFill2} fill="#3A3630" />
                  <path d={listenIconPaths.listenMask2} fill="white" mask="url(#path-2-listen)" />
                </g>
                <g>
                  <mask fill="white" id="path-3-listen">
                    <path d={listenIconPaths.listenFill3} />
                  </mask>
                  <path d={listenIconPaths.listenFill3} fill="#3A3630" />
                  <path d={listenIconPaths.listenMask3} fill="white" mask="url(#path-3-listen)" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <span className="font-['Inter',sans-serif] font-semibold text-[9px] md:text-[11px] text-[#171717] leading-[16px] md:leading-[20px]">Listen</span>
      </button>

      {/* Watch */}
      <button
        onClick={() => onFilterChange("Watch")}
        className={`flex flex-col items-center gap-0.5 md:gap-1 group ${
          activeFilter === "Watch" ? "opacity-100" : "opacity-60 hover:opacity-80"
        }`}
      >
        <div className="size-[24px] md:size-[30px] flex items-center justify-center">
          <div className="h-[13px] md:h-[16.687px] w-[21px] md:w-[26px]">
            <div className="relative inset-[-1.36%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 17.1406">
                <path d={filterIcons.watchPath1} fill="#3A3630" />
                <path d={filterIcons.watchPath2} fill="#3A3630" />
              </svg>
            </div>
          </div>
        </div>
        <span className="font-['Inter',sans-serif] font-semibold text-[9px] md:text-[11px] text-[#171717] leading-[16px] md:leading-[20px]">Watch</span>
      </button>
    </div>
  );
}
