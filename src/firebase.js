import firebase from "firebase";
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-storage'
import 'firebase/firebase-database'
// import * as admin from 'firebase-admin';
// require('firebase-admin');
/**Main */
// var firebaseConfig = {
//     apiKey: "AIzaSyCOFJJSFJSHMeuDDI04W-jOrvqV3vClmtA",
//     authDomain: "smparking-7cb35.firebaseapp.com",
//     databaseURL: "https://smparking-7cb35.firebaseio.com",
//     projectId: "smparking-7cb35",
//     storageBucket: "smparking-7cb35.appspot.com",
//     messagingSenderId: "113431147806",
//     appId: "1:113431147806:web:a49c8af98926fcdff2c50f",
//     measurementId: "G-3D7SLEFWM0"
// };
/**Backup */
// const firebaseConfig = {
//   apiKey: "AIzaSyCDj--2t3z9i8kTENkr8tszSouzKk6QsX8",
//   authDomain: "smparking2.firebaseapp.com",
//   databaseURL: "https://smparking2.firebaseio.com",
//   projectId: "smparking2",
//   storageBucket: "smparking2.appspot.com",
//   messagingSenderId: "701767063170",
//   appId: "1:701767063170:web:0fc8a4f4cb6ac2f89b069b",
//   measurementId: "G-5250DH1GBS"
// };
/**Backup3 */
const firebaseConfig = {
  apiKey: "AIzaSyBVFycbI9txUsqmDYhY2A0G_JzMFkmQTN4",
  authDomain: "smparking3.firebaseapp.com",
  databaseURL: "https://smparking3.firebaseio.com",
  projectId: "smparking3",
  storageBucket: "smparking3.appspot.com",
  messagingSenderId: "704435366150",
  appId: "1:704435366150:web:81f45933006c25024a1687",
  measurementId: "G-ZVMCWYYQM5"
};


const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rdb = firebase.database();
// const admin = firebase.admin();
firebase.analytics();
export { fb, db, rdb };
