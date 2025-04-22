
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIP1MuPe4g7pHtKxdzSGoYuJi1mQ11qT0",
    authDomain: "todoapp-f2f9e.firebaseapp.com",
    projectId: "todoapp-f2f9e",
    storageBucket: "todoapp-f2f9e.firebasestorage.app",
    messagingSenderId: "377757169702",
    appId: "1:377757169702:web:2b5647f0619a8731624ee7",
    measurementId: "G-EPMN12HNVP"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
