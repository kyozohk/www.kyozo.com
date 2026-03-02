
import { Skeleton } from "@/components/ui/skeleton";

export function VideoPostCardSkeleton() {
  const cardStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E\")",
    backgroundColor: 'rgb(245, 241, 232)'
  };
  
  return (
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
  );
}
