"use client";

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import { getCommunityByHandle } from '@/lib/community-utils';
import { type Post, type Community } from '@/lib/types';
import { useCommunityAuth } from '@/hooks/use-community-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { WillerSidebar } from '@/components/landing/willer-sidebar';
import { WillerFilterTabs } from '@/components/landing/willer-filter-tabs';
import { PageSkeleton } from '@/components/community/feed/page-skeleton';
import { FeedSkeletons } from '@/components/community/feed/skeletons';
import { ReadCard } from '@/components/content-cards/read-card';
import { ListenCard } from '@/components/content-cards/listen-card';
import { WatchCard } from '@/components/content-cards/watch-card';
import { UnifiedAuthDialog } from '@/components/community/unified-auth-dialog';
import { PrivacyPolicyDialog } from '@/components/auth/privacy-policy-dialog';
import { useAuthWithVerification } from '@/hooks/use-auth-with-verification';

type FilterType = "All" | "Read" | "Listen" | "Watch";

const imgEllipse1 = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";

function PostList({ filter }: { filter: string }) {
  const params = useParams();
  const handle = params.handle as string;
  const { user, loading: authLoading } = useCommunityAuth();
  const [posts, setPosts] = useState<(Post & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<(Post & { id: string }) | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }

    const postsRef = collection(db, 'blogs');
    let postsQuery;

    if (user) {
      postsQuery = query(
        postsRef,
        where('communityHandle', '==', handle),
        where('visibility', 'in', ['public', 'private']),
        orderBy('createdAt', 'desc')
      );
    } else {
      postsQuery = query(
        postsRef,
        where('communityHandle', '==', handle),
        where('visibility', '==', 'public'),
        orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (Post & { id: string })[];
      
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching posts:', error);
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'blogs',
        operation: 'list'
      }));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [handle, user, authLoading]);
  
  const getReadTime = (post: Post) => {
    const textLength = post.content?.text?.length || 0;
    return `${Math.max(1, Math.ceil(textLength / 1000))} min read`;
  };

  const getPostDate = (post: Post) => {
    if (post.createdAt?.toDate) {
      return post.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
    }
    return '2026';
  };

  const shouldShowPost = (type: string) => {
    if (filter === "all") return true;
    if (filter === "read" && (type === "text" || type === "image")) return true;
    if (filter === "listen" && type === "audio") return true;
    if (filter === "watch" && type === "video") return true;
    return false;
  };

  const renderCard = (post: Post & { id: string }) => {
    switch (post.type) {
      case 'audio':
        return (
          <ListenCard
            key={post.id}
            post={post}
            category="Audio"
            episode="Listen"
            duration="3:07"
            title={post.title || 'Untitled'}
            summary={post.content?.text || ''}
            isPrivate={post.visibility === 'private'}
          />
        );
      case 'video':
        return (
          <WatchCard
            key={post.id}
            post={post}
            category="Video"
            title={post.title || 'Untitled'}
            imageUrl={post.content?.mediaUrls?.[0] || ''}
            imageHint=""
            isPrivate={post.visibility === 'private'}
          />
        );
      case 'text':
      default:
        return (
          <ReadCard
            key={post.id}
            post={post}
            category="Text"
            readTime={getReadTime(post)}
            date={getPostDate(post)}
            title={post.title || 'Untitled'}
            summary={post.content?.text || ''}
            isPrivate={post.visibility === 'private'}
          />
        );
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        <FeedSkeletons />
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => shouldShowPost(post.type));
  const postRows: (Post & { id: string })[][] = [];
  for (let i = 0; i < filteredPosts.length; i += 2) {
    postRows.push(filteredPosts.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {postRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-col md:flex-row gap-6">
          {row.map((post) => (
            <div key={post.id} className="flex-1 min-h-[400px]">
              {renderCard(post)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function PublicCommunityPage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user, loading: authLoading } = useCommunityAuth();
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  
  const {
    dialogState,
    setDialogState,
    formState,
    handleFormChange,
    handleCheckboxChange,
    handleSignUp,
    handleSignIn,
    handleSignInWithGoogle,
    handleToggleMode,
    handleSendVerificationCode,
    handleVerifyCode
  } = useAuthWithVerification();


  useEffect(() => {
    async function fetchCommunityData() {
      if (!handle) return;
      const data = await getCommunityByHandle(handle);
      setCommunityData(data);
    }
    fetchCommunityData();
  }, [handle]);
  
  if (authLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-[#bfbebd] flex">
      {/* Sidebar */}
      <WillerSidebar
        profileImage={communityData?.communityProfileImage || imgEllipse1}
        handle={handle}
        onSignInClick={() => setDialogState({ ...dialogState, isSignInOpen: true, isSignUpOpen: false })}
        onJoinClick={() => setDialogState({ ...dialogState, isSignUpOpen: true, isSignInOpen: false })}
      />

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
              <WillerFilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
          </div>
        </header>

        {/* Main Feed Content */}
        <main className="relative z-10 pb-8 md:pb-12">
          <div className="max-w-[1090px] mx-auto px-3 md:px-6">
          {/* Hero Section with Profile Picture */}
          <section className="mb-4 md:mb-6 flex flex-col md:flex-row items-start justify-between gap-3 md:gap-6 pt-4 md:pt-6">
            <div className="flex-1 w-full">
              <h2
                className="font-bold text-2xl md:text-5xl leading-[32px] md:leading-[58px] tracking-[-0.5px] md:tracking-[-1px] mb-2 md:mb-3 bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(59.5982deg, rgb(156, 165, 198) 3.1066%, rgb(186, 193, 224) 97.105%)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome to the {communityData?.name || 'Willer'} Universe
              </h2>
              <p className="text-sm md:text-2xl text-[#94a3b8] font-normal leading-[22px] md:leading-normal">
                A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.
              </p>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              {communityData?.communityProfileImage && (
                <img
                  src={communityData.communityProfileImage}
                  alt={`${communityData.name}'s profile`}
                  className="size-[100px] rounded-full object-cover shadow-lg border-4 border-[#e8dfd0]"
                />
              )}
            </div>
          </section>

          {/* Compact Join CTA */}
          {!user && (
            <section className="bg-gradient-to-br from-[#8abfd6] to-[#6da4be] rounded-[12px] md:rounded-[16px] p-3 md:p-4 mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <div className="flex-1 w-full">
                <p className="text-[13px] md:text-[16px] text-[#f5f1e8] leading-5 md:leading-6 tracking-[-0.1px] md:tracking-[-0.2px]">
                  <span className="font-bold text-[#ffdea8]">I'd love you to join the community</span> to view full content, updates and insights. Please join or sign in.
                </p>
              </div>
              <div className="flex items-center gap-0 flex-shrink-0">
                <button
                  onClick={() => setDialogState({ ...dialogState, isSignUpOpen: true, isSignInOpen: false })}
                  className="bg-[#62b7c8] border-2 border-[#40b8d0] px-3 md:px-4 py-1.5 md:py-2 rounded-l-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#53a3b4] transition-colors h-[32px] md:h-[40px] whitespace-nowrap"
                >
                  Join
                </button>
                <button
                  onClick={() => setDialogState({ ...dialogState, isSignInOpen: true, isSignUpOpen: false })}
                  className="bg-[#5293a1] border-2 border-[#40b8d0] border-l-0 px-3 md:px-4 py-1.5 md:py-2 rounded-r-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#467f8d] transition-colors h-[32px] md:h-[40px] whitespace-nowrap"
                >
                  Sign in
                </button>
              </div>
            </section>
          )}

            <Suspense fallback={<FeedSkeletons />}>
              <PostList filter={activeFilter.toLowerCase()} />
            </Suspense>
          </div>
        </main>
      </div>

      {/* Unified Auth Dialog */}
      <UnifiedAuthDialog
        isOpen={dialogState.isSignUpOpen || dialogState.isSignInOpen}
        onClose={() => setDialogState({ ...dialogState, isSignUpOpen: false, isSignInOpen: false })}
        firstName={formState.firstName}
        lastName={formState.lastName}
        email={formState.email}
        password={formState.password}
        agreedToPrivacy={formState.agreedToPrivacy}
        error={formState.error}
        onFirstNameChange={(value: string) => handleFormChange('firstName', value)}
        onLastNameChange={(value: string) => handleFormChange('lastName', value)}
        onEmailChange={(value: string) => handleFormChange('email', value)}
        onPasswordChange={(value: string) => handleFormChange('password', value)}
        onAgreedToPrivacyChange={(value: boolean) => handleCheckboxChange('agreedToPrivacy', value)}
        onSubmit={handleSignUp}
        onGoogleSignIn={handleSignInWithGoogle}
        onShowPrivacyPolicy={() => setDialogState({ ...dialogState, showPrivacyPolicy: true })}
        onSendVerificationCode={handleSendVerificationCode}
        onVerifyCode={handleVerifyCode}
        communityName={communityData?.name}
      />
      
      <PrivacyPolicyDialog
        open={dialogState.showPrivacyPolicy}
        onOpenChange={(open) => setDialogState({ ...dialogState, showPrivacyPolicy: open })}
      />
    </div>
  );
}
