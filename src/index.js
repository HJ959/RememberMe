// start of index.js
import './index.css'


const scanButton = document.getElementById('scanButton')
const output = document.getElementById('output')
let serialNumberForFile

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
  new_file = new File([file], `${serialNumber}.m4a`);
  console.log(new_file)
  const url = URL.createObjectURL(new_file);
  // Do something with the audio file.
  player.src = url;
});

const uploadButton = document.getElementById('uploadButton');

recorder.addEventListener('change', function (e) {
  uploadFile(new_file)
});

async function uploadFile(fileToUpload) {
    await fetch('https://remembermebox.netlify.app/.netlify/functions/dbwrite', {
      method: "POST",
      body: fileToUpload
    });
    return await response.json();
  }