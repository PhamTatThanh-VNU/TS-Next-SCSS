import {GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User} from 'firebase/auth'
import { auth } from './config';


export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

export const signOut = async () => {  
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}