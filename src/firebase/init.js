// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAncIcbMIUrL8iFxy6Jz3PoA0NNa2a5mfQ",
  authDomain: "fir-practice-6b146.firebaseapp.com",
  projectId: "fir-practice-6b146",
  storageBucket: "fir-practice-6b146.appspot.com",
  messagingSenderId: "379831087899",
  appId: "1:379831087899:web:ba84cd7f5ce36dafc019be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();