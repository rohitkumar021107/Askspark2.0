import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZm8e4YzJnA1zq5v3NkL2pX7dR9wMvQ0c",
  authDomain: "askspark-edtech.firebaseapp.com",
  databaseURL: "https://askspark-edtech-default-rtdb.firebaseio.com",
  projectId: "askspark-edtech",
  storageBucket: "askspark-edtech.appspot.com",
  messagingSenderId: "847392015634",
  appId: "1:847392015634:web:3f8a9b2c1d4e5f6789abcd",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
