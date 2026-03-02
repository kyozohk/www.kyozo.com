
import { Skeleton } from "@/components/ui/skeleton";

export function TextPostCardSkeleton({ hasImage = true }: { hasImage?: boolean }) {
  const cardStyle = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
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
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-[90%] rounded-md" />
        <Skeleton className="h-4 w-[80%] rounded-md" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
    </div>
  );
}
