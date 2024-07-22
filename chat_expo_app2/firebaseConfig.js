// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, getReactNativePersistence,initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {collection, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKBRGrlYJA8pBGQUHamDn7LjQixfeTiDQ",
  authDomain: "reactnativechatapp-d421f.firebaseapp.com",
  projectId: "reactnativechatapp-d421f",
  storageBucket: "reactnativechatapp-d421f.appspot.com",
  messagingSenderId: "12462375993",
  appId: "1:12462375993:web:c06dec0fc813f8e0a539e8",
  measurementId: "G-J11QN6W8EF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)

export const db = getFirestore(app)

export const usersRef = collection(db,'users')
export const roomRef = collection(db,'rooms')