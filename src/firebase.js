import firebase from 'firebase';


let firebaseConfig = {
    apiKey: "AIzaSyC-XsQSxDu3ksJljGu1L4tdMAoWxw19BAA",
    authDomain: "apploan-b02b0.firebaseapp.com",
    databaseURL: "https://apploan-b02b0.firebaseio.com",
    projectId: "apploan-b02b0",
    storageBucket: "apploan-b02b0.appspot.com",
    messagingSenderId: "89457067349",
    appId: "1:89457067349:web:4ad8e01e27923828b1dbdc",
    measurementId: "G-HBMD8TZ1WB"
  };

  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

