/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("log = ChromeSamples.log;\nif (!(\"NDEFReader\" in window)) ChromeSamples.setStatus(\"Web NFC is not available. Use Chrome on Android.\");\nscanButton.addEventListener(\"click\", async () => {\n  log(\"User clicked scan button\");\n  try {\n    const ndef = new NDEFReader();\n    await ndef.scan();\n    log(\"> Scan started\");\n    ndef.addEventListener(\"readingerror\", () => {\n      log(\"Argh! Cannot read data from the NFC tag. Try another one?\");\n    });\n    ndef.addEventListener(\"reading\", ({\n      message,\n      serialNumber\n    }) => {\n      log(`> Serial Number: ${serialNumber}`);\n      log(`> Records: (${message.records.length})`);\n    });\n  } catch (error) {\n    log(\"Argh! \" + error);\n  }\n});\nwriteButton.addEventListener(\"click\", async () => {\n  log(\"User clicked write button\");\n  try {\n    const ndef = new NDEFReader();\n    await ndef.write(\"Hello world!\");\n    log(\"> Message written\");\n  } catch (error) {\n    log(\"Argh! \" + error);\n  }\n});\nmakeReadOnlyButton.addEventListener(\"click\", async () => {\n  log(\"User clicked make read-only button\");\n  try {\n    const ndef = new NDEFReader();\n    await ndef.makeReadOnly();\n    log(\"> NFC tag has been made permanently read-only\");\n  } catch (error) {\n    log(\"Argh! \" + error);\n  }\n});\n\n//# sourceURL=webpack://Remember_Me/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;