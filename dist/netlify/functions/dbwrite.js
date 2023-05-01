import {
  initializeApp
} from "firebase/app";
import {
  getStorage,
  uploadBytes,
  ref
} from "firebase/storage";

import * as Busboy from "busboy"

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
  console.log(event.body)

  const fields = await parseMultipartForm(event)

  console.log(fields)

  uploadBytes(storageRef, fields).then((snapshot) => {
    console.log('Uploaded audio file!')
  });

  return 200;
}

function parseMultipartForm(event) {
  return new Promise((resolve) => {
    // we'll store all form fields inside of this
    const fields = {};

    // let's instantiate our busboy instance!
    const busboy = new Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        filestream.on("data", (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          };
        });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on("field", (fieldName, value) => {
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    busboy.on("finish", () => {
      resolve(fields)
    });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(event.body);
  });
}