// auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
//authentication fields in firebase,using firebase auth(email, password)
export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
