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

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: "rememberme-database.firebaseapp.com",
  projectId: "rememberme-database",
  storageBucket: "rememberme-database.appspot.com",
  messagingSenderId: "773885761161",
  appId: "1:773885761161:web:592197f93d6b8a9c179858",
  measurementId: "G-C04M7527LF"
};

exports.handler = async event => {
  const payload = JSON.parse(event.body)
  return uploadString(ref(getStorage(initializeApp(firebaseConfig)), payload.name), payload.file.split(',')[1], 'base64').then(file => {
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
