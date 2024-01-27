/* Purpose: Sets up firebase backend to link frontend with databse */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBt-ivMj-yWW4xCU2iOSwEkFCM0FLqQX3Y",
  authDomain: "atlas-news-9ef1a.firebaseapp.com",
  projectId: "atlas-news-9ef1a",
  storageBucket: "atlas-news-9ef1a.appspot.com",
  messagingSenderId: "233475838280",
  appId: "1:233475838280:web:62d8bf30563e040fe2a37d",
  measurementId: "G-PDQERXGCK5"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };