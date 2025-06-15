import { initializeApp } from '@firebase/app';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth/';
import { getFirestore } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAnZxfRbpjzUFbv9OXRZonNm7mm9_S0Dgg",
  authDomain: "simplesuppers-68904.firebaseapp.com",
  projectId: "simplesuppers-68904",
  storageBucket: "simplesuppers-68904.appspot.com",
  messagingSenderId: "948449411635",
  appId: "1:948449411635:web:d66b69669e4f3602235946",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export default app;