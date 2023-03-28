import './index.css'

const scanButton = document.getElementById('scanButton')
const writeButton = document.getElementById('writeButton')
const makeReadOnlyButton = document.getElementById('makeReadOnlyButton')
const output = document.getElementById('output')

// if you can use the NDEFReader
if (!("NDEFReader" in window))

  scanButton.addEventListener("click", async () => {
    try {
      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener("readingerror", () => {
        output.innerHTML = "Argh! Cannot read data from the NFC tag. Try another one?"
      });

      ndef.addEventListener("reading", ({
        message,
        serialNumber
      }) => {
        output.innerHTML = `> Serial Number: ${serialNumber}`
        console.log(serialNumber)
        // output.innerHTML = `> Records: (${message.records.length})`
      });
    } catch (error) {
      output.innerHTML = "Argh! " + error
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