import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword
  , signInWithEmailAndPassword,signOut,
  onAuthStateChanged
} 
from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import {
getFirestore, doc,
setDoc, addDoc,
collection, getDocs,getDoc,updateDoc,query, where
}
  from 
"https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDPhci_aWasXI6CIc0Vm7WVJ9Q-htWNPYc",
  authDomain: "practical-9b6e8.firebaseapp.com",
  projectId: "practical-9b6e8",
  storageBucket: "practical-9b6e8.appspot.com",
  messagingSenderId: "895960912717",
  appId: "1:895960912717:web:0a8cdb2683c13c15101d04",
  measurementId: "G-WGRYCWDMD8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth, getFirestore, db, doc, setDoc, addDoc, collection, getDocs,
  signOut,getDoc,updateDoc,onAuthStateChanged,query, where
}