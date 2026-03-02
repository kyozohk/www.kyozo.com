import { Skeleton } from "@/components/ui/skeleton";
import { WillerSidebar } from '@/components/landing/willer-sidebar';

export function PageSkeleton() {
  return (
    <div className="relative min-h-screen bg-[#bfbebd] flex">
      {/* Sidebar */}
      <div className="w-[10px] md:w-20 lg:w-25 bg-[#e8dfd0] flex-shrink-0 rounded-r-2xl md:rounded-r-3xl">
        <div className="p-4 space-y-4">
          {/* Logo */}
          <Skeleton className="h-8 w-8 md:h-10 md:w-10" />
          
          {/* Navigation items */}
          <div className="space-y-3 md:space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <Skeleton className="h-5 w-5 md:h-6 md:w-6" />
                <Skeleton className="h-4 w-20 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Background overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(231,226,215,0.8)] inset-0 mix-blend-overlay" />
        </div>

        {/* Header with Filter Tabs */}
        <header className="sticky top-0 z-50 backdrop-blur-[2px] px-2 md:px-12 pt-[13px] pb-2 md:py-4">
          <div className="max-w-[1632px] mx-auto flex items-center justify-center md:justify-between gap-3 md:gap-8 relative">
            <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex-1 flex items-center justify-center" style={{ left: 'calc(30px + 50%)' }}>
              <div className="flex items-center gap-1 md:gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-16 md:w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative max-w-[1090px] mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-12 md:pb-20">
          {/* Hero Section with Profile Picture */}
          <section className="mb-4 md:mb-6 flex flex-col md:flex-row items-start justify-between gap-3 md:gap-6">
            <div className="flex-1 w-full">
              <Skeleton className="h-8 w-3/4 md:h-12 md:w-4/5 mb-2 md:mb-3 rounded-md" />
              <Skeleton className="h-4 w-full md:h-6 md:w-3/4 rounded-md" />
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <Skeleton className="size-[100px] rounded-full" />
            </div>
          </section>

          {/* Join Community Banner */}
          <section className="bg-gradient-to-br from-[#8abfd6] to-[#6da4be] rounded-[12px] md:rounded-[16px] p-3 md:p-4 mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
            <div className="flex-1 w-full">
              <Skeleton className="h-4 w-full md:h-5 md:w-3/4 rounded-md" />
            </div>
            <div className="flex items-center gap-0 flex-shrink-0">
              <Skeleton className="h-8 w-16 md:h-10 md:w-20 rounded-l-[14px]" />
              <Skeleton className="h-8 w-16 md:h-10 md:w-20 rounded-r-[14px]" />
            </div>
          </section>

          {/* Article Grid - Rows of 2 */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-2 items-center mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-[90%] rounded-md" />
                    <Skeleton className="h-4 w-[80%] rounded-md" />
                  </div>
                  <div className="flex justify-end">
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-2 items-center mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
                  <Skeleton className="h-4 w-full mb-6 rounded-md truncate" />
                  <div className="flex gap-3.5 items-center">
                    <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                    <div className="flex-1 flex gap-1 items-center justify-between h-[60px]">
                      {[...Array(60)].map((_, i) => (
                        <Skeleton key={i} className="bg-[#ccc] w-[3.253px] rounded-full" style={{ height: `${Math.random() * 60 + 20}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group h-full">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="relative p-6 flex flex-col justify-between h-full min-h-[400px]">
                    <div>
                      <div className="flex gap-2 items-center mb-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
                      <Skeleton className="h-4 w-full rounded-md" />
                    </div>
                    <div className="flex gap-4 items-center w-full max-w-[485px]">
                      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                      <div className="flex-1 flex flex-col gap-1.5 justify-center">
                        <Skeleton className="h-4 w-20 rounded-md" />
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-2 items-center mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-[90%] rounded-md" />
                    <Skeleton className="h-4 w-[80%] rounded-md" />
                  </div>
                  <div className="flex justify-end">
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Row 3 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-2 items-center mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
                  <Skeleton className="h-4 w-full mb-6 rounded-md truncate" />
                  <div className="flex gap-3.5 items-center">
                    <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                    <div className="flex-1 flex gap-1 items-center justify-between h-[60px]">
                      {[...Array(60)].map((_, i) => (
                        <Skeleton key={i} className="bg-[#ccc] w-[3.253px] rounded-full" style={{ height: `${Math.random() * 60 + 20}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
                  <div className="flex gap-2 items-center mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-[90%] rounded-md" />
                    <Skeleton className="h-4 w-[80%] rounded-md" />
                  </div>
                  <div className="flex justify-end">
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
