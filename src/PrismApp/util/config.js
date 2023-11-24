import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseconfig ={
    apiKey: "AIzaSyDngcmSmjVZ0Blv_Mr4Ho2ahE1dYHwLyNM",
    authDomain: "mygate-c06b2.firebaseapp.com",
    projectId: "mygate-c06b2",
    storageBucket: "mygate-c06b2.appspot.com",
    messagingSenderId: "698881030132",
    appId: "1:698881030132:web:b20fe9ad6429e2b0536ba1",
    measurementId: "G-08SQTWK3R0"
}

if (!firebase.apps.length){
     firebase.initializeApp(firebaseconfig);
}