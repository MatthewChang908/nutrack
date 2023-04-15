// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQupBx464hciIpJXuZX9gkmck8bmcYyNo",
  authDomain: "nutrack-ff4cd.firebaseapp.com",
  projectId: "nutrack-ff4cd",
  storageBucket: "nutrack-ff4cd.appspot.com",
  messagingSenderId: "635113709433",
  appId: "1:635113709433:web:34efa1f4492de0c9c899a8",
  measurementId: "G-C48RGQH19B"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export {auth, database};