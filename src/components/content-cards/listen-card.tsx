'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Lock, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui';
import { Post } from '@/lib/types';
import { useCommunityAuth } from '@/hooks/use-community-auth';
import { recordInteraction } from '@/lib/interaction-utils';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deletePost } from '@/lib/post-utils';
import { Waveform } from './waveform';
import { cardTitleStyle, cardBodyStyle, CARD_TITLE_COLOR, CARD_BODY_COLOR } from './card-styles';
import Link from 'next/link';

interface ListenCardProps {
  category: string;
  episode: string;
  duration: string;
  title: string;
  summary?: string;
  isPrivate?: boolean;
  post: Post & { id: string; _isPublicView?: boolean; _onEdit?: () => void; _canEdit?: boolean };
}

export function ListenCard({ category, episode, duration: initialDuration, title, summary, isPrivate, post }: ListenCardProps) {
  const { user } = useCommunityAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes ?? 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isPostCreator = user && !post._isPublicView && (post.authorId === user.uid || post._canEdit);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts.",
        variant: "destructive",
      });
      return;
    }
    try {
      const { liked, likesCount } = await toggleLike(post.id, user.uid);
      setIsLiked(liked);
      setLikes(likesCount);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update like status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!post.id) return;
    
    setIsDeleting(true);
    try {
      await deletePost(post.id, post.content.mediaUrls);
      toast({
        title: "Post deleted",
        description: "Your audio post has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete audio post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Coming Soon", description: "Commenting functionality will be available soon."});
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Coming Soon", description: "Sharing functionality will be available soon."});
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
        if (user && post.id && post.communityId) {
          recordInteraction({ userId: user.uid, postId: post.id, communityId: post.communityId, interactionType: 'play', mediaType: 'audio' });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => { if(audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata = () => { if(audioRef.current) setDuration(audioRef.current.duration); };
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (user && post.id && post.communityId) {
      recordInteraction({ userId: user.uid, postId: post.id, communityId: post.communityId, interactionType: 'finish', mediaType: 'audio', playDurationSeconds: duration });
    }
  };
  
  const cardStyle = {
    backgroundColor: '#fbfaf4'
  };

  return (
    <>
      <Link href={`/willer/${post.id}`} className="block h-full">
        <div className="overflow-hidden cursor-pointer relative group transition-shadow duration-300 hover:shadow-lg rounded-[20px] h-full flex flex-col" style={cardStyle}>
        {isPrivate && (
          <div className="absolute top-4 right-4 z-10"><div className="bg-red-500 rounded-full p-2 shadow-lg"><Lock className="w-4 h-4 text-white" /></div></div>
        )}
        {isPostCreator && (
            <div className="absolute top-2 right-2 flex gap-1 z-20">
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white rounded-full" onClick={(e) => {e.stopPropagation(); post._onEdit?.()}}>
                    <Edit className="h-4 w-4 text-gray-700" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white rounded-full" onClick={(e) => {e.stopPropagation(); setShowDeleteDialog(true)}}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
            </div>
        )}
        <div className="px-4 pt-4 pb-6 h-full flex flex-col gap-4">
          {/* Top - Title and metadata */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#6e94b1] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-[0.38px]">
                {category}
              </span>
              <p className="text-[10.5px] text-[#3f3d3d] uppercase tracking-[0.35px]">
                {episode} • {formatTime(duration)}
              </p>
            </div>
            <h2 className="font-bold text-[28px] md:text-4xl tracking-[-0.25px] leading-[30px] mb-[12px] pt-[0.5px]" style={{ color: CARD_TITLE_COLOR }}>
              {title}
            </h2>
            {summary && <p className="text-[14px] md:text-base leading-[22px] md:leading-6 tracking-[-0.15px] mb-[36px] h-[48px] overflow-clip" style={{ color: CARD_BODY_COLOR }}>{summary}</p>}
          </div>
          
          {/* Bottom - Playback controls */}
          <div className="flex items-center gap-4">
            <button onClick={togglePlayPause} className="w-12 h-12 rounded-full bg-[#6E94B1] hover:bg-[#5a7a94] flex items-center justify-center transition-all shadow-lg flex-shrink-0">
              {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
            </button>
            <div className="flex-1">
              <Waveform isPlaying={isPlaying} currentTime={currentTime} duration={duration} />
            </div>
          </div>
        </div>
        <audio 
            ref={audioRef} 
            src={post.content.mediaUrls?.[0]} 
            className="hidden"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleAudioEnded}
        />
      </div>
      </Link>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your audio post.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600"
                  >
                      {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
