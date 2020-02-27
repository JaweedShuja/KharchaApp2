import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDTggIVM3Lc1Z8XwGAwYV0FF6ONgt7dQX4",
    authDomain: "kharchaapp-f3a29.firebaseapp.com",
    databaseURL: "https://kharchaapp-f3a29.firebaseio.com",
    projectId: "kharchaapp-f3a29",
    storageBucket: "",
    messagingSenderId: "398562824124",
    appId: "1:398562824124:web:8aaeabf4d75023f6bea5b9",
    measurementId: "G-6RRWR462T6"
  };

  firebase.initializeApp(config);
  export default firebase;