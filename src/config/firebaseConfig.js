import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyCvwfhYKNPnLW4cqHn7_jmzDinlAV2ZuO8",
  authDomain: "profestem-c650f.firebaseapp.com",
  projectId: "profestem-c650f",
  storageBucket: "profestem-c650f.firebasestorage.app",
  messagingSenderId: "515008015944",
  appId: "1:515008015944:web:e489f1a5aa6c686130b27d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
