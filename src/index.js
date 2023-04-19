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
let file, new_file;

recorder.addEventListener('change', function (e) {
  file = e.target.files[0];
  new_file = new File([file], `${serialNumberForFile}.m4a`);
  console.log(new_file)
  const url = URL.createObjectURL(new_file);
  // Do something with the audio file.
  player.src = url;
});

const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener("click", async () => {
  try {
    uploadFile(new_file)
  } catch (error) {
    console.log("Argh! " + error);
  }
})

async function uploadFile(fileToUpload) {
  const response = await fetch('https://remembermebox.netlify.app/.netlify/functions/dbwrite', {
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