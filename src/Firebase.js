// Import the functions you need from the SDKs you need
import  { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import { useEffect } from "react";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0h9JzfvhPdfWa56pljby0W1Aqu4Taxdc",
  authDomain: "betim-f3345.firebaseapp.com",
  projectId: "betim-f3345",
  storageBucket: "betim-f3345.appspot.com",
  messagingSenderId: "771791691048",
  appId: "1:771791691048:web:2b953a6b49db7fb983041d",
  measurementId: "G-2FF3GGRG1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };