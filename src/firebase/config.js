// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCCG4gkyhr0crG0738BaICZOeJsgbhBRsg",
  authDomain: "prism-worker-gate.firebaseapp.com",
  databaseURL: "https://prism-worker-gate-default-rtdb.firebaseio.com",
  projectId: "prism-worker-gate",
  storageBucket: "prism-worker-gate.appspot.com",
  messagingSenderId: "704073544811",
  appId: "1:704073544811:web:6d919fe9cc3e62ea3b2d2e",
  measurementId: "G-8Q7RPYQ3GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);