

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTk9bTOLmg1TClRx37EjMD3Xma-HgGPcI",
  authDomain: "rematch-f0e2f.firebaseapp.com",
  projectId: "rematch-f0e2f",
  storageBucket: "rematch-f0e2f.appspot.com",
  messagingSenderId: "955522554773",
  appId: "1:955522554773:web:e21d390940882fcf67749c",
  measurementId: "G-0P60WYVS6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)
export { app, db }