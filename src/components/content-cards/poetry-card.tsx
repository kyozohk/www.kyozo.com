'use client';

import React, { useState } from 'react';
import { Lock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Post } from '@/lib/types';
import { cn } from '@/lib/utils';
import { cardTitleStyle, CARD_TITLE_COLOR, CARD_BODY_COLOR } from './card-styles';

interface PoetryCardProps {
  post: Post & { id: string; _isPublicView?: boolean; _onEdit?: () => void; _canEdit?: boolean };
  category: string;
  date?: string;
  title: string;
  isPrivate?: boolean;
  onClick?: () => void;
}

function splitPoetryChunks(text: string): string[] {
  if (!text) return [''];
  // Split by double newlines (blank line between paragraphs)
  const chunks = text.split(/\n\s*\n/).filter(chunk => chunk.trim().length > 0);
  return chunks.length > 0 ? chunks : [text];
}

export function PoetryCard({ post, category, date, title, isPrivate, onClick }: PoetryCardProps) {
  const chunks = splitPoetryChunks(post.content?.text || '');

  const cardStyle = {
    backgroundColor: '#fbfaf4'
  };

  // Preview card - show only first paragraph
  return (
    <div 
      onClick={onClick}
      className="overflow-hidden cursor-pointer relative group transition-shadow duration-300 hover:shadow-lg rounded-[20px] h-[400px] flex flex-col" 
      style={cardStyle}
    >
      <div className="p-4 md:p-6 h-full flex flex-col">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide bg-[#926b7f] text-white">
            {category}
          </span>
          <span className="text-[9.6px] md:text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide bg-[#D4870E] text-white flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            Poetry
          </span>
          {date && (
            <p className="text-[10.5px] md:text-xs uppercase tracking-wide text-[#3f3d3d]">
              {date}
            </p>
          )}
          {isPrivate && (
            <span className="text-xs font-semibold rounded-full px-2 py-1 bg-red-100 text-red-600 inline-flex items-center gap-1">
              <Lock className="h-3 w-3" /> Private
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-bold text-[22px] md:text-2xl tracking-[-0.5px] leading-[26px] md:leading-[30px] mb-4" style={{ ...cardTitleStyle, color: CARD_TITLE_COLOR }}>
          {title}
        </h2>

        {/* First paragraph preview */}
        <div className="flex-grow overflow-hidden">
          <p className="text-lg md:text-xl whitespace-pre-line leading-relaxed line-clamp-6 text-left font-normal" style={{ color: CARD_BODY_COLOR }}>
            {chunks[0]}
          </p>
        </div>

        {/* Click to read link */}
        <div className="mt-auto pt-3 text-center">
          <span className="text-sm font-medium text-[#D4870E] hover:text-[#B8740C] transition-colors">
            Click to read in page-by-page mode →
          </span>
        </div>
      </div>
    </div>
  );
}
