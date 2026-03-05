
'use client';

import React, { useState } from 'react';
import { Lock, ThumbsUp, MessageSquare, Share2, ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui';
import { Post } from '@/lib/types';
import { useCommunityAuth } from '@/hooks/use-community-auth';
import { toggleLike } from '@/lib/interaction-utils';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deletePost } from '@/lib/post-utils';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { cardTitleStyle, cardBodyStyle, CARD_TITLE_COLOR, CARD_BODY_COLOR } from './card-styles';

interface ReadCardProps {
  post: Post & { id: string; _isPublicView?: boolean; _onEdit?: () => void; _canEdit?: boolean };
  category: string;
  readTime: string;
  date?: string;
  title: string;
  summary?: string;
  isPrivate?: boolean;
}

export function ReadCard({ post, category, readTime, date, title, summary, isPrivate }: ReadCardProps) {
  const { user } = useCommunityAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isPostCreator = user && !post._isPublicView && (post.authorId === user.uid || post._canEdit);
  
  const handleDelete = async () => {
    if (!post.id) return;
    setIsDeleting(true);
    try {
        await deletePost(post.id, post.content.mediaUrls);
        toast({
            title: "Post deleted",
            description: "Your post has been successfully deleted.",
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        toast({
            title: "Error",
            description: "Failed to delete post. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsDeleting(false);
        setShowDeleteDialog(false);
    }
  };
  
  const cardStyle = {
    backgroundColor: '#fbfaf4'
  };

  const imageUrl = post.content.mediaUrls?.[0];

  return (
    <>
      <Link href={`/willer/${post.id}`} className="block h-full">
        <div className="overflow-hidden cursor-pointer relative group transition-shadow duration-300 hover:shadow-lg rounded-[20px] h-[400px] flex flex-col" style={cardStyle}>
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
        <div className="p-4 md:p-6 h-full flex flex-col gap-4">
          {/* Category badge and metadata at top */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#926b7f] text-white text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                {category}
              </span>
              <p className="text-[10.5px] md:text-xs text-[#3f3d3d] uppercase tracking-wide">
                {readTime} {date && `• ${date}`}
              </p>
              {post.visibility === 'private' && (
                <span className="text-xs font-semibold rounded-full px-2 py-1 bg-red-100 text-red-600 inline-flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Private
                </span>
              )}
            </div>
          
          {/* Image if present */}
          {imageUrl && (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
            <h2 className="font-bold text-[28px] md:text-4xl tracking-[-1px] leading-[30px] md:leading-[38px] line-clamp-2" style={{ color: CARD_TITLE_COLOR }}>
              {title}
            </h2>
            {summary && <p className="text-[14px] md:text-base leading-[22px] md:leading-6 tracking-[-0.2px] line-clamp-3" style={{ color: CARD_BODY_COLOR }}>{summary}</p>}
          </div>
          
          {/* Read Full Article link */}
          <div className="flex justify-end">
            <span className="font-semibold text-[12px] md:text-sm text-[#847B74] uppercase tracking-[0.3px] leading-none px-[0px] pt-[8px] pb-[0px]">Read Full Article →</span>
          </div>
        </div>
        </div>
      </Link>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post.
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
