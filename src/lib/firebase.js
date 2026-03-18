import {initializeApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDiojaiBrj0nRNIGMVHCFr4zMxEMEkv8S0',
  authDomain: 'autonateai-learning-hub.firebaseapp.com',
  projectId: 'autonateai-learning-hub',
  storageBucket: 'autonateai-learning-hub.firebasestorage.app',
  messagingSenderId: '650162209338',
  appId: '1:650162209338:web:cb9626f2e6f9ac3eff6b03',
  measurementId: 'G-D7553DEM0Y',
};

let firebaseServices;

export function initFirebaseClient() {
  if (firebaseServices) {
    return firebaseServices;
  }

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  firebaseServices = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  };

  window.FirebaseApp = firebaseServices;
  return firebaseServices;
}
