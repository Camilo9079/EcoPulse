// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // add this 

const firebaseConfig = {
  apiKey: "AIzaSyA8sllV4ytrSr-wzpv02okD6fxjo-YhBpY",
  authDomain: "ecopulse-39ab2.firebaseapp.com",
  databaseURL: "https://ecopulse-39ab2-default-rtdb.firebaseio.com",
  projectId: "ecopulse-39ab2",
  storageBucket: "ecopulse-39ab2.firebasestorage.app",
  messagingSenderId: "238247262427",
  appId: "1:238247262427:web:f007351836b7d4bccdb4fe",
  measurementId: "G-2MFBBXLVLW"
};

let app = initializeApp(firebaseConfig);

export default app;