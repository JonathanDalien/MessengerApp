// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAaHqV4VKA8sB0brHOXkbp7i7PoafB-2A",
    authDomain: "react-chat-app-c13cd.firebaseapp.com",
    projectId: "react-chat-app-c13cd",
    storageBucket: "react-chat-app-c13cd.appspot.com",
    messagingSenderId: "839230976842",
    appId: "1:839230976842:web:338cb9bbfc5bf9462cc7b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)