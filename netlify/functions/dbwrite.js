import {
  initializeApp
} from "firebase/app";
// import {
//   getStorage,
//   uploadBytes,
//   ref
// } from "firebase/storage";

import * as firebaseStorage from "firebase/storage"
import * as firebaseFirestore from 'firebase/firestore'

const Buffer = require('buffer').Buffer

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: "rememberme-database.firebaseapp.com",
  projectId: "rememberme-database",
  storageBucket: "rememberme-database.appspot.com",
  messagingSenderId: "773885761161",
  appId: "1:773885761161:web:592197f93d6b8a9c179858",
  measurementId: "G-C04M7527LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
// const storage = firebase.getStorage(app);
const storage = firebaseStorage.getStorage(app);


exports.handler = async event => {
  console.log(event)
  //let audioFile = Buffer.from(event.body, "base64")
  let audioFile = firebaseFirestore.Blob.fromBase64String(event.body)
  console.log(audioFile)
  console.log(event.body)

  const storageRef = firebaseStorage.ref(storage, "audio");
  
  let metadata = {
    contentType: 'audio/m4a'
  }

  // var blob = new Blob([audioFile], {type: 'audio/mp3'});
  // storageRef.put(blob);
  firebaseStorage.uploadBytes(storageRef, audioFile, metadata).then((snapshot) => {
    console.log('Uploaded audio file!')
  });

  // Base64 formatted string
  // firebase.uploadString(storageRef, audioFile, 'base64').then((snapshot) => {
  //   console.log('Uploaded a base64 string!');
  // });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTION",
    },
  }

}