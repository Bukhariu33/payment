// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUJMb46ANeLMoqaYlVeHD4dJpg8755oV0",
  authDomain: "payment-f1fd5.firebaseapp.com",
  projectId: "payment-f1fd5",
  storageBucket: "payment-f1fd5.appspot.com",
  messagingSenderId: "531234129223",
  appId: "1:531234129223:web:727f27a7ec7dcb55adb862",
  measurementId: "G-24726FS5FJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const db = getFirestore(app);

export {auth, storage, db};
