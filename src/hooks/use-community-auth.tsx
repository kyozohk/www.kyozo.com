
'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut as firebaseSignOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { communityAuth } from '@/firebase/community-auth';
import { isUserCommunityMember } from '@/lib/community-utils';
import { getCommunityByHandle } from '@/lib/community-utils';

interface CommunityAuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  hasJoinedCommunity: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  setShowSignInModal: (show: boolean) => void;
  setShowJoinCommunityModal: (show: boolean) => void;
}

const CommunityAuthContext = createContext<CommunityAuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false,
  hasJoinedCommunity: false,
  signIn: () => Promise.reject('signIn function not implemented'),
  signOut: () => Promise.reject('signOut function not implemented'),
  setShowSignInModal: () => {},
  setShowJoinCommunityModal: () => {},
});

export const CommunityAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasJoinedCommunity, setHasJoinedCommunity] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showJoinCommunityModal, setShowJoinCommunityModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(communityAuth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      // Check community membership if user is logged in
      if (firebaseUser) {
        try {
          const communityData = await getCommunityByHandle('willer');
          if (communityData) {
            const isMember = await isUserCommunityMember(firebaseUser.uid, communityData.communityId);
            setHasJoinedCommunity(isMember);
          }
        } catch (error) {
          console.error('Error checking community membership:', error);
          setHasJoinedCommunity(false);
        }
      } else {
        setHasJoinedCommunity(false);
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(communityAuth, email, password);
    return userCredential.user;
  }

  const signOut = async () => {
    await firebaseSignOut(communityAuth);
  }

  return (
    <CommunityAuthContext.Provider value={{ 
      user, 
      loading, 
      isLoggedIn: !!user,
      hasJoinedCommunity,
      signIn, 
      signOut,
      setShowSignInModal,
      setShowJoinCommunityModal
    }}>
      {children}
    </CommunityAuthContext.Provider>
  );
};

export const useCommunityAuth = () => useContext(CommunityAuthContext);
