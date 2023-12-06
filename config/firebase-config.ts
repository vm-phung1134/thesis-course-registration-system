// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByDLWyqR3QdN_7WkHppnxAObkjpCWA2Mc",
  authDomain: "thesis-course-registration.firebaseapp.com",
  projectId: "thesis-course-registration",
  storageBucket: "thesis-course-registration.appspot.com",
  messagingSenderId: "444158407130",
  appId: "1:444158407130:web:aabdd1d736dbc47c2990e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
