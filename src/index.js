// start of index.js
import './index.css'


const scanButton = document.getElementById('scanButton')
const output = document.getElementById('output')

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
let file;

recorder.addEventListener('change', function (e) {
  file = e.target.files[0];
  console.log(file)
  const url = URL.createObjectURL(file);
  // Do something with the audio file.
  player.src = url;
});

const uploadButton = document.getElementById('uploadButton');

recorder.addEventListener('change', function (e) {
  uploadFile(file)
});

async function uploadFile() {
    let formData = new FormData();
    formData.append("fileupload", fileupload.files[0]);
    await fetch('https://remembermebox.netlify.app/.netlify/functions/dbwrite', {
      method: "POST",
      body: formData
    });
    return await response.json();
  }