const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json') // Update this to your file

// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://rememberme-database.firebaseapp.com'
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.DB_API_KEY,
//   authDomain: "rememberme-database.firebaseapp.com",
//   projectId: "rememberme-database",
//   storageBucket: "rememberme-database.appspot.com",
//   messagingSenderId: "773885761161",
//   appId: "1:773885761161:web:592197f93d6b8a9c179858",
//   measurementId: "G-C04M7527LF"
// };



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const storage = getStorage();
// const storageReference = ref(storage);

// const audioReference = ref(storage, 'audio');

// var RememberMeDatabase = firebase.database(RememberMe)
