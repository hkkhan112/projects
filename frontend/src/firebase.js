// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApam44uG50Pc1S1fZCCPZBW3TBfmBSQDc",
  authDomain: "blogwebsite-ce3c1.firebaseapp.com",
  projectId: "blogwebsite-ce3c1",
  storageBucket: "blogwebsite-ce3c1.appspot.com",
  messagingSenderId: "784098733075",
  appId: "1:784098733075:web:ecb1f7e2f41d7f44bb63e6",
  measurementId: "G-KFNM5V642D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app