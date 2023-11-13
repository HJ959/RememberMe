import {
  initializeApp
} from "firebase/app";

import * as firebaseStorage from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: "forgetmenot-album-218fb.firebaseapp.com",
  projectId: "forgetmenot-album-218fb",
  storageBucket: "forgetmenot-album-218fb.appspot.com",
  messagingSenderId: "245055722918",
  appId: "1:245055722918:web:de55b620cf16fe4b516b67",
  measurementId: "G-QBM1MXGE28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
// Initialize Cloud Storage and get a reference to the service
const storage = firebaseStorage.getStorage(app);

exports.handler = async event => {
  console.log(app)
  console.log("====================================")
  console.log(event)
  console.log("====================================")
  let uid = `${event.body.split("SPLITSTRING")[0]}`
  let filename = `${event.body.split("SPLITSTRING")[1].toUpperCase()}.m4a`
  let audioDataURL = event.body.split("SPLITSTRING")[2]

  filename = filename.replaceAll(":", " ");
  
  const storageRef = firebaseStorage.ref(storage, `${uid}/${filename}`);
  console.log(storageRef)
  console.log("====================================")
  
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