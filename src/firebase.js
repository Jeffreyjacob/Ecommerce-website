import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCeU2XuhIdP7wBSPgAmNdEmWDmzVP6_qB4",
    authDomain: "jetstore-96252.firebaseapp.com",
    projectId: "jetstore-96252",
    storageBucket: "jetstore-96252.appspot.com",
    messagingSenderId: "351485737055",
    appId: "1:351485737055:web:67ed58ffff4129f9fac3ea",
    measurementId: "G-EG6Z3FT8NK"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth}