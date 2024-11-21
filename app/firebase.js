import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCcG9AS4pifqR11wRU_EutJRPyAkVgaOHw",
    authDomain: "expenseguide.firebaseapp.com",
    projectId: "expenseguide",
    storageBucket: "expenseguide.appspot.com",
    messagingSenderId: "645329367325",
    appId: "1:645329367325:web:51eae2886204fc680bf1f4",
    measurementId: "G-2VZJGF2H2W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
