import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9B_Enhb82ZfB1vjJc89ePV1iw80pGjgA",
  authDomain: "test-2-bc84d.firebaseapp.com",
  projectId: "test-2-bc84d",
  storageBucket: "test-2-bc84d.appspot.com",
  messagingSenderId: "711560086345",
  appId: "1:711560086345:web:f67da1a46f7b04767e1098",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
