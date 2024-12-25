import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA83rKc53IuTAqNgQ83ifN9HtV3RPW1CHc",
  authDomain: "stem-a50f3.firebaseapp.com",
  projectId: "stem-a50f3",
  storageBucket: "stem-a50f3.firebasestorage.app",
  messagingSenderId: "424388424605",
  appId: "1:424388424605:web:e0f03fae77bcfc0d0df574"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
