import { useState } from "react";

type FilterType = "All" | "Read" | "Listen" | "Watch";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const filters: { type: FilterType; label: string; icon: string }[] = [
    { type: "All", label: "All", icon: "🔍" },
    { type: "Read", label: "Read", icon: "📖" },
    { type: "Listen", label: "Listen", icon: "🎧" },
    { type: "Watch", label: "Watch", icon: "🎬" },
  ];

  return (
    <div className="flex items-center gap-1 md:gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 md:p-1.5 shadow-sm">
      {filters.map((filter) => (
        <button
          key={filter.type}
          onClick={() => onFilterChange(filter.type)}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.type
              ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-md"
              : "text-[#6b7280] hover:text-[#111827] hover:bg-gray-100"
          }`}
        >
          <span className="mr-1 md:mr-2">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
}
