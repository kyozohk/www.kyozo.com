import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { app } from './config';

export const communityAuth = getAuth(app);

// Set persistence to in-memory to avoid localStorage usage
if (typeof window !== 'undefined') {
  setPersistence(communityAuth, browserLocalPersistence).catch((error) => {
    console.error('Error setting community auth persistence:', error);
  });
}
