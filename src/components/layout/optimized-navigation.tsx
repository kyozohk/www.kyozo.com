'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarIcons } from '@/lib/svg-icons';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

type OptimizedNavigationProps = {
  onSignInClick?: () => void;
  onJoinClick?: () => void;
  profileImage?: string;
  handle?: string;
};

export function OptimizedNavigation({ onSignInClick, onJoinClick, profileImage, handle }: OptimizedNavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: 'About',
      href: handle ? `/${handle}/about` : "/about",
      icon: (
        <div className="relative shrink-0 size-[32px]">
          <div className="flex flex-col items-center justify-center overflow-clip rounded-inherit size-full">
            <div className="flex flex-col gap-[1.067px] items-center justify-center px-[0.853px] py-[2.347px] size-full">
              <div className="h-[5.813px] w-[20.693px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
                  <path d={sidebarIcons.aboutLine1} fill="#3A3630" />
                  <path d={sidebarIcons.aboutLine2} fill="#3A3630" />
                </svg>
              </div>
              <div className="h-[4.053px] w-[18.862px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.2889 4.48">
                  <path d={sidebarIcons.aboutLine3} fill="#3A3630" />
                  <path d={sidebarIcons.aboutLine4} fill="#3A3630" />
                  <path d={sidebarIcons.aboutLine5} fill="#3A3630" />
                </svg>
              </div>
              <div className="h-[5.813px] w-[20.693px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.6933 5.81334">
                  <path d={sidebarIcons.aboutLine1} fill="#3A3630" />
                  <path d={sidebarIcons.aboutLine2} fill="#3A3630" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ),
      isActive: (handle && pathname === `/${handle}/about`) || (!handle && pathname === "/about"),
    },
    {
      name: 'Feed',
      href: handle ? `/${handle}` : "/",
      icon: (
        <div className="rotate-180">
          <div className="relative size-[32px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <path d={sidebarIcons.feedPath1} fill="#4F4949" />
              <path d={sidebarIcons.feedPath2} stroke="#4F4949" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      ),
      isActive: (handle && pathname === `/${handle}`) || (!handle && pathname === "/"),
    },
  ];

  const actionItems = [
    {
      name: 'Sign In',
      onClick: onSignInClick,
      icon: (
        <div className="relative shrink-0 size-[32px]">
          <svg className="block size-full" fill="none" viewBox="0 0 32 32">
            <path d="M16 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" stroke="#3A3630" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#3A3630" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
  ];

  const modalItem = {
    name: 'Modal',
    href: "/modal",
    icon: (
      <div className="relative shrink-0 size-[40px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318.746 264.195">
          <g>
            <path d={sidebarIcons.modalPath1} fill="#E9D3B3" stroke="#3A3630" strokeWidth="15" />
            <path d={sidebarIcons.modalPath2} fill="#E9D3B3" stroke="#3A3630" strokeWidth="15" />
            <path d={sidebarIcons.modalPath3} fill="#E9D3B3" stroke="#3A3630" strokeWidth="15" />
            <path d={sidebarIcons.modalPath4} fill="#F2ECE3" stroke="#3A3630" strokeWidth="15" />
            <path d={sidebarIcons.modalPath5} fill="#F2ECE3" stroke="#3A3630" strokeWidth="15" />
            <path d={sidebarIcons.modalPath6} fill="#F2ECE3" stroke="#3A3630" strokeWidth="15" />
          </g>
        </svg>
      </div>
    ),
    isActive: pathname === "/modal",
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside className="hidden lg:flex sticky left-0 top-[10px] h-[calc(100vh-20px)] w-[80px] bg-white rounded-[24px] z-40 flex-col items-center p-[2px] border-2 border-[#e8dfd0] shrink-0 ml-[10px]">
      {/* Kyozo Icon at Top */}
      <Link
        href="/"
        className="relative rounded-[13.168px] shrink-0 size-[60px] mt-[10px] hover:bg-[#f5f1e8] transition-colors flex flex-col items-center justify-center"
      >
        <div className="h-[36.69px] w-[31.448px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4483 36.6896">
            <path d={sidebarIcons.kyozoBrand} fill="#3F3F3F" />
          </svg>
        </div>
      </Link>

      {/* Divider */}
      <div className="h-[17px] w-[56px] px-[4px] mt-[8px]">
        <div className="bg-[rgba(0,0,0,0.1)] h-px w-full" />
      </div>

      {/* Willer Universe Section */}
      <div className="flex flex-col items-center gap-[8px] py-[8px]">
        {/* Profile Image */}
        <div className="relative shrink-0">
          <div className="relative rounded-full shadow-[0px_0px_0px_2px_#e8dfd0] shrink-0 size-[38px]">
            <img 
              alt="Profile" 
              className="absolute bg-clip-padding border-0 border-transparent max-w-none object-cover rounded-full size-full" 
              src={profileImage } 
            />
          </div>
        </div>

        {/* Community Title - Clickable Link to Home */}
        <Link 
          href={handle ? `/${handle}` : "/"}
          className="h-[34px] relative rounded-[10px] shrink-0 w-[56px] flex flex-col items-center hover:bg-[#f5f1e8] transition-colors cursor-pointer"
        >
          <p className="font-bold leading-[16px] text-[#4f4949] text-[12px] text-center">{handle || 'Willer'}</p>
          <p className="font-bold leading-[16px] text-[#4f4949] text-[12px] text-center whitespace-pre-wrap">Universe</p>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-[17px] w-[56px] px-[4px]">
        <div className="bg-[rgba(0,0,0,0.1)] h-px w-full" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 w-full flex flex-col items-center gap-[8px] pt-[10px]">
        {/* Navigation Links */}
        <div className="flex flex-col gap-[12px] items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors ${
                item.isActive ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
              }`}
            >
              {item.icon}
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">{item.name}</p>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-[32px] w-[56px] px-[4px]">
          <div className="bg-[rgba(0,0,0,0.1)] h-px w-full" />
        </div>

        {/* Action Items */}
        <div className="flex flex-col gap-[12px] items-center">
          {actionItems.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className="flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors hover:bg-[#f5f1e8]"
            >
              {item.icon}
              <p className="font-semibold leading-[16px] text-[11px] text-[rgba(79,73,73,0.9)] text-center">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Link - Bottom */}
      <Link
        href={modalItem.href}
        className={`flex flex-col gap-[2px] h-[62px] items-center justify-center rounded-[10px] w-[56px] transition-colors mb-[10px] ${
          modalItem.isActive ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
        }`}
      >
        {modalItem.icon}
        <p className="font-semibold leading-[16px] text-[12px] text-[rgba(79,73,73,0.9)] text-center">{modalItem.name}</p>
      </Link>
    </aside>
  );

  // Mobile Navigation
  const MobileNavigation = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e8dfd0]">
      <div className="flex items-center justify-between p-4">
        {/* Kyozo Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-[36.69px] w-[31.448px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.4483 36.6896">
              <path d={sidebarIcons.kyozoBrand} fill="#3F3F3F" />
            </svg>
          </div>
          <span className="font-bold text-[#4f4949] text-lg">{handle || 'Willer'} Universe</span>
        </Link>

        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="relative rounded-full shadow-[0px_0px_0px_2px_#e8dfd0] shrink-0 size-[38px]">
                    <img 
                      alt="Profile" 
                      className="absolute bg-clip-padding border-0 border-transparent max-w-none object-cover rounded-full size-full" 
                      src={profileImage} 
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#4f4949]">{handle || 'Willer'}</p>
                    <p className="text-sm text-[rgba(79,73,73,0.7)]">Universe</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        item.isActive ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium text-[#4f4949]">{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[rgba(0,0,0,0.1)]">
                  <div className="space-y-2">
                    {actionItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.onClick?.();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 w-full p-3 rounded-lg transition-colors hover:bg-[#f5f1e8]"
                      >
                        {item.icon}
                        <span className="font-medium text-[#4f4949]">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t">
                <Link
                  href={modalItem.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    modalItem.isActive ? "bg-[#e8dfd0]" : "hover:bg-[#f5f1e8]"
                  }`}
                >
                  {modalItem.icon}
                  <span className="font-medium text-[#4f4949]">{modalItem.name}</span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileNavigation />
    </>
  );
}
