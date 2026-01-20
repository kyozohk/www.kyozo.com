import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
import { communityApp } from './config';

export const communityAuth = getAuth(communityApp);

// Set persistence to in-memory to avoid localStorage usage
if (typeof window !== 'undefined') {
  setPersistence(communityAuth, inMemoryPersistence).catch((error) => {
    console.error('Error setting community auth persistence:', error);
  });
}
