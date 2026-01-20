import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, setPersistence, inMemoryPersistence } from 'firebase/auth';

// Polyfill localStorage for server-side rendering
if (typeof window === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0
  } as Storage;
}

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function initializeFirebase() {
  if (typeof window === 'undefined') {
    // On the server, we don't want to initialize the app.
    // This is a client-side only library.
    return { app: null, firestore: null, auth: null };
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  
  // Set persistence to in-memory to avoid localStorage usage
  setPersistence(auth, inMemoryPersistence).catch((error) => {
    console.error('Error setting auth persistence:', error);
  });
  
  return { app, firestore, auth };
}

let firebaseServices: { app: any; firestore: Firestore | null, auth: Auth | null };

export function getFirebase() {
  if (!firebaseServices) {
    firebaseServices = initializeFirebase();
  }
  return firebaseServices;
}

export * from './provider';

    