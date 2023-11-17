// start of index.js
import './index.css'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB0HHbyIG6lG_JkN-nzFXRoiHc0-ZtKnSo",
  authDomain: "forgetmenot-album-218fb.firebaseapp.com",
  projectId: "forgetmenot-album-218fb",
  storageBucket: "forgetmenot-album-218fb.appspot.com",
  messagingSenderId: "245055722918",
  appId: "1:245055722918:web:de55b620cf16fe4b516b67",
  measurementId: "G-QBM1MXGE28"
})

const auth = getAuth(firebaseApp)

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
let user

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Lch2Q0pAAAAAC0OI5eZW8wlZg7JNJZgYSuht27Z', {action: 'LOGIN'});
      console.log(token)
    })

    const email = loginForm.username.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
})

const logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
})

const appScreen = document.getElementById('webApp')
const loginScreen = document.getElementById('loginScreen')
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    loginScreen.style.display = "none"
    appScreen.style.display = "block"
    console.log("Logged in")
  } else {
    console.log("No user")
    loginScreen.style.display = "block"
    appScreen.style.display = "none"
  }
})

const scanButton = document.getElementById('scanButton')
const output = document.getElementById('output')
const outputUpload = document.getElementById('outputUpload')
let serialNumberForFile, serialNumber

scanButton.addEventListener("click", async () => {
  console.log("User clicked scan button")

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    console.log("> Scan started");

    ndef.addEventListener("readingerror", () => {
      console.log("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({
      message,
      serialNumber
    }) => {
      serialNumberForFile = serialNumber
      console.log(`> Serial Number: ${serialNumber}`);
      output.innerHTML = `${serialNumber}`
      console.log(`> Records: (${message.records.length})`);
    });
  } catch (error) {
    console.log("Argh! " + error);
  }
});

const recorder = document.getElementById('recorder');
const player = document.getElementById('player');
let file, new_file, url;

recorder.addEventListener('change', function (e) {
  file = e.target.files[0];
  url = URL.createObjectURL(file);
  console.log(url)
  // Do something with the audio file.
  player.src = url;
});

const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener("click", async () => {
  try {
    new_file = new File([file], `${serialNumberForFile}.m4a`);
    console.log(new_file)
    var base64Audio = await audioToBase64(new_file)
    console.log(base64Audio)
    var userIdToken
    auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      userIdToken = idToken
    }).catch(function(error) {
      console.log(`ID token error ${error}`)
    });    
    uploadFile(`${userIdToken}SPLITSTRING${serialNumberForFile}SPLITSTRING${base64Audio}`)
  } catch (error) {
    console.log("Argh! " + error);
  }
})

async function uploadFile(fileToUpload) {
  const response = await fetch('https://forgetmenotbox.netlify.app/.netlify/functions/dbwrite', {
    method: "POST",
    body: fileToUpload
  })
  return await handleResponseUpload(response)
}

function handleResponseUpload(response) {
  if (response.status === 200) {
    outputUpload.innerHTML = 'Success! File upload!'
  } else {
    outputUpload.innerHTML = `Failed with code: ${response.status}`
  }
}

async function audioToBase64(audioFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(audioFile);
  });
}