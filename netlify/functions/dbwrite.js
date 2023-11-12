import {
  initializeApp
} from "firebase/app";

import * as firebaseStorage from "firebase/storage"

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: "forgetmenot-album-218fb.firebaseapp.com",
  projectId: "forgetmenot-album-218fb",
  storageBucket: "forgetmenot-album-218fb.appspot.com",
  messagingSenderId: "245055722918",
  appId: "1:245055722918:web:de55b620cf16fe4b516b67",
  measurementId: "G-QBM1MXGE28"
};


exports.handler = async event => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Cloud Storage and get a reference to the service
  // const storage = firebase.getStorage(app);
  const storage = firebaseStorage.getStorage(app);
  console.log(app)
  console.log(event)
  let filename = `${event.body.split("SPLITSTRING")[0].toUpperCase()}.m4a`
  let audioDataURL = event.body.split("SPLITSTRING")[1]

  filename = filename.replaceAll(":", " ");
  
  const storageRef = firebaseStorage.ref(storage, `Audio/${filename}`);
  console.log(storageRef)

  let metadata = {
    contentType: 'audio/m4a'
  }

  // Data URL string
  await firebaseStorage.uploadString(storageRef, audioDataURL, 'data_url')

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTION",
    },
  }
}