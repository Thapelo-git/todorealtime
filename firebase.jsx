import firebase from "firebase"
import "firebase/database"


let Config = {
    apiKey: "AIzaSyDKDBVkBRUxBCxoXjaXf_4s9i6WW1OWpyQ",
    authDomain: "todoreact-aa7f6.firebaseapp.com",
    databaseURL: "https://todoreact-aa7f6-default-rtdb.firebaseio.com",
    projectId: "todoreact-aa7f6",
    storageBucket: "todoreact-aa7f6.appspot.com",
    messagingSenderId: "101348855211",
    appId: "1:101348855211:web:ebd5a14ba09fca0f0b96ee"
  };

  // Initialize Firebase
   firebase.initializeApp(Config);
  export default firebase.database();