import {
  initializeApp
} from "firebase/app";

import * as firebaseStorage from "firebase/storage"

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
  let filename = `${event.body.split("SPLITSTRING")[0].toUpperCase()}.m4a`
  let audioDataURL = event.body.split("SPLITSTRING")[1]

  filename = filename.replaceAll(":", " ");
  
  const storageRef = firebaseStorage.ref(storage, filename);
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