import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.PRIVATE_KEY,
    authDomain: "sa-project-613df.firebaseapp.com",
    databaseURL: "https://sa-project-613df-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sa-project-613df",
    storageBucket: "sa-project-613df.appspot.com",
    messagingSenderId: "52224290883",
    appId: "1:52224290883:web:01fbfaa2d88e86c453e4f6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);