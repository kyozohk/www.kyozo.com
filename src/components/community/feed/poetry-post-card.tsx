'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Trash2, Lock } from "lucide-react";
import { useCommunityAuth } from "@/hooks/use-community-auth";
import { type Post } from "@/lib/types";
import { deletePost } from "@/lib/post-utils";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface PoetryPostCardProps {
  post: Post & { id: string; _isPublicView?: boolean; _onEdit?: () => void; _canEdit?: boolean };
}

function splitPoetryChunks(text: string): string[] {
  if (!text) return [''];
  // Split by double newlines (blank line between paragraphs)
  const chunks = text.split(/\n\s*\n/).filter(chunk => chunk.trim().length > 0);
  return chunks.length > 0 ? chunks : [text];
}

export const PoetryPostCard: React.FC<PoetryPostCardProps> = ({ post }) => {
  const { user } = useCommunityAuth();
  const { toast } = useToast();
  const isPostCreator = user && !post._isPublicView && (post.authorId === user.uid || post._canEdit);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const chunks = splitPoetryChunks(post.content?.text || '');
  const totalPages = chunks.length;

  const handleDelete = async () => {
    if (!post.id) return;
    
    setIsDeleting(true);
    try {
      await deletePost(post.id, post.content.mediaUrls);
      toast({
        title: "Post deleted",
        description: "Your poetry post has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete poetry post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const goPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleLeftClick = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleRightClick = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  return (
    <>
      <div className="relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
        {/* Edit/Delete buttons for post creator */}
        {isPostCreator && (
          <div className="absolute top-2 right-2 flex gap-1 z-20">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white rounded-full" onClick={() => post._onEdit?.()}>
              <Edit className="h-4 w-4 text-gray-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 bg-white/80 hover:bg-white rounded-full"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )}

        <div className="p-6">
          {/* Header with badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-[#D4870E] text-white px-3 py-1 rounded-full text-xs font-medium uppercase flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Poetry
            </span>
            {post.visibility === 'private' && (
              <span className="text-xs font-semibold rounded-full px-2 py-1 bg-red-100 text-red-600 inline-flex items-center gap-1">
                <Lock className="h-3 w-3" /> Private
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-gray-900 text-2xl font-bold mb-6">{post.title}</h3>

          {/* Poetry content area with click zones */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {/* Left click zone */}
            <button
              onClick={handleLeftClick}
              className={cn(
                "absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer",
                currentPage === 0 && "cursor-not-allowed opacity-50"
              )}
              disabled={currentPage === 0}
              aria-label="Previous paragraph"
            />

            {/* Right click zone */}
            <button
              onClick={handleRightClick}
              className={cn(
                "absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer",
                currentPage === totalPages - 1 && "cursor-not-allowed opacity-50"
              )}
              disabled={currentPage === totalPages - 1}
              aria-label="Next paragraph"
            />

            {/* Poetry text - left-aligned, normal weight */}
            <div className="max-w-2xl w-full px-8">
              <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-left whitespace-pre-line leading-relaxed text-gray-800">
                {chunks[currentPage]}
              </p>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Previous button */}
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                  currentPage === 0
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {/* Page indicator */}
              <span className="text-sm text-gray-600 font-medium">
                Page {currentPage + 1} of {totalPages}
              </span>

              {/* Next button */}
              <button
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                  currentPage === totalPages - 1
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-[#D4870E] text-white hover:bg-[#B8740C]"
                )}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Keyboard hint */}
            <p className="text-center text-xs text-gray-400 mt-3">
              Use arrow keys ← → or tap left/right to navigate
            </p>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your poetry post
              and remove the data from our servers.
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
};
