import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAO1x_ORoVkJUx_xHj1g1M-4EE2QCfE308",
  authDomain: "thirteenteams1337.firebaseapp.com",
  projectId: "thirteenteams1337",
  storageBucket: "thirteenteams1337.firebasestorage.app",
  messagingSenderId: "760980076729",
  appId: "1:760980076729:web:a0900307875fa057f2c368",
  measurementId: "G-QW5244TR3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
