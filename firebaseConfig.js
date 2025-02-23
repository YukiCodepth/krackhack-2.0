import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Paste your Firebase Config here
const firebaseConfig = {
  apiKey: "AIzaSyCPfnBuWF9XWL3wZ8ADHbKG7YJYQTXrcPg",
  authDomain: "campusmarketplace-c541e.firebaseapp.com",
  projectId: "campusmarketplace-c541e",
  storageBucket: "campusmarketplace-c541e.firebasestorage.app",
  messagingSenderId: "508775898875",
  appId: "1:508775898875:web:3f797e4974ad5ad1085a5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
