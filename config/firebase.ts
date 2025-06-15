// firebase.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAnZxfRbpjzUFbv9OXRZonNm7mm9_S0Dgg",
  authDomain: "simplesuppers-68904.firebaseapp.com",
  projectId: "simplesuppers-68904",
  storageBucket: "simplesuppers-68904.appspot.com",
  messagingSenderId: "948449411635",
  appId: "1:948449411635:web:d66b69669e4f3602235946",
};

// Initialize app
const app = initializeApp(firebaseConfig);

// Use initializeAuth for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
const db = getFirestore(app);

export { auth, db };
export default app;
