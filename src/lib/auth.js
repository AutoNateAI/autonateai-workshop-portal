import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
} from 'firebase/auth';
import {doc, getDoc, getDocs, collection} from 'firebase/firestore';
import {getFirebaseServices} from './firebase.js';

const provider = new GoogleAuthProvider();
const claimAccessUrl =
  'https://claimportalaccessbyemail-4qinfaeidq-uc.a.run.app';
const completePasswordSetupUrl =
  'https://completeportalpasswordsetup-4qinfaeidq-uc.a.run.app';
const allowedCourseProductIds = new Set([
  'ai-first-student',
  'agentic-ai-workshop-apr-11-2026',
  'ai-first-researcher',
]);

export function observeAuthState(callback) {
  const {auth} = getFirebaseServices();
  return onAuthStateChanged(auth, callback);
}

export async function signInEmail(email, password) {
  const {auth} = getFirebaseServices();
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInGoogle() {
  const {auth} = getFirebaseServices();
  return signInWithPopup(auth, provider);
}

export async function signOutCurrentUser() {
  const {auth} = getFirebaseServices();
  return signOut(auth);
}

export async function sendPortalPasswordReset(email) {
  const {auth} = getFirebaseServices();
  return sendPasswordResetEmail(auth, email);
}

export async function updatePortalPassword(nextPassword) {
  const {auth} = getFirebaseServices();
  if (!auth.currentUser) {
    throw new Error('No signed-in user.');
  }
  await updatePassword(auth.currentUser, nextPassword);
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(completePasswordSetupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? 'Password updated, but portal setup could not finish.');
  }
}

async function readUserState(uid) {
  const {db} = getFirebaseServices();
  const userSnap = await getDoc(doc(db, 'users', uid));
  const librarySnap = await getDocs(collection(db, 'users', uid, 'library'));
  const library = librarySnap.docs
    .map((docSnap) => ({id: docSnap.id, ...docSnap.data()}))
    .filter((entry) => entry.accessGranted && allowedCourseProductIds.has(entry.productId));

  return {
    profile: userSnap.exists() ? userSnap.data() : {},
    library,
  };
}

export async function claimPortalAccess(user) {
  const token = await user.getIdToken();
  const response = await fetch(claimAccessUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? 'Unable to verify paid access.');
  }

  return payload;
}

export async function resolvePortalSession(user) {
  if (!user) {
    return {
      hasAccess: false,
      mustChangePassword: false,
      library: [],
      message: '',
    };
  }

  try {
    await claimPortalAccess(user);
  } catch (error) {
    const {profile, library} = await readUserState(user.uid);
    if (library.length > 0) {
      return {
        hasAccess: true,
        mustChangePassword: Boolean(profile?.mustChangePassword),
        library,
        message: '',
      };
    }
    const message = error instanceof Error ? error.message : 'Unable to verify paid access.';
    return {
      hasAccess: false,
      mustChangePassword: false,
      library: [],
      message,
    };
  }

  const {profile, library} = await readUserState(user.uid);
  return {
    hasAccess: library.length > 0,
    mustChangePassword: Boolean(profile?.mustChangePassword),
    library,
    message: library.length > 0 ? '' : 'No paid portal access found for this email.',
  };
}
