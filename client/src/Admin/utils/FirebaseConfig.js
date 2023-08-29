/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChnkaUMr_cUdlZbu63IxfvRqz5K5ndYZM",
  authDomain: "makeup-api-86687.firebaseapp.com",
  projectId: "makeup-api-86687",
  storageBucket: "makeup-api-86687.appspot.com",
  messagingSenderId: "644167969234",
  appId: "1:644167969234:web:bf0c95681bf946c744c00b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);*/
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDqHmVkJGCLhRDjn5e18FB7x4OYmEq7_FE",
  authDomain: "final-project-21476.firebaseapp.com",
  projectId: "final-project-21476",
  storageBucket: "final-project-21476.appspot.com",
  messagingSenderId: "143320325500",
  appId: "1:143320325500:web:8b1f70d80e9fe96e79d8f9",
  measurementId: "G-06WYL0RKM6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);