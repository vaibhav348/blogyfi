// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNWDYva0clizrc2-O0qn137LShNwRmpAM",
  authDomain: "black-blog-63450.firebaseapp.com",
  projectId: "black-blog-63450",
  storageBucket: "black-blog-63450.appspot.com",
  messagingSenderId: "317187559127",
  appId: "1:317187559127:web:0b8c3dab9e7397c8152a92",
  measurementId: "G-GFSCLFHJYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
export{auth}