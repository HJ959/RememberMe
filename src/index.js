import './index.css'

const scanButton = document.getElementById('scanButton')
const writeButton = document.getElementById('writeButton')
const makeReadOnlyButton = document.getElementById('makeReadOnlyButton')
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


writeButton.addEventListener("click", async () => {
  output.innerHTML = "User clicked write button"

  try {
    const ndef = new NDEFReader();
    await ndef.write("SOME STRINGGGGGG");
    output.innerHTML = "> Message written"
  } catch (error) {
    output.innerHTML = "Argh! " + error
  }
});

// makeReadOnlyButton.addEventListener("click", async () => {
//   output.innerHTML = "User clicked make read-only button"

//   try {
//     const ndef = new NDEFReader();
//     await ndef.makeReadOnly();
//     output.innerHTML = "> NFC tag has been made permanently read-only"
//   } catch (error) {
//     output.innerHTML = "Argh! " + error
//   }
// });