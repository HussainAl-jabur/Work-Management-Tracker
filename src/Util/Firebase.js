import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk75eASq_UqTIilJBNLu4Y23J2VmAZSR0",
  authDomain: "conflux-10bba.firebaseapp.com",
  projectId: "conflux-10bba",
  storageBucket: "conflux-10bba.appspot.com",
  messagingSenderId: "1070909104396",
  appId: "1:1070909104396:web:80d68082ef30a937bda929",
  measurementId: "G-TR35Y1T1YR"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);