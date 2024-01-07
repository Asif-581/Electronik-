// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB8ta2fvbe7G1zZ2LoTSEC9VLYoQIQf_3M",
  authDomain: "sabakart-9830f.firebaseapp.com",
  projectId: "sabakart-9830f",
  storageBucket: "sabakart-9830f.appspot.com",
  messagingSenderId: "331340088465",
  appId: "1:331340088465:web:2775e77287f41f2b3feb30",
  measurementId: "G-HLNW6F419G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);
