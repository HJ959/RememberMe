// start of index.js
import './index.css'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getStorage, ref, uploadString } from 'firebase/storage'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check"

function createRandom8BitNumber(length) {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


const firebaseApp = initializeApp({
  apiKey: "AIzaSyB0HHbyIG6lG_JkN-nzFXRoiHc0-ZtKnSo",
  authDomain: "forgetmenot-album-218fb.firebaseapp.com",
  projectId: "forgetmenot-album-218fb",
  storageBucket: "forgetmenot-album-218fb.appspot.com",
  messagingSenderId: "245055722918",
  appId: "1:245055722918:web:de55b620cf16fe4b516b67",
  measurementId: "G-QBM1MXGE28"
})

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaEnterpriseProvider('6Lch2Q0pAAAAAC0OI5eZW8wlZg7JNJZgYSuht27Z'),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
})

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp)

const loginForm = document.getElementById("username-field")
const passwordForm = document.getElementById("password-field")
const loginButton = document.getElementById("login-form-submit")
let user

loginButton.addEventListener("click", (e) => {
  const email = loginForm.value
  const password = passwordForm.value
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      user = userCredential.user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    })
})

const logoutButton = document.getElementById('logoutButton')
logoutButton.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    console.log(`Sign out error: ${error}`)
  });
})

const appScreen = document.getElementById('webApp')
const loginScreen = document.getElementById('loginScreen')
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    loginScreen.style.display = "none"
    appScreen.style.display = "block"
    console.log("Logged in")
    console.log(user)
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
      serialNumberForFile = serialNumber.replaceAll(":", "")
      console.log(serialNumberForFile)
      console.log(`> Serial Number: ${serialNumber}`)
      output.innerHTML = `${serialNumber}`
      console.log(`> Records: (${message.records.length})`)

      ndef
        .write(`${createRandom8BitNumber(8)}`)
        .then(() => {
          console.log("Message written.");
        })
        .catch((error) => {
          console.log(`Write failed :-( try again: ${error}.`);
        });
    });
  } catch (error) {
    console.log("Argh! " + error);
  }
})

const recorder = document.getElementById('recorder');
const player = document.getElementById('player');
let file, new_file, url;

recorder.addEventListener('change', function (e) {
  file = e.target.files[0]
  url = URL.createObjectURL(file)
  // Do something with the audio file.
  player.src = url
});

const uploadButton = document.getElementById('uploadButton');
const uploadOutput = document.getElementById('outputUpload');
uploadButton.addEventListener("click", async () => {
  try {
    new_file = new File([file], `${serialNumberForFile}.m4a`);
    var base64Audio = await audioToBase64(new_file)
    const storageRef = ref(storage, `${serialNumberForFile}.m4a`)
    // await uploadString(storageRef, base64Audio, 'data_url')
    uploadString(storageRef, base64Audio, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!')
      uploadOutput.innerHTML = 'Uploaded your recording! Please scan on Forget Me Not Box'
    })
    URL.revokeObjectURL(url)
  } catch (error) {
    console.log("Argh! " + error);
    uploadOutput.innerHTML = "I'm sorry, something went wrong there. Please try again."
  }
})

async function audioToBase64(audioFile) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(audioFile);
  });
}