// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDscB0mbQYUj8xOW2HcwO3rPhKtaldk6tM",
  authDomain: "rapidcode-70592.firebaseapp.com",
  projectId: "rapidcode-70592",
  storageBucket: "rapidcode-70592.firebasestorage.app",
  messagingSenderId: "1075279128014",
  appId: "1:1075279128014:web:7b9f439c5b470d259a779f",
  measurementId: "G-D8ZE3V3M9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { db, auth, googleProvider, addDoc };
