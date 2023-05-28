// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBCxy6RQYvrBy42EbKV0r7tlZMFgzl9lnE",
  authDomain: "cms-ticket-sale-46f2e.firebaseapp.com",
  projectId: "cms-ticket-sale-46f2e",
  storageBucket: "cms-ticket-sale-46f2e.appspot.com",
  messagingSenderId: "409743850028",
  appId: "1:409743850028:web:384440dfc8fa6fc5566f89",
  measurementId: "G-T79VN66LYM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;