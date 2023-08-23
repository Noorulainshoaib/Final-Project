// Import the functions you need from the SDKs you need
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
export const storage = getStorage(app);