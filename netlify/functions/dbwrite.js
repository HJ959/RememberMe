const admin = require('firebase-admin')

// Initialise the admin with the credentials
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.authJson)),
  databaseURL: 'https://rememberme-database.firebaseapp.com'
})

// Set up an instance of the DB
const db = admin.firestore()

// Get the Firestore service for the default app
const defaultFirestore = admin.getFirestore();

// exports.handler is required by netlify to process.
exports.handler = async (event, context, callback) => {
  // wait for the record to be added
  await db.collection('AUDIO').add({
    name: event.body,
  })

  // Return a callback witha 200 response and a message.
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: `Test file added successfully`
    })
  })
}
