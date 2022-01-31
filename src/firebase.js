import { initializeApp } from "firebase/app"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getAuth,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc233vvnfMiSWJBCs-oinQ18WQmMT3aEE",
  authDomain: "lets-engage22.firebaseapp.com",
  projectId: "lets-engage22",
  storageBucket: "lets-engage22.appspot.com",
  messagingSenderId: "706260641006",
  appId: "1:706260641006:web:33b49fa052f66ce0747fff"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = firebase.storage();

export {auth, db, provider, storage};
