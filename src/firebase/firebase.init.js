// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFgNa20lGcTZIkHh3buBHHY_25cnAd0ds",
  authDomain: "artify-project-c5361.firebaseapp.com",
  projectId: "artify-project-c5361",
  storageBucket: "artify-project-c5361.firebasestorage.app",
  messagingSenderId: "431478180421",
  appId: "1:431478180421:web:f63ede1721b3e9a76ef12c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);