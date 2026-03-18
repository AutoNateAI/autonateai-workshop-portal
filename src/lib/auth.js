import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {getFirebaseServices} from './firebase.js';

const provider = new GoogleAuthProvider();

export function observeAuthState(callback) {
  const {auth} = getFirebaseServices();
  return onAuthStateChanged(auth, callback);
}

export async function signInEmail(email, password) {
  const {auth} = getFirebaseServices();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerEmail(email, password) {
  const {auth} = getFirebaseServices();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInGoogle() {
  const {auth} = getFirebaseServices();
  return signInWithPopup(auth, provider);
}

export async function signOutCurrentUser() {
  const {auth} = getFirebaseServices();
  return signOut(auth);
}
