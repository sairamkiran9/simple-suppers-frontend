import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAnZxfRbpjzUFbv9OXRZonNm7mm9_S0Dgg",
  authDomain: "simplesuppers-68904.firebaseapp.com",
  projectId: "simplesuppers-68904",
  storageBucket: "simplesuppers-68904.appspot.com",
  messagingSenderId: "948449411635",
  appId: "1:948449411635:web:d66b69669e4f3602235946",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;