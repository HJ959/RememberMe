const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = JSON.parse(process.env.AUTH_JSON);

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'forgetmenot-album-218fb.appspot.com'
});

const bucket = getStorage().bucket();

exports.handler = async event => {
  console.log(app)
  console.log("====================================")
  console.log(event)
  console.log("====================================")
  let userIdToken = `${event.body.split("SPLITSTRING")[0]}`
  let filename = `${event.body.split("SPLITSTRING")[1].toUpperCase()}.m4a`
  let audioDataURL = event.body.split("SPLITSTRING")[2]

  let uid
  // idToken comes from the client app
  getAuth()
    .verifyIdToken(userIdToken)
    .then((decodedToken) => {
      uid = decodedToken.uid;
    })
    .catch((error) => {
      console.log(error)
    })
  
  filename = filename.replaceAll(":", " ");

  const storageRef = bucket.ref(storage, `${uid}/${filename}`);
  console.log(storageRef)
  console.log("====================================")

  // Data URL string
  await bucket.uploadString(storageRef, audioDataURL, 'data_url')

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTION",
    },
  }
}