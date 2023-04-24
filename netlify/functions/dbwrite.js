// const admin = require('firebase-admin')
import {
  initializeApp
} from 'firebase/app'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString
} from 'firebase/storage'

// Initialise the admin with the credentials
// admin.initializeApp({
//   credential: admin.credential.cert(JSON.parse(process.env.authJson)),
//   databaseURL: 'https://rememberme-database.firebaseapp.com'
// })

// Set up an instance of the DB
// const db = admin.firestore()
exports.handler = async event => {
  const payload = JSON.parse(event.body)
  return uploadString(ref(getStorage(initializeApp(
    JSON.parse(`{apiKey: ${process.env.DB_API_KEY},authDomain: "rememberme-database.firebaseapp.com",projectId: "rememberme-database",storageBucket: "rememberme-database.appspot.com",messagingSenderId: "773885761161",appId: "1:773885761161:web:592197f93d6b8a9c179858",measurementId: "G-C04M7527LF"}`)
  )), payload.name), payload.file.split(',')[1], 'base64').then(file => {
    return getDownloadURL(file.ref).then(url => {
      return {
        body: JSON.stringify({
          url: url
        }),
        statusCode: 200
      }
    })
  })
}

// // exports.handler is required by netlify to process.
// exports.handler = async (event, context, callback) => {
//   // wait for the record to be added
//   await db.collection('AUDIO').add({
//     name: event.body,
//   })

//   const audio = event.body;
//   console.log(audio)

//   const bucket = admin.storage().bucket('rememberme-database.appspot.com');
//   const file = bucket.file('audio/myFile.jpg');

//   // var audioBuffer = new Buffer.from(file, 'base64')

//   // await file.save(imgBuffer, {
//   //   contentType: 'image/jpeg'
//   // }).catch(err => {
//   //   console.error("Upload bad!", err);
//   //   response.send('0');
//   // });

//   // response.send('1');

//   // Return a callback witha 200 response and a message.
//   return callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: `Test file added successfully`
//     })
//   })
// }

// const firebaseConfig = {
//   apiKey: process.env.DB_API_KEY,
//   authDomain: "rememberme-database.firebaseapp.com",
//   projectId: "rememberme-database",
//   storageBucket: "rememberme-database.appspot.com",
//   messagingSenderId: "773885761161",
//   appId: "1:773885761161:web:592197f93d6b8a9c179858",
//   measurementId: "G-C04M7527LF"
// };

// function uploadAudio() {
//   const ref = firebase.storage().ref()

//   const file = document.querySelector("#photo").files[0]

//   const name = new Date() + '-' + file.name

//   const metadata = {
//     contentType: file.type
//   }

//   const task = ref.child(name).put(file, metadata)

//   task.then(snapshot => snapshot.ref.getDownloadURL())
//     .then(url => {
//       console.log(url)
//       alert("Image Upload Successful")
//       const imageElement = document.createElement('image')
//     })
// }