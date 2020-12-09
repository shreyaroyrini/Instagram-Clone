// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseapp = firebase.initializeApp( { 
    apiKey: "AIzaSyB8LXFeeJxKIPUADvW_HyQDt7NjHgKvJbo",
    authDomain: "instagram-clone-13922.firebaseapp.com",
    databaseURL: "https://instagram-clone-13922.firebaseio.com",
    projectId: "instagram-clone-13922",
    storageBucket: "instagram-clone-13922.appspot.com",
    messagingSenderId: "945907755224",
    appId: "1:945907755224:web:a6b6b274536e6d2b8acfad",
    measurementId: "G-5HEG3GFFTY"
})
const db = firebaseapp.firestore();
// console.log(db);
const auth = firebase.auth();
const storage = firebase.storage();
export{db, auth ,storage};
export  default firebase ;