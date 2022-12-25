import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCifL0U3ArHhCKoGxW5AZuAa4ipiGk9cJY",
  authDomain: "project-firebase-pedro-tuto.firebaseapp.com",
  projectId: "project-firebase-pedro-tuto",
  storageBucket: "project-firebase-pedro-tuto.appspot.com",
  messagingSenderId: "950749105325",
  appId: "1:950749105325:web:cd592d5eec984f40c58a24",
  measurementId: "G-9Q3H20NT78"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
