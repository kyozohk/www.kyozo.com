
import { TextPostCardSkeleton } from './text-post-card-skeleton';
import { AudioPostCardSkeleton } from './audio-post-card-skeleton';
import { VideoPostCardSkeleton } from './video-post-card-skeleton';

export { TextPostCardSkeleton } from './text-post-card-skeleton';
export { AudioPostCardSkeleton } from './audio-post-card-skeleton';
export { VideoPostCardSkeleton } from './video-post-card-skeleton';
export { CreatePostDialogSkeleton } from './create-post-dialog-skeleton';

// Combined skeleton component that shows all types in rows of 2 (matching actual page layout)
export function FeedSkeletons() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Row 1 - Text + Audio */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <TextPostCardSkeleton hasImage={true} />
        </div>
        <div className="flex-1">
          <AudioPostCardSkeleton />
        </div>
      </div>
      
      {/* Row 2 - Video + Text */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <VideoPostCardSkeleton />
        </div>
        <div className="flex-1">
          <TextPostCardSkeleton hasImage={false} />
        </div>
      </div>
      
      {/* Row 3 - Audio + Text */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <AudioPostCardSkeleton />
        </div>
        <div className="flex-1">
          <TextPostCardSkeleton hasImage={false} />
        </div>
      </div>
    </div>
  );
}
