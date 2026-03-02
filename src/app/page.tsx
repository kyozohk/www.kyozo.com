"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import { getCommunityByHandle } from '@/lib/community-utils';
import { type Post, type Community } from '@/lib/types';
import { FeedSkeletons } from '@/components/community/feed/skeletons';
import { useCommunityAuth } from '@/hooks/use-community-auth';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { PostDetailPanel } from '@/components/community/feed/post-detail-panel';
import { WillerSidebar } from '@/components/landing/willer-sidebar';
import { WillerFilterTabs } from '@/components/landing/willer-filter-tabs';
import { PageSkeleton } from '@/components/community/feed/page-skeleton';

type FilterType = "All" | "Read" | "Listen" | "Watch";

const imgEllipse1 = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop";
const playIconPath = "M6.25 4.16699L15.4167 10.0003L6.25 15.8337V4.16699Z";

const waveformHeights = [38, 81.11, 92.4, 87.26, 74.62, 38.12, 72.21, 95.09, 70.37, 84.91, 90.7, 71.52, 36.39, 68.27, 60.64, 57.66, 89.88, 42.92, 84.24, 71.38, 75.78, 87.11, 93.05, 70.59, 35.1, 76.94, 63.26, 44.98, 65.27, 39.71, 49.71, 46.71, 82.29, 80.28, 27.03, 50.84, 81.16, 92.13, 63.68, 71.16, 76.09, 84.96, 71.38, 76.09, 65.02, 79.26, 19.7, 93.15, 53.59, 94.83, 22.74, 75.81, 64.91, 83.78, 60.81, 32.09, 24.37, 22.91, 73.16, 82.45, 69.32, 23.71, 75.11, 56.01, 42.42, 90.53, 30.08, 29.15, 52.05, 85.7, 74.38, 32.36, 34.06, 48.47, 32.3, 30.38, 40.51, 95.45, 52.01, 95.89];

function WillerLandingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useCommunityAuth();
  const [posts, setPosts] = useState<(Post & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedPost, setSelectedPost] = useState<(Post & { id: string }) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showJoinCommunityModal, setShowJoinCommunityModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joinEmail, setJoinEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [joinStep, setJoinStep] = useState(1);
  const handle = 'willer';

  useEffect(() => {
    async function fetchCommunityData() {
      const data = await getCommunityByHandle(handle);
      setCommunityData(data);
    }
    fetchCommunityData();
  }, []);

  useEffect(() => {
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
  }, [user, authLoading]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const resetSignInForm = () => {
    setSignInEmail("");
    setSignInPassword("");
    setRememberMe(false);
  };

  const resetJoinForm = () => {
    setGivenName("");
    setLastName("");
    setJoinEmail("");
    setMobileNumber("");
    setVerificationCode("");
    setAgreedToTerms(false);
    setJoinStep(1);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (signInEmail && signInPassword) {
      setShowSignInModal(false);
      resetSignInForm();
    }
  };

  const handleJoinNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinStep === 1 && givenName && lastName && joinEmail && mobileNumber && agreedToTerms) {
      setJoinStep(2);
    } else if (joinStep === 2 && verificationCode) {
      setJoinStep(3);
      setTimeout(() => {
        setShowJoinCommunityModal(false);
        resetJoinForm();
      }, 2000);
    }
  };

  const shouldShowPost = (type: string) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Read" && (type === "text" || type === "image")) return true;
    if (activeFilter === "Listen" && type === "audio") return true;
    if (activeFilter === "Watch" && type === "video") return true;
    return false;
  };

  if (loading) {
    return <PageSkeleton />;
  }

  const filteredPosts = posts.filter((post) => shouldShowPost(post.type));

  // Group posts into rows of 2 (exactly like v2)
  const postRows: (Post & { id: string })[][] = [];
  for (let i = 0; i < filteredPosts.length; i += 2) {
    postRows.push(filteredPosts.slice(i, i + 2));
  }

  // Helper to get post metadata
  const getReadTime = (post: Post) => {
    const text = post.content?.text || '';
    return `${Math.max(1, Math.ceil(text.length / 1000))} min read`;
  };

  const getPostDate = (post: Post & { id: string }) => {
    if (post.createdAt?.toDate) {
      return post.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
    }
    return 'JAN 2026';
  };

  // Render a Text card (exact v2 structure)
  const renderTextCard = (post: Post & { id: string }) => (
    <div key={post.id} className="flex-1 cursor-pointer" onClick={() => setSelectedPost(post)}>
      <article className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
        <div className="flex gap-2 items-center mb-4">
          <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
            Text
          </span>
          <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">{getReadTime(post)} • {getPostDate(post)}</span>
        </div>
        <h3 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] mb-4">
          {post.title || 'Untitled'}
        </h3>
        <p className="text-base text-[rgba(80,76,76,0.8)] leading-6 tracking-[-0.2px] mb-4">
          {post.content?.text?.slice(0, 300) || ''}
          {(post.content?.text?.length || 0) > 300 ? '…' : ''}
        </p>
        <div className="flex justify-end">
          <span className="font-semibold text-sm text-[#504c4c] uppercase tracking-wide">
            Read Full Article →
          </span>
        </div>
      </article>
    </div>
  );

  // Render an Image card (exact v2 structure)
  const renderImageCard = (post: Post & { id: string }) => {
    const imageUrl = post.content?.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop';
    return (
      <div key={post.id} className="flex-1 cursor-pointer" onClick={() => setSelectedPost(post)}>
        <article className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group h-full">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imageUrl} />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="relative p-6 flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <div className="flex gap-2 items-center mb-4">
                <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Image
                </span>
                <span className="text-xs text-[#d9d9d9] uppercase tracking-wide">{getReadTime(post)} • {getPostDate(post)}</span>
              </div>
              <h3 className="font-bold text-4xl text-white tracking-[-0.72px] leading-10 mb-4">
                {post.title || 'Untitled'}
              </h3>
              <p className="text-base text-[rgba(255,255,255,0.8)] leading-6 tracking-[-0.2px]">
                {post.content?.text?.slice(0, 150) || ''}
              </p>
            </div>
            <div className="flex justify-end">
              <span className="font-semibold text-sm text-white uppercase tracking-wide">View →</span>
            </div>
          </div>
        </article>
      </div>
    );
  };

  // Render an Audio card (exact v2 structure)
  const renderAudioCard = (post: Post & { id: string }) => (
    <div key={post.id} className="flex-1 cursor-pointer" onClick={() => setSelectedPost(post)}>
      <article className="bg-[#f5f1e8] rounded-[20px] p-6 hover:shadow-lg transition-shadow h-full">
        <div className="flex gap-2 items-center mb-4">
          <span className="bg-[#6e94b1] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
            Audio
          </span>
          <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">Listen • 3:07</span>
        </div>
        <h3 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[38px] mb-4">
          {post.title || 'Untitled Audio'}
        </h3>
        <p className="text-sm text-[#5a5a5a] leading-[22.4px] mb-6 truncate">
          {post.content?.text || ''}
        </p>
        <div className="flex gap-3.5 items-center">
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="bg-[#6e94b1] rounded-full size-12 flex items-center justify-center hover:bg-[#5d7c96] transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <svg className="size-5" fill="none" viewBox="0 0 20 20">
              <path d={playIconPath} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </button>
          <div className="flex-1 flex gap-1 items-center justify-between h-[60px]">
            {waveformHeights.map((height, i) => (
              <div key={i} className="bg-[#ccc] w-[3.253px] rounded-full" style={{ height: `${height}px` }} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );

  // Render a Video/Watch card (exact v2 structure)
  const renderVideoCard = (post: Post & { id: string }) => {
    const imageUrl = post.content?.mediaUrls?.[0] || post.content?.thumbnailUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop';
    return (
      <div key={post.id} className="flex-1 cursor-pointer" onClick={() => setSelectedPost(post)}>
        <article className="relative rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group h-full">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={imageUrl} />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="relative p-6 flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <div className="flex gap-2 items-center mb-4">
                <span className="bg-[#f0c679] text-black text-[10px] font-medium px-2.5 py-1.5 rounded-full uppercase tracking-[0.5px]">
                  Watch
                </span>
                <span className="text-xs text-[#d9d9d9] uppercase tracking-wide">{getReadTime(post)} • {getPostDate(post)}</span>
              </div>
              <h3 className="font-bold text-4xl text-white tracking-[-0.72px] leading-10 mb-4">
                {post.title || 'Untitled Video'}
              </h3>
              <p className="text-base text-[rgba(255,255,255,0.8)] leading-6 tracking-[-0.2px]">
                {post.content?.text?.slice(0, 150) || ''}
              </p>
            </div>
            <div className="flex gap-4 items-center w-full max-w-[485px]">
              <button
                onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                className="bg-[#f0c679] rounded-full size-12 flex items-center justify-center hover:bg-[#e8be67] transition-colors relative"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <svg className="size-5 absolute left-[calc(50%+1px)] top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 20 20">
                  <path d={playIconPath} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </button>
              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                <p className="text-sm font-medium text-white leading-5">0:00 / 0:00</p>
                <div className="bg-[#c4c4c4] border border-[#8f8f8f] rounded-full w-full p-px">
                  <div className="bg-[#f7d47a] rounded-full size-2" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  };

  // Render a single post card based on type
  const renderCard = (post: Post & { id: string }) => {
    switch (post.type) {
      case 'audio': return renderAudioCard(post);
      case 'video': return renderVideoCard(post);
      case 'image': return renderImageCard(post);
      default: return renderTextCard(post);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#bfbebd] flex">
      {/* Sidebar */}
      <WillerSidebar
        profileImage={communityData?.communityProfileImage}
        onSignInClick={() => setShowSignInModal(true)}
        onJoinClick={() => setShowJoinCommunityModal(true)}
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

        {/* Sign In Modal */}
        {showSignInModal && (
          <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center md:p-4">
            <div className="bg-gradient-to-br from-[#f8f7fc] to-[#fefefe] w-full h-full md:h-auto md:rounded-3xl shadow-2xl md:max-w-md p-6 md:p-10 animate-in fade-in md:zoom-in-95 duration-200 overflow-y-auto relative">
              <button onClick={() => { setShowSignInModal(false); resetSignInForm(); }} className="absolute top-4 right-4 md:top-6 md:right-6 size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group z-10" aria-label="Close">
                <svg className="w-6 h-6 text-[#9ca3af] group-hover:text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Sign In</h2>
                <p className="text-sm md:text-base text-[#6b7280]">Welcome back to Kyozo</p>
              </div>
              <form onSubmit={handleSignIn} className="space-y-4 md:space-y-5">
                <div>
                  <label htmlFor="signin-email" className="block text-sm font-semibold text-[#111827] mb-2">Email Address <span className="text-[#ef4444]">*</span></label>
                  <input id="signin-email" type="email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" placeholder="your@email.com" required />
                </div>
                <div>
                  <label htmlFor="signin-password" className="block text-sm font-semibold text-[#111827] mb-2">Password <span className="text-[#ef4444]">*</span></label>
                  <input id="signin-password" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" placeholder="Enter your password" required />
                </div>
                <div className="flex items-center gap-3">
                  <input id="signin-remember" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="size-5 rounded border-[#e5e7eb] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]" />
                  <label htmlFor="signin-remember" className="text-sm text-[#6b7280]">Remember me</label>
                </div>
                <button type="submit" className="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">Sign In</button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-[#6b7280]">Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => { setShowSignInModal(false); resetSignInForm(); setShowJoinCommunityModal(true); }} className="text-[#6366f1] hover:underline font-semibold">Join</button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Join Community Modal */}
        {showJoinCommunityModal && (
          <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center md:p-4">
            <div className="bg-gradient-to-br from-[#f8f7fc] to-[#fefefe] w-full h-full md:h-auto md:rounded-3xl shadow-2xl md:max-w-lg p-6 md:p-10 animate-in fade-in md:zoom-in-95 duration-200 overflow-y-auto relative">
              <button onClick={() => { setShowJoinCommunityModal(false); resetJoinForm(); }} className="absolute top-4 right-4 md:top-6 md:right-6 size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors group z-10" aria-label="Close">
                <svg className="w-6 h-6 text-[#9ca3af] group-hover:text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {joinStep === 1 && (
                <>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide">STEP 1 OF 2</span>
                      <span className="text-sm font-semibold text-[#9ca3af]">50%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full w-[50%] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-8 pr-8">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="relative shrink-0 size-12 md:size-14 mt-1">
                        <img alt="Willer Universe" className="block size-full rounded-full" src={communityData?.communityProfileImage || imgEllipse1} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-[#111827] mb-2 md:mb-3">Willer Universe</h2>
                        <p className="text-sm md:text-base text-[#6b7280]">Let&apos;s start with your basic information</p>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={handleJoinNext} className="space-y-4 md:space-y-5">
                    <div>
                      <label htmlFor="community-givenName" className="block text-sm font-semibold text-[#111827] mb-2">Given Name <span className="text-[#ef4444]">*</span></label>
                      <input id="community-givenName" type="text" value={givenName} onChange={(e) => setGivenName(e.target.value)} className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" placeholder="Enter your given name" required />
                    </div>
                    <div>
                      <label htmlFor="community-lastName" className="block text-sm font-semibold text-[#111827] mb-2">Last Name <span className="text-[#ef4444]">*</span></label>
                      <input id="community-lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" placeholder="Enter your last name" required />
                    </div>
                    <div>
                      <label htmlFor="community-email" className="block text-sm font-semibold text-[#111827] mb-2">Email Address <span className="text-[#ef4444]">*</span></label>
                      <input id="community-email" type="email" value={joinEmail} onChange={(e) => setJoinEmail(e.target.value)} className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" placeholder="your@email.com" required />
                    </div>
                    <div>
                      <label htmlFor="community-mobileNumber" className="block text-sm font-semibold text-[#111827] mb-2">Mobile Number <span className="text-[#ef4444]">*</span></label>
                      <input id="community-mobileNumber" type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="w-full px-4 md:px-5 py-3 md:py-4 bg-white border border-[#e5e7eb] rounded-2xl text-base text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all" placeholder="+1 (555) 000-0000" required />
                    </div>
                    <div className="flex items-start gap-3 pt-2">
                      <input id="community-terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 size-5 rounded border-[#e5e7eb] text-[#6366f1] focus:ring-2 focus:ring-[#6366f1]" required />
                      <label htmlFor="community-terms" className="text-sm text-[#6b7280]">I agree to the <a href="#" className="text-[#6366f1] hover:underline">Terms and Conditions</a> and consent to being contacted</label>
                    </div>
                    <div className="flex items-center justify-between pt-4 md:pt-6">
                      <button type="button" onClick={() => { setShowJoinCommunityModal(false); resetJoinForm(); }} className="flex items-center gap-2 px-4 md:px-5 py-3 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                      </button>
                      <button type="submit" className="flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </form>
                  <div className="flex items-center justify-center gap-2 mt-6 md:mt-8 text-sm text-[#9ca3af]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Private invitation-only access
                  </div>
                </>
              )}
              {joinStep === 2 && (
                <>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#9ca3af] uppercase tracking-wide">STEP 2 OF 2</span>
                      <span className="text-sm font-semibold text-[#9ca3af]">100%</span>
                    </div>
                    <div className="w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
                      <div className="h-full w-[100%] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">Verify Your Identity</h2>
                    <p className="text-sm md:text-base text-[#6b7280]">We&apos;ve sent a verification code to <span className="font-semibold text-[#111827]">{mobileNumber}</span></p>
                  </div>
                  <form onSubmit={handleJoinNext} className="space-y-6">
                    <div>
                      <label htmlFor="community-code" className="block text-sm font-semibold text-[#111827] mb-2 text-center">Enter Verification Code</label>
                      <input id="community-code" type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="w-full px-4 md:px-5 py-4 md:py-5 bg-white border-2 border-[#e5e7eb] rounded-2xl text-2xl text-center font-bold text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all tracking-widest" placeholder="000000" maxLength={6} required />
                    </div>
                    <button type="button" className="w-full text-center text-sm text-[#6366f1] hover:underline font-medium">Resend Code</button>
                    <div className="flex items-center justify-between pt-4">
                      <button type="button" onClick={() => setJoinStep(1)} className="flex items-center gap-2 px-4 md:px-5 py-3 text-[#9ca3af] hover:text-[#6b7280] transition-colors font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                      </button>
                      <button type="submit" className="flex items-center gap-2 px-6 md:px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all">
                        Verify
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </button>
                    </div>
                  </form>
                </>
              )}
              {joinStep === 3 && (
                <div className="flex flex-col items-center justify-center py-8 md:py-12">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3 text-center">Welcome to Willer Universe!</h2>
                  <p className="text-base md:text-lg text-[#6b7280] text-center">Your membership has been confirmed</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area - exact v2 Home.tsx structure */}
        <main className="relative max-w-[1090px] mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-12 md:pb-20">
          {/* Hero Section with Profile Picture */}
          <section className="mb-4 md:mb-6 flex flex-col md:flex-row items-start justify-between gap-3 md:gap-6">
            <div className="flex-1 w-full">
              <h2
                className="font-bold text-2xl md:text-5xl leading-[32px] md:leading-[58px] tracking-[-0.5px] md:tracking-[-1px] mb-2 md:mb-3 bg-clip-text"
                style={{
                  /* Updated to lighter, softer lavender/periwinkle RGB values */
                  backgroundImage: "linear-gradient(59.5982deg, rgb(156, 165, 198) 3.1066%, rgb(186, 193, 224) 97.105%)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome to the Willer Universe
              </h2>
              {/* Updated text-[#4d5f71] to text-[#94a3b8] */}
              <p className="text-sm md:text-2xl text-[#94a3b8] font-normal leading-[22px] md:leading-normal">
                A living journal of ideas, process, and creative evolution. Home to MODAL - Creativity, Music and the Mind.
              </p>
            </div>
            <div className="flex-shrink-0 hidden md:block">
              <img
                src={communityData?.communityProfileImage || imgEllipse1}
                alt="Willer&apos;s profile"
                className="size-[100px] rounded-full object-cover shadow-lg border-4 border-[#e8dfd0]"
              />
            </div>
          </section>

          {/* Compact Join CTA */}
          {!user && (
            <section className="bg-gradient-to-br from-[#8abfd6] to-[#6da4be] rounded-[12px] md:rounded-[16px] p-3 md:p-4 mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
              <div className="flex-1 w-full">
                <p className="text-[13px] md:text-[16px] text-[#f5f1e8] leading-5 md:leading-6 tracking-[-0.1px] md:tracking-[-0.2px]">
                  <span className="font-bold text-[#ffdea8]">I&apos;d love you to join the community</span> to view full content, updates and insights. Please join or sign in.
                </p>
              </div>
              <div className="flex items-center gap-0 flex-shrink-0">
                <button
                  onClick={() => setShowJoinCommunityModal(true)}
                  className="bg-[#62b7c8] border-2 border-[#40b8d0] px-3 md:px-4 py-1.5 md:py-2 rounded-l-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#53a3b4] transition-colors h-[32px] md:h-[40px] whitespace-nowrap"
                >
                  Join
                </button>
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="bg-[#5293a1] border-2 border-[#40b8d0] border-l-0 px-3 md:px-4 py-1.5 md:py-2 rounded-r-[14px] font-bold text-xs md:text-sm text-white hover:bg-[#467f8d] transition-colors h-[32px] md:h-[40px] whitespace-nowrap"
                >
                  Sign in
                </button>
              </div>
            </section>
          )}

          {/* Article Grid - Rows of 2, exact v2 structure */}
          <div className="flex flex-col gap-4 md:gap-6">
            {postRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col md:flex-row gap-6">
                {row.map((post) => renderCard(post))}
              </div>
            ))}
          </div>
        </main>

        <PostDetailPanel
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      </div>
    </div>
  );
}

export default function WillerLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#bfbebd] flex items-center justify-center"><div>Loading...</div></div>}>
      <WillerLandingContent />
    </Suspense>
  );
}
