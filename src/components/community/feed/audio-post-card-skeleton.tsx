
import { Skeleton } from "@/components/ui/skeleton";

export function AudioPostCardSkeleton() {
  const cardStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E\")",
    backgroundColor: 'rgb(245, 241, 232)'
  };
  const innerDivStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")"
  };

  return (
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
          {[...Array(60)].map((_, i) => {
            const height = ((i * 7 + 13) % 60) + 20;
            return <Skeleton key={i} className="bg-[#ccc] w-[3.253px] rounded-full" style={{ height: `${height}px` }} />;
          })}
        </div>
      </div>
    </div>
  );
}
