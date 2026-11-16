/**
 * Firebase Modular SDK (npm package: firebase)
 * Project: wedding-d0f83
 * Developed by DexxDigital
 */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  initializeFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
  serverTimestamp
} from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBvOPWO2V4B76WQu7PgUofXl0O3tmNSldU",
  authDomain: "wedding-d0f83.firebaseapp.com",
  projectId: "wedding-d0f83",
  storageBucket: "wedding-d0f83.firebasestorage.app",
  messagingSenderId: "960029494401",
  appId: "1:960029494401:web:0014a52b911ec1c8835180",
  measurementId: "G-C3MENHH1YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
try {
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch (err) {
  console.warn("[DexxDigital] Firebase Analytics notice:", err?.message || err);
}

const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
});

window.DEXX_FIREBASE = {
  projectId: firebaseConfig.projectId,
  app,
  analytics,
  db,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
  serverTimestamp
};

console.log("[DexxDigital] Modular Firebase SDK initialized for project:", firebaseConfig.projectId);
window.dispatchEvent(new CustomEvent("dexx-firebase-ready", { detail: window.DEXX_FIREBASE }));
