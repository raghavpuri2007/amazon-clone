import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBzIh59AtpR57a2TQxs_hvovloPYPkZhiI",
  authDomain: "clone-cb745.firebaseapp.com",
  projectId: "clone-cb745",
  storageBucket: "clone-cb745.appspot.com",
  messagingSenderId: "1086495119064",
  appId: "1:1086495119064:web:76556b1ea725ffce9de9ad"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
