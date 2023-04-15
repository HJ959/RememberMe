const admin = require('firebase-admin')

// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(env.process.authJson),
  databaseURL: 'https://rememberme-database.firebaseapp.com'
})

// Set up an instance of the DB
const db = admin.firestore()

// exports.handler is required by netlify to process.
exports.handler = async (event, context, callback) => {
  // wait for the record to be added
  await db.collection('COLLECTION').add({
    name: 'Test'
  })

  // Return a callback witha 200 response and a message.
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: `Test data added successfully`
    })
  })
}

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
