import {
  initializeApp
} from "firebase/app";
import {
  getStorage,
  uploadBytes,
  ref
} from "firebase/storage";

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
const storage = getStorage(app);

const storageRef = ref(storage, 'audio');

exports.handler = async event => {
  console.log(event)
  let audioFile = Buffer.from(event.body, "base64")
  console.log(audioFile)
  
  uploadBytes(storageRef, audioFile).then((snapshot) => {
    console.log('Uploaded audio file!')
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTION",
    },
  }

}
