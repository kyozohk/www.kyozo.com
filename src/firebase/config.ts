import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';

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

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const communityApp = !getApps().some(app => app.name === 'community') ? initializeApp(firebaseConfig, 'community') : getApp('community');


// Enable emulators if in development mode and explicitly enabled
if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true' && process.env.NODE_ENV === 'development') {
  // We'll import and call connectToEmulators in a separate file
  // to avoid circular dependencies
  import('./emulators').then(({ connectToEmulators }) => {
    connectToEmulators();
  });
}

export { app, communityApp };
