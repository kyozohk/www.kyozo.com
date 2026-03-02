import { useState } from "react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  setShowSignInModal: (show: boolean) => void;
  setShowJoinKyozoModal: (show: boolean) => void;
}

export function Sidebar({ setShowSignInModal, setShowJoinKyozoModal }: SidebarProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: "About", href: "/bio", icon: "👤" },
    { name: "Feed", href: "/feed", icon: "📝" },
    { name: "Community", href: "/community", icon: "👥" },
    { name: "Explore", href: "/explore", icon: "🔍" },
    { name: "Modal", href: "/modal", icon: "🎵" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-[10px] md:w-60 lg:w-72 bg-[#e8dfd0] flex-shrink-0 rounded-r-2xl md:rounded-r-3xl">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden absolute top-4 left-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`p-4 md:p-6 space-y-4 md:space-y-6 ${menuOpen ? 'block' : 'hidden md:block'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg md:text-xl">K</span>
          </div>
          <span className="font-bold text-lg md:text-xl text-[#3A3630] hidden md:block">Kyozo</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 md:space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-white/80 shadow-md text-[#6366f1]"
                  : "text-[#6b7280] hover:bg-white/60 hover:text-[#111827]"
              }`}
            >
              <span className="text-lg md:text-xl">{item.icon}</span>
              <span className="text-sm md:text-base font-medium hidden md:block">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="space-y-2 md:space-y-3 pt-4 md:pt-6 border-t border-[#d4c4b0]">
          <button
            onClick={() => setShowJoinKyozoModal(true)}
            className="w-full px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg md:rounded-xl font-medium text-sm md:text-base hover:shadow-lg transition-all duration-200"
          >
            Join Kyozo
          </button>
          <button
            onClick={() => setShowSignInModal(true)}
            className="w-full px-4 py-2 md:px-6 md:py-3 bg-white/80 backdrop-blur-sm text-[#6366f1] border border-[#6366f1] rounded-lg md:rounded-xl font-medium text-sm md:text-base hover:bg-white transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
