"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { articles, articleImages } from "@/lib/articles";
import { X } from "lucide-react";
import { useCommunityAuth } from "@/hooks/use-community-auth";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { Post } from "@/lib/types";
import { UnifiedAuthDialog } from "@/components/community/unified-auth-dialog";
import { useAuthWithVerification } from "@/hooks/use-auth-with-verification";

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useCommunityAuth();
  
  const postId = params.postId as string;
  const handle = params.handle as string;
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
    const loadArticle = async () => {
      try {
        // First try to get from Firebase
        const postDoc = await getDoc(doc(db, 'blogs', postId));
        if (postDoc.exists()) {
          const postData = postDoc.data() as Post;
          setArticle({
            id: postId,
            title: postData.title || 'Untitled',
            excerpt: postData.content?.text?.substring(0, 200) || 'No excerpt available',
            content: postData.content?.text || 'No content available',
            category: postData.type || 'Article',
            readTime: '3 min read',
            date: postData.createdAt?.toDate?.().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() || '2026',
            type: postData.type || 'Read',
            imageUrl: postData.content?.mediaUrls?.[0] || postData.content?.thumbnailUrl || '',
            thumbnailUrl: postData.content?.thumbnailUrl || ''
          });
        } else {
          // Fallback to hardcoded articles
          const hardcodedArticle = articles.find((a) => a.id === postId);
          if (hardcodedArticle) {
            setArticle(hardcodedArticle);
          }
        }
      } catch (error) {
        console.error('Error loading article:', error);
        // Fallback to hardcoded articles
        const hardcodedArticle = articles.find((a) => a.id === postId);
        if (hardcodedArticle) {
          setArticle(hardcodedArticle);
        }
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadArticle();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="fixed inset-0 left-[70px] md:left-[105px] z-[60] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#926b7f] mx-auto mb-4"></div>
          <p className="text-[#504c4c]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="font-bold text-4xl text-[#4f4949] mb-4">Article not found</h1>
          <Link href={`/${handle}`} className="text-[#926b7f] hover:underline">
            Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  const hasAccess = !!user;
  // Get image from article data (could be from Firebase or hardcoded)
  const articleImage = article.imageUrl || articleImages[postId];

  return (
    <div className="fixed inset-y-0 right-0 left-[70px] md:left-[105px] z-[60] flex bg-white">
      {/* Left Half - Sidebar with article preview */}
      <div className="hidden md:block w-1/2 bg-[#f5f1e8] p-12 overflow-y-auto relative">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-[#504c4c] hover:text-[#926b7f] transition-colors relative z-10 cursor-pointer"
        >
          <X className="size-6" />
          <span className="font-semibold text-sm uppercase tracking-wide">Close</span>
        </button>
        
        {articleImage && (
          <div className="mb-8 rounded-[20px] overflow-hidden">
            {article.type === 'video' ? (
              <video 
                src={articleImage}
                controls
                className="w-full h-[400px] object-cover bg-black"
                poster={article.thumbnailUrl}
              />
            ) : article.type === 'audio' ? (
              <div className="bg-[#e8dfd0] p-8 rounded-[20px] flex flex-col items-center justify-center h-[400px]">
                <div className="w-full max-w-md">
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#926b7f] rounded-full mb-4">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                      </svg>
                    </div>
                  </div>
                  <audio 
                    src={articleImage}
                    controls
                    className="w-full"
                  />
                </div>
              </div>
            ) : (
              <img 
                src={articleImage} 
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            )}
          </div>
        )}

        <div className="flex gap-2 items-center mb-6">
          <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
            {article.category}
          </span>
          <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">
            {article.readTime} • {article.date}
          </span>
        </div>

        <h1 className="font-bold text-5xl text-[#4f4949] tracking-[-1px] leading-[52px] mb-6">
          {article.title}
        </h1>

        <p className="text-lg text-[#504c4c] leading-7">
          {article.excerpt}
        </p>
      </div>

      {/* Right Half - Full content with permission wall */}
      <div className="w-full md:w-1/2 bg-white relative overflow-hidden">
        {/* Mobile close button */}
        <div className="md:hidden sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#e8dfd0] p-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#504c4c] hover:text-[#926b7f] transition-colors"
          >
            <X className="size-6" />
            <span className="font-semibold text-sm uppercase tracking-wide">Close</span>
          </button>
        </div>

        <div className="h-full overflow-y-auto">
          <div className="max-w-[680px] mx-auto px-6 md:px-12 py-8 md:py-16">
            {/* Mobile header - only show on mobile */}
            <div className="md:hidden mb-8">
              {articleImage && (
                <div className="mb-6 rounded-[20px] overflow-hidden">
                  <img 
                    src={articleImage} 
                    alt={article.title}
                    className="w-full h-[250px] object-cover"
                  />
                </div>
              )}
              
              <div className="flex gap-2 items-center mb-4">
                <span className="bg-[#926b7f] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {article.category}
                </span>
                <span className="text-xs text-[#3f3d3d] uppercase tracking-wide">
                  {article.readTime} • {article.date}
                </span>
              </div>

              <h1 className="font-bold text-4xl text-[#4f4949] tracking-[-1px] leading-[42px] mb-4">
                {article.title}
              </h1>
            </div>

            {/* Article content */}
            <div className="relative">
              <div 
                className={`prose prose-lg max-w-none ${
                  !hasAccess ? 'mask-gradient' : ''
                }`}
                style={!hasAccess ? {
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                } : {}}
              >
                {article.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-base text-[#504c4c] leading-7 mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Permission wall overlay - content fade */}
              {!hasAccess && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed floating sign-in card - bottom center of right panel */}
      {!hasAccess && (
        <div className="fixed bottom-12 left-[calc(75%+35px)] md:left-[calc(75%+52.5px)] -translate-x-1/2 z-[70] max-w-[600px] w-full px-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-[20px] p-8 shadow-2xl border-2 border-[#e8dfd0]">
            <h3 className="font-bold text-2xl text-[#4f4949] mb-3 text-center">
              Sign in to continue reading
            </h3>
            <p className="text-base text-[#504c4c] mb-6 text-center leading-6">
              Create a free Kyozo account to access full articles, audio content, and exclusive community features.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setDialogState({ ...dialogState, isSignInOpen: true, isSignUpOpen: false })}
                className="w-full bg-[#926b7f] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#7d5a6b] transition-colors uppercase tracking-wide text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => router.back()}
                className="w-full bg-transparent border-2 border-[#e8dfd0] text-[#504c4c] font-semibold py-3 px-6 rounded-full hover:bg-[#f5f1e8] transition-colors uppercase tracking-wide text-sm"
              >
                Back to Feed
              </button>
            </div>
          </div>
        </div>
      )}

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
        communityName="Willer"
      />
    </div>
  );
}
