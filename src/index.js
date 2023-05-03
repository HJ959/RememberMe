// start of index.js
import './index.css'


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
    uploadFile(`${serialNumber}SPLITSTRING${base64Audio}`)
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