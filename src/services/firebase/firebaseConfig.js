import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAcpbev6zxTLuRf-w05m7cTQzLEa1UYjXc",
  authDomain: "ad-aberturas.firebaseapp.com",
  projectId: "ad-aberturas",
  storageBucket: "ad-aberturas.appspot.com",
  messagingSenderId: "1012748667701",
  appId: "1:1012748667701:web:a91528864b25139668da7c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app) 