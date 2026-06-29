import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyB1HR0-Oqk3OyKzPBmm6h541OrMRG0n1lA",
  authDomain: "a1-mobile-referral-system.firebaseapp.com",
  projectId: "a1-mobile-referral-system",
  storageBucket: "a1-mobile-referral-system.firebasestorage.app",
  messagingSenderId: "855895083807",
  appId: "1:855895083807:web:671d7caa27a126b43d3e2a",
  measurementId: "G-9HTG468C9X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.doc = doc;
window.getDoc = getDoc;
window.getDocs = getDocs;
window.collection = collection;

console.log("collection =", collection);
console.log("typeof collection =", typeof collection);
console.log("window.collection =", window.collection);
window.setDoc = setDoc;
window.updateDoc = updateDoc;
window.addDoc = addDoc;


console.log("Firebase Connected");
