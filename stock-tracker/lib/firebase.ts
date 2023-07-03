// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "jibbsy-stock-tracker.firebaseapp.com",
  projectId: "jibbsy-stock-tracker",
  storageBucket: "jibbsy-stock-tracker.appspot.com",
  messagingSenderId: "156078741816",
  appId: "1:156078741816:web:9d32e91eb42086513309cd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export default firebaseApp;