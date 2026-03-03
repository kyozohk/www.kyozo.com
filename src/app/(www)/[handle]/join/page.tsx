"use client";

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import { getCommunityByHandle } from '@/lib/community-utils';
import { type Community } from '@/lib/types';
import { useCommunityAuth } from '@/hooks/use-community-auth';
import { useAuthAndDialog } from '@/hooks/use-auth-and-dialog';
import { SignupDialog } from '@/components/community/signup-dialog';
import { PrivacyPolicyDialog } from '@/components/auth/privacy-policy-dialog';
import { PageSkeleton } from '@/components/community/feed/page-skeleton';

export default function JoinCommunityPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handle = params.handle as string;
  const { user, loading: authLoading } = useCommunityAuth();
  
  const {
    dialogState,
    setDialogState,
    formState,
    handleFormChange,
    handleCheckboxChange,
    handleSignUp,
    handleSignIn,
    handleSignInWithGoogle,
    handleToggleMode
  } = useAuthAndDialog();

  const [communityData, setCommunityData] = useState<Community | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Extract invite parameters from URL
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';

  useEffect(() => {
    async function fetchCommunityData() {
      if (!handle) return;
      const data = await getCommunityByHandle(handle);
      setCommunityData(data);
    }
    fetchCommunityData();
  }, [handle]);

  // Pre-fill form with invite data and open signup dialog
  useEffect(() => {
    if (firstName || lastName || email) {
      if (firstName) handleFormChange('firstName', firstName);
      if (lastName) handleFormChange('lastName', lastName);
      if (email) handleFormChange('email', email);
      
      // Open signup dialog
      setDialogState({ 
        isSignInOpen: false, 
        isSignUpOpen: true, 
        isResetPasswordOpen: false, 
        showPrivacyPolicy: false 
      });
    }
  }, [firstName, lastName, email]);

  // Auto-join community after successful signup
  useEffect(() => {
    async function joinCommunity() {
      if (!user || !communityData || hasJoined || isJoining) return;

      setIsJoining(true);
      try {
        // Check if already a member
        const memberDocId = `${user.uid}_${communityData.communityId}`;
        const memberRef = doc(db, 'communityMembers', memberDocId);
        const memberSnap = await getDoc(memberRef);

        if (!memberSnap.exists()) {
          // Join the community
          const memberData = {
            userId: user.uid,
            communityId: communityData.communityId,
            role: 'member',
            joinedAt: serverTimestamp(),
            userDetails: {
              displayName: user.displayName || user.email,
              email: user.email,
              avatarUrl: user.photoURL || '',
            }
          };

          await setDoc(memberRef, memberData);
          console.log('✅ User joined community successfully');
        }

        setHasJoined(true);
        
        // Redirect to community feed after a short delay
        setTimeout(() => {
          router.push(`/${handle}`);
        }, 1500);
      } catch (error) {
        console.error('❌ Error joining community:', error);
        setIsJoining(false);
      }
    }

    joinCommunity();
  }, [user, communityData, hasJoined, isJoining, handle, router]);

  if (authLoading) {
    return <PageSkeleton />;
  }

  // If user is already logged in and has joined, show success message
  if (user && hasJoined) {
    return (
      <div className="min-h-screen bg-[#bfbebd] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#f5f1e8] rounded-[20px] shadow-2xl p-8 md:p-10 text-center border-2 border-[#e8dfd0]">
          <div className="w-20 h-20 bg-[#926b7f] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#4f4949] mb-3">Welcome to {communityData?.name}!</h2>
          <p className="text-base text-[#504c4c] mb-4 leading-6">You've successfully joined the community.</p>
          <p className="text-sm text-[#6b7280] font-medium">Redirecting to the feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#bfbebd] flex flex-col items-center justify-center p-4">
      {/* Background overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(231,226,215,0.8)] inset-0 mix-blend-overlay" />
      </div>

      <div className="max-w-lg w-full bg-[#f5f1e8] rounded-[20px] shadow-2xl p-8 md:p-12 text-center border-2 border-[#e8dfd0] relative z-10">
        {communityData?.communityProfileImage && (
          <img 
            src={communityData.communityProfileImage} 
            alt={communityData.name}
            className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-[#e8dfd0] shadow-lg"
          />
        )}

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4f4949] mb-4 tracking-tight">Join {communityData?.name}</h1>
          <p className="text-lg text-[#504c4c] leading-relaxed">You've been invited to join this community</p>
        </div>

        <div className="bg-white/50 rounded-[16px] p-6 mb-6">
          <p className="text-base text-[#504c4c] leading-6">
            Complete your signup below to become a member and access exclusive content, community discussions, and more.
          </p>
        </div>

        <button
          onClick={() => setDialogState({ 
            isSignInOpen: false, 
            isSignUpOpen: true, 
            isResetPasswordOpen: false, 
            showPrivacyPolicy: false 
          })}
          className="w-full bg-[#926b7f] text-white font-semibold py-4 px-8 rounded-full hover:bg-[#7d5a6b] transition-colors uppercase tracking-wide text-sm shadow-lg"
        >
          Get Started
        </button>
      </div>

      <SignupDialog
        isOpen={dialogState.isSignUpOpen || dialogState.isSignInOpen}
        onClose={() => {
          setDialogState({ ...dialogState, isSignUpOpen: false, isSignInOpen: false });
          router.push(`/${handle}`);
        }}
        isSignup={dialogState.isSignUpOpen}
        communityName={communityData?.name}
        firstName={formState.firstName}
        lastName={formState.lastName}
        email={formState.email}
        phone={formState.phone}
        password={formState.password}
        agreedToPrivacy={formState.agreedToPrivacy}
        error={formState.error}
        onFirstNameChange={(value) => handleFormChange('firstName', value)}
        onLastNameChange={(value) => handleFormChange('lastName', value)}
        onEmailChange={(value) => handleFormChange('email', value)}
        onPhoneChange={(value) => handleFormChange('phone', value)}
        onPasswordChange={(value) => handleFormChange('password', value)}
        onAgreedToPrivacyChange={(value) => handleCheckboxChange('agreedToPrivacy', value)}
        onSubmit={dialogState.isSignUpOpen ? handleSignUp : handleSignIn}
        onGoogleSignIn={handleSignInWithGoogle}
        onToggleMode={handleToggleMode}
        onShowPrivacyPolicy={() => setDialogState({ ...dialogState, showPrivacyPolicy: true })}
      />
      
      <PrivacyPolicyDialog
        open={dialogState.showPrivacyPolicy}
        onOpenChange={(open) => setDialogState({ ...dialogState, showPrivacyPolicy: open })}
      />
    </div>
  );
}
