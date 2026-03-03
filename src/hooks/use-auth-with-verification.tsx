'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { communityAuth } from '@/firebase/community-auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { joinCommunity } from '@/lib/community-utils';
import { useParams } from 'next/navigation';

interface AuthWithVerificationContextType {
  user: User | null;
  loading: boolean;
  dialogState: DialogState;
  setDialogState: (state: DialogState) => void;
  formState: FormState;
  handleFormChange: (field: keyof FormState, value: string) => void;
  handleCheckboxChange: (field: keyof FormState, value: boolean) => void;
  handleSignUp: () => Promise<void>;
  handleSignIn: () => Promise<void>;
  handleSignInWithGoogle: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleToggleMode: () => void;
  handleSendVerificationCode: (email: string) => Promise<void>;
  handleVerifyCode: (code: string) => Promise<boolean>;
}

interface DialogState {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  isResetPasswordOpen: boolean;
  showPrivacyPolicy: boolean;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreedToPrivacy: boolean;
  error: string | null;
}

const AuthWithVerificationContext = createContext<AuthWithVerificationContextType | undefined>(undefined);

export const AuthWithVerificationProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const params = useParams();
  const handle = params.handle as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingUserData, setPendingUserData] = useState<any>(null);
  const [dialogState, setDialogState] = useState<DialogState>({
    isSignInOpen: false,
    isSignUpOpen: false,
    isResetPasswordOpen: false,
    showPrivacyPolicy: false,
  });

  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreedToPrivacy: false,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(communityAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFormChange = (field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value, error: null }));
  };
  
  const handleCheckboxChange = (field: keyof FormState, value: boolean) => {
    setFormState(prev => ({ ...prev, [field]: value, error: null }));
  };

  const resetForm = () => {
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agreedToPrivacy: false,
      error: null,
    });
    setPendingUserData(null);
  };

  const handleSendVerificationCode = async (email: string) => {
    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      // Store pending user data for after verification
      setPendingUserData({
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      });

      toast({ 
        title: "Code sent!", 
        description: `Check your email at ${email}`,
      });

      // In development, show the code in console
      if (data.devCode) {
        console.log('🔐 DEV - Verification code:', data.devCode);
        toast({
          title: "DEV MODE",
          description: `Code: ${data.devCode}`,
          duration: 10000,
        });
      }
    } catch (error: any) {
      setFormState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const handleVerifyCode = async (code: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formState.email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!pendingUserData) {
      setFormState(prev => ({ ...prev, error: "Session expired. Please try again." }));
      return;
    }

    setFormState(prev => ({ ...prev, error: null }));

    try {
      console.log('🔐 SIGNUP - Creating user account...');
      const userCredential = await createUserWithEmailAndPassword(
        communityAuth, 
        pendingUserData.email, 
        pendingUserData.password
      );
      const user = userCredential.user;
      console.log('✅ SIGNUP - User created:', user.uid);
      
      await updateProfile(user, { 
        displayName: `${pendingUserData.firstName} ${pendingUserData.lastName}` 
      });
      
      console.log('💾 SIGNUP - Creating user document in Firestore...');
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        email: pendingUserData.email,
        firstName: pendingUserData.firstName,
        lastName: pendingUserData.lastName,
        displayName: `${pendingUserData.firstName} ${pendingUserData.lastName}`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log('✅ SIGNUP - User document created');

      // Join the current community if handle exists
      if (handle) {
        console.log('🏘️ SIGNUP - Joining community with handle:', handle);
        const { getCommunityByHandle } = await import('@/lib/community-utils');
        const communityData = await getCommunityByHandle(handle);
        
        if (communityData) {
          await joinCommunity(user.uid, communityData.communityId, {
            displayName: `${pendingUserData.firstName} ${pendingUserData.lastName}`,
            email: pendingUserData.email,
          });
          console.log('✅ SIGNUP - Successfully joined community');
        }
      }

      toast({ title: "Welcome!", description: "Your account has been created." });
      setDialogState({ ...dialogState, isSignUpOpen: false });
      resetForm();
    } catch (error: any) {
      console.error('❌ SIGNUP - Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setFormState(prev => ({ ...prev, error: "This email is already in use. Please sign in." }));
      } else {
        setFormState(prev => ({ ...prev, error: "Could not create account. Please try again." }));
      }
    }
  };

  const handleSignIn = async () => {
    setFormState(prev => ({ ...prev, error: null }));
    try {
      await signInWithEmailAndPassword(communityAuth, formState.email, formState.password);
      toast({ title: "Signed In", description: "Welcome back!" });
      setDialogState({ ...dialogState, isSignInOpen: false });
      resetForm();
    } catch (error) {
      setFormState(prev => ({ ...prev, error: "Invalid credentials. Please try again." }));
    }
  };
  
  const handleSignInWithGoogle = async () => {
    setFormState(prev => ({...prev, error: null}));
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(communityAuth, provider);
      
      // Create/update user document
      await setDoc(doc(db, "users", result.user.uid), {
        userId: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      // Join community if handle exists
      if (handle) {
        const { getCommunityByHandle } = await import('@/lib/community-utils');
        const communityData = await getCommunityByHandle(handle);
        
        if (communityData) {
          await joinCommunity(result.user.uid, communityData.communityId, {
            displayName: result.user.displayName || result.user.email || '',
            email: result.user.email || '',
          });
        }
      }

      setDialogState({ isSignInOpen: false, isSignUpOpen: false, isResetPasswordOpen: false, showPrivacyPolicy: false});
      toast({ title: 'Signed In', description: 'Welcome!'});
    } catch (error) {
      setFormState(prev => ({ ...prev, error: 'Could not sign in with Google. Please try again.'}));
    }
  };

  const handleSignOut = async () => {
    await firebaseSignOut(communityAuth);
    toast({ title: "Signed Out" });
  };
  
  const handleToggleMode = () => {
    setDialogState(prev => ({ ...prev, isSignInOpen: !prev.isSignInOpen, isSignUpOpen: !prev.isSignUpOpen }));
    resetForm();
  };

  const value = {
    user,
    loading,
    dialogState,
    setDialogState,
    formState,
    handleFormChange,
    handleCheckboxChange,
    handleSignUp,
    handleSignIn,
    handleSignInWithGoogle,
    handleSignOut,
    handleToggleMode,
    handleSendVerificationCode,
    handleVerifyCode,
  };

  return (
    <AuthWithVerificationContext.Provider value={value}>
      {children}
    </AuthWithVerificationContext.Provider>
  );
};

export const useAuthWithVerification = () => {
  const context = useContext(AuthWithVerificationContext);
  if (context === undefined) {
    throw new Error('useAuthWithVerification must be used within an AuthWithVerificationProvider');
  }
  return context;
};
