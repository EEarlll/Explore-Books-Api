// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "book-catalogue-reader.firebaseapp.com",
  projectId: "book-catalogue-reader",
  storageBucket: "book-catalogue-reader.appspot.com",
  messagingSenderId: "526832605597",
  appId: "1:526832605597:web:fa0f934d050640cbddf774",
  measurementId: "G-WPS9Y26K1Y",
};

initializeApp(firebaseConfig);
const storage = getStorage();

module.exports = { storage };
