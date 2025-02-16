// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4XCVlk4VBvTJimCv2tP-EhFdy7jZcOo0",
  authDomain: "ciphervault-e93f4.firebaseapp.com",
  projectId: "ciphervault-e93f4",
  storageBucket: "ciphervault-e93f4.firebasestorage.app",
  messagingSenderId: "250157245913",
  appId: "1:250157245913:web:1b98352863b8302fb965c8",
  measurementId: "G-87GDVGJYEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };