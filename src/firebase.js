import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBg0Jnqulj6kPcV1fHYYvTQSnn9HZ0atQM",
  authDomain: "voxera-819f8.firebaseapp.com",
  projectId: "voxera-819f8",
  storageBucket: "voxera-819f8.firebasestorage.app",
  messagingSenderId: "489753064660",
  appId: "1:489753064660:web:a3c7fbd59066464a56b741"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();