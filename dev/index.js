/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function (f) {\n  if (typeof exports === \"object\" && \"object\" !== \"undefined\") {\n    module.exports = f();\n  } else if (typeof define === \"function\" && __webpack_require__.amdO) {\n    define([], f);\n  } else {\n    var g;\n    if (typeof window !== \"undefined\") {\n      g = window;\n    } else if (typeof __webpack_require__.g !== \"undefined\") {\n      g = __webpack_require__.g;\n    } else if (typeof self !== \"undefined\") {\n      g = self;\n    } else {\n      g = this;\n    }\n    g.Recorder = f();\n  }\n})(function () {\n  var define, module, exports;\n  return function e(t, n, r) {\n    function s(o, u) {\n      if (!n[o]) {\n        if (!t[o]) {\n          var a = undefined;\n          if (!u && a) return require(o, !0);\n          if (i) return i(o, !0);\n          var f = new Error(\"Cannot find module '\" + o + \"'\");\n          throw f.code = \"MODULE_NOT_FOUND\", f;\n        }\n        var l = n[o] = {\n          exports: {}\n        };\n        t[o][0].call(l.exports, function (e) {\n          var n = t[o][1][e];\n          return s(n ? n : e);\n        }, l, l.exports, e, t, n, r);\n      }\n      return n[o].exports;\n    }\n    var i = undefined;\n    for (var o = 0; o < r.length; o++) s(r[o]);\n    return s;\n  }({\n    1: [function (require, module, exports) {\n      \"use strict\";\n\n      module.exports = require(\"./recorder\").Recorder;\n    }, {\n      \"./recorder\": 2\n    }],\n    2: [function (require, module, exports) {\n      'use strict';\n\n      var _createClass = function () {\n        function defineProperties(target, props) {\n          for (var i = 0; i < props.length; i++) {\n            var descriptor = props[i];\n            descriptor.enumerable = descriptor.enumerable || false;\n            descriptor.configurable = true;\n            if (\"value\" in descriptor) descriptor.writable = true;\n            Object.defineProperty(target, descriptor.key, descriptor);\n          }\n        }\n        return function (Constructor, protoProps, staticProps) {\n          if (protoProps) defineProperties(Constructor.prototype, protoProps);\n          if (staticProps) defineProperties(Constructor, staticProps);\n          return Constructor;\n        };\n      }();\n      Object.defineProperty(exports, \"__esModule\", {\n        value: true\n      });\n      exports.Recorder = undefined;\n      var _inlineWorker = require('inline-worker');\n      var _inlineWorker2 = _interopRequireDefault(_inlineWorker);\n      function _interopRequireDefault(obj) {\n        return obj && obj.__esModule ? obj : {\n          default: obj\n        };\n      }\n      function _classCallCheck(instance, Constructor) {\n        if (!(instance instanceof Constructor)) {\n          throw new TypeError(\"Cannot call a class as a function\");\n        }\n      }\n      var Recorder = exports.Recorder = function () {\n        function Recorder(source, cfg) {\n          var _this = this;\n          _classCallCheck(this, Recorder);\n          this.config = {\n            bufferLen: 4096,\n            numChannels: 2,\n            mimeType: 'audio/wav'\n          };\n          this.recording = false;\n          this.callbacks = {\n            getBuffer: [],\n            exportWAV: []\n          };\n          Object.assign(this.config, cfg);\n          this.context = source.context;\n          this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels);\n          this.node.onaudioprocess = function (e) {\n            if (!_this.recording) return;\n            var buffer = [];\n            for (var channel = 0; channel < _this.config.numChannels; channel++) {\n              buffer.push(e.inputBuffer.getChannelData(channel));\n            }\n            _this.worker.postMessage({\n              command: 'record',\n              buffer: buffer\n            });\n          };\n          source.connect(this.node);\n          this.node.connect(this.context.destination); //this should not be necessary\n\n          var self = {};\n          this.worker = new _inlineWorker2.default(function () {\n            var recLength = 0,\n              recBuffers = [],\n              sampleRate = undefined,\n              numChannels = undefined;\n            self.onmessage = function (e) {\n              switch (e.data.command) {\n                case 'init':\n                  init(e.data.config);\n                  break;\n                case 'record':\n                  record(e.data.buffer);\n                  break;\n                case 'exportWAV':\n                  exportWAV(e.data.type);\n                  break;\n                case 'getBuffer':\n                  getBuffer();\n                  break;\n                case 'clear':\n                  clear();\n                  break;\n              }\n            };\n            function init(config) {\n              sampleRate = config.sampleRate;\n              numChannels = config.numChannels;\n              initBuffers();\n            }\n            function record(inputBuffer) {\n              for (var channel = 0; channel < numChannels; channel++) {\n                recBuffers[channel].push(inputBuffer[channel]);\n              }\n              recLength += inputBuffer[0].length;\n            }\n            function exportWAV(type) {\n              var buffers = [];\n              for (var channel = 0; channel < numChannels; channel++) {\n                buffers.push(mergeBuffers(recBuffers[channel], recLength));\n              }\n              var interleaved = undefined;\n              if (numChannels === 2) {\n                interleaved = interleave(buffers[0], buffers[1]);\n              } else {\n                interleaved = buffers[0];\n              }\n              var dataview = encodeWAV(interleaved);\n              var audioBlob = new Blob([dataview], {\n                type: type\n              });\n              self.postMessage({\n                command: 'exportWAV',\n                data: audioBlob\n              });\n            }\n            function getBuffer() {\n              var buffers = [];\n              for (var channel = 0; channel < numChannels; channel++) {\n                buffers.push(mergeBuffers(recBuffers[channel], recLength));\n              }\n              self.postMessage({\n                command: 'getBuffer',\n                data: buffers\n              });\n            }\n            function clear() {\n              recLength = 0;\n              recBuffers = [];\n              initBuffers();\n            }\n            function initBuffers() {\n              for (var channel = 0; channel < numChannels; channel++) {\n                recBuffers[channel] = [];\n              }\n            }\n            function mergeBuffers(recBuffers, recLength) {\n              var result = new Float32Array(recLength);\n              var offset = 0;\n              for (var i = 0; i < recBuffers.length; i++) {\n                result.set(recBuffers[i], offset);\n                offset += recBuffers[i].length;\n              }\n              return result;\n            }\n            function interleave(inputL, inputR) {\n              var length = inputL.length + inputR.length;\n              var result = new Float32Array(length);\n              var index = 0,\n                inputIndex = 0;\n              while (index < length) {\n                result[index++] = inputL[inputIndex];\n                result[index++] = inputR[inputIndex];\n                inputIndex++;\n              }\n              return result;\n            }\n            function floatTo16BitPCM(output, offset, input) {\n              for (var i = 0; i < input.length; i++, offset += 2) {\n                var s = Math.max(-1, Math.min(1, input[i]));\n                output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\n              }\n            }\n            function writeString(view, offset, string) {\n              for (var i = 0; i < string.length; i++) {\n                view.setUint8(offset + i, string.charCodeAt(i));\n              }\n            }\n            function encodeWAV(samples) {\n              var buffer = new ArrayBuffer(44 + samples.length * 2);\n              var view = new DataView(buffer);\n\n              /* RIFF identifier */\n              writeString(view, 0, 'RIFF');\n              /* RIFF chunk length */\n              view.setUint32(4, 36 + samples.length * 2, true);\n              /* RIFF type */\n              writeString(view, 8, 'WAVE');\n              /* format chunk identifier */\n              writeString(view, 12, 'fmt ');\n              /* format chunk length */\n              view.setUint32(16, 16, true);\n              /* sample format (raw) */\n              view.setUint16(20, 1, true);\n              /* channel count */\n              view.setUint16(22, numChannels, true);\n              /* sample rate */\n              view.setUint32(24, sampleRate, true);\n              /* byte rate (sample rate * block align) */\n              view.setUint32(28, sampleRate * 4, true);\n              /* block align (channel count * bytes per sample) */\n              view.setUint16(32, numChannels * 2, true);\n              /* bits per sample */\n              view.setUint16(34, 16, true);\n              /* data chunk identifier */\n              writeString(view, 36, 'data');\n              /* data chunk length */\n              view.setUint32(40, samples.length * 2, true);\n              floatTo16BitPCM(view, 44, samples);\n              return view;\n            }\n          }, self);\n          this.worker.postMessage({\n            command: 'init',\n            config: {\n              sampleRate: this.context.sampleRate,\n              numChannels: this.config.numChannels\n            }\n          });\n          this.worker.onmessage = function (e) {\n            var cb = _this.callbacks[e.data.command].pop();\n            if (typeof cb == 'function') {\n              cb(e.data.data);\n            }\n          };\n        }\n        _createClass(Recorder, [{\n          key: 'record',\n          value: function record() {\n            this.recording = true;\n          }\n        }, {\n          key: 'stop',\n          value: function stop() {\n            this.recording = false;\n          }\n        }, {\n          key: 'clear',\n          value: function clear() {\n            this.worker.postMessage({\n              command: 'clear'\n            });\n          }\n        }, {\n          key: 'getBuffer',\n          value: function getBuffer(cb) {\n            cb = cb || this.config.callback;\n            if (!cb) throw new Error('Callback not set');\n            this.callbacks.getBuffer.push(cb);\n            this.worker.postMessage({\n              command: 'getBuffer'\n            });\n          }\n        }, {\n          key: 'exportWAV',\n          value: function exportWAV(cb, mimeType) {\n            mimeType = mimeType || this.config.mimeType;\n            cb = cb || this.config.callback;\n            if (!cb) throw new Error('Callback not set');\n            this.callbacks.exportWAV.push(cb);\n            this.worker.postMessage({\n              command: 'exportWAV',\n              type: mimeType\n            });\n          }\n        }], [{\n          key: 'forceDownload',\n          value: function forceDownload(blob, filename) {\n            var url = (window.URL || window.webkitURL).createObjectURL(blob);\n            var link = window.document.createElement('a');\n            link.href = url;\n            link.download = filename || 'output.wav';\n            var click = document.createEvent(\"Event\");\n            click.initEvent(\"click\", true, true);\n            link.dispatchEvent(click);\n          }\n        }]);\n        return Recorder;\n      }();\n      exports.default = Recorder;\n    }, {\n      \"inline-worker\": 3\n    }],\n    3: [function (require, module, exports) {\n      \"use strict\";\n\n      module.exports = require(\"./inline-worker\");\n    }, {\n      \"./inline-worker\": 4\n    }],\n    4: [function (require, module, exports) {\n      (function (global) {\n        \"use strict\";\n\n        var _createClass = function () {\n          function defineProperties(target, props) {\n            for (var key in props) {\n              var prop = props[key];\n              prop.configurable = true;\n              if (prop.value) prop.writable = true;\n            }\n            Object.defineProperties(target, props);\n          }\n          return function (Constructor, protoProps, staticProps) {\n            if (protoProps) defineProperties(Constructor.prototype, protoProps);\n            if (staticProps) defineProperties(Constructor, staticProps);\n            return Constructor;\n          };\n        }();\n        var _classCallCheck = function (instance, Constructor) {\n          if (!(instance instanceof Constructor)) {\n            throw new TypeError(\"Cannot call a class as a function\");\n          }\n        };\n        var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);\n        var InlineWorker = function () {\n          function InlineWorker(func, self) {\n            var _this = this;\n            _classCallCheck(this, InlineWorker);\n            if (WORKER_ENABLED) {\n              var functionBody = func.toString().trim().match(/^function\\s*\\w*\\s*\\([\\w\\s,]*\\)\\s*{([\\w\\W]*?)}$/)[1];\n              var url = global.URL.createObjectURL(new global.Blob([functionBody], {\n                type: \"text/javascript\"\n              }));\n              return new global.Worker(url);\n            }\n            this.self = self;\n            this.self.postMessage = function (data) {\n              setTimeout(function () {\n                _this.onmessage({\n                  data: data\n                });\n              }, 0);\n            };\n            setTimeout(function () {\n              func.call(self);\n            }, 0);\n          }\n          _createClass(InlineWorker, {\n            postMessage: {\n              value: function postMessage(data) {\n                var _this = this;\n                setTimeout(function () {\n                  _this.self.onmessage({\n                    data: data\n                  });\n                }, 0);\n              }\n            }\n          });\n          return InlineWorker;\n        }();\n        module.exports = InlineWorker;\n      }).call(this, typeof __webpack_require__.g !== \"undefined\" ? __webpack_require__.g : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {});\n    }, {}]\n  }, {}, [1])(1);\n});\n///////////////////////////////////////////////////////////////////////////////////////////////////////////\n///////////////////////////////////////////////////////////////////////////////////////////////////////////\n///////////////////////////////////////////////////////////////////////////////////////////////////////////\n///////////////////////////////////////////////////////////////////////////////////////////////////////////\n///////////////////////////////////////////////////////////////////////////////////////////////////////////\n///////////////////////////////////////////////////////////////////////////////////////////////////////////\n// start of index.js\n\nconst scanButton = document.getElementById('scanButton');\nconst writeButton = document.getElementById('writeButton');\nconst makeReadOnlyButton = document.getElementById('makeReadOnlyButton');\nconst output = document.getElementById('output');\nscanButton.addEventListener(\"click\", async () => {\n  console.log(\"User clicked scan button\");\n  try {\n    const ndef = new NDEFReader();\n    await ndef.scan();\n    console.log(\"> Scan started\");\n    ndef.addEventListener(\"readingerror\", () => {\n      console.log(\"Argh! Cannot read data from the NFC tag. Try another one?\");\n    });\n    ndef.addEventListener(\"reading\", ({\n      message,\n      serialNumber\n    }) => {\n      console.log(`> Serial Number: ${serialNumber}`);\n      output.innerHTML = `${serialNumber}`;\n      console.log(`> Records: (${message.records.length})`);\n    });\n  } catch (error) {\n    console.log(\"Argh! \" + error);\n  }\n});\nwriteButton.addEventListener(\"click\", async () => {\n  output.innerHTML = \"User clicked write button\";\n  try {\n    const ndef = new NDEFReader();\n    await ndef.write(\"SOME STRINGGGGGG\");\n    output.innerHTML = \"> Message written\";\n  } catch (error) {\n    output.innerHTML = \"Argh! \" + error;\n  }\n});\n\n// Expose globally your audio_context, the recorder instance and audio_stream\nlet audio_context;\nlet recorder;\nlet audio_stream;\n\n/**\n * Patch the APIs for every browser that supports them and check\n * if getUserMedia is supported on the browser. \n * \n */\nfunction Initialize() {\n  try {\n    // Monkeypatch for AudioContext, getUserMedia and URL\n    window.AudioContext = window.AudioContext || window.webkitAudioContext;\n    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;\n    window.URL = window.URL || window.webkitURL;\n\n    // Store the instance of AudioContext globally\n    audio_context = new AudioContext();\n    console.log('Audio context is ready !');\n    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));\n  } catch (e) {\n    alert('No web audio support in this browser!');\n  }\n}\n\n/**\n * Starts the recording process by requesting the access to the microphone.\n * Then, if granted proceed to initialize the library and store the stream.\n *\n * It only stops when the method stopRecording is triggered.\n */\nfunction startRecording() {\n  // Access the Microphone using the navigator.getUserMedia method to obtain a stream\n  navigator.getUserMedia({\n    audio: true\n  }, function (stream) {\n    // Expose the stream to be accessible globally\n    audio_stream = stream;\n    // Create the MediaStreamSource for the Recorder library\n    var input = audio_context.createMediaStreamSource(stream);\n    console.log('Media stream succesfully created');\n\n    // Initialize the Recorder Library\n    recorder = new Recorder(input);\n    console.log('Recorder initialised');\n\n    // Start recording !\n    recorder && recorder.record();\n    console.log('Recording...');\n\n    // Disable Record button and enable stop button !\n    document.getElementById(\"start-btn\").disabled = true;\n    document.getElementById(\"stop-btn\").disabled = false;\n  }, function (e) {\n    console.error('No live audio input: ' + e);\n  });\n}\n\n/**\n * Stops the recording process. The method expects a callback as first\n * argument (function) executed once the AudioBlob is generated and it\n * receives the same Blob as first argument. The second argument is\n * optional and specifies the format to export the blob either wav or mp3\n */\nfunction stopRecording(callback, AudioFormat) {\n  // Stop the recorder instance\n  recorder && recorder.stop();\n  console.log('Stopped recording.');\n\n  // Stop the getUserMedia Audio Stream !\n  audio_stream.getAudioTracks()[0].stop();\n\n  // Disable Stop button and enable Record button !\n  document.getElementById(\"start-btn\").disabled = false;\n  document.getElementById(\"stop-btn\").disabled = true;\n\n  // Use the Recorder Library to export the recorder Audio as a .wav file\n  // The callback providen in the stop recording method receives the blob\n  if (typeof callback == \"function\") {\n    /**\n     * Export the AudioBLOB using the exportWAV method.\n     * Note that this method exports too with mp3 if\n     * you provide the second argument of the function\n     */\n    recorder && recorder.exportWAV(function (blob) {\n      callback(blob);\n\n      // create WAV download link using audio data blob\n      // createDownloadLink();\n\n      // Clear the Recorder to start again !\n      recorder.clear();\n    }, AudioFormat || \"audio/wav\");\n  }\n}\n\n// Initialize everything once the window loads\nwindow.onload = function () {\n  // Prepare and check if requirements are filled\n  Initialize();\n\n  // Handle on start recording button\n  document.getElementById(\"start-btn\").addEventListener(\"click\", function () {\n    startRecording();\n  }, false);\n\n  // Handle on stop recording button\n  document.getElementById(\"stop-btn\").addEventListener(\"click\", function () {\n    // Use wav format\n    var _AudioFormat = \"audio/wav\";\n    // You can use mp3 to using the correct mimetype\n    //var AudioFormat = \"audio/mpeg\";\n\n    stopRecording(function (AudioBLOB) {\n      // Note:\n      // Use the AudioBLOB for whatever you need, to download\n      // directly in the browser, to upload to the server, you name it !\n\n      // In this case we are going to add an Audio item to the list so you\n      // can play every stored Audio\n      var url = URL.createObjectURL(AudioBLOB);\n      var li = document.createElement('li');\n      var au = document.createElement('audio');\n      var hf = document.createElement('a');\n      au.controls = true;\n      au.src = url;\n      hf.href = url;\n      // Important:\n      // Change the format of the file according to the mimetype\n      // e.g for audio/wav the extension is .wav \n      //     for audio/mpeg (mp3) the extension is .mp3\n      hf.download = new Date().toISOString() + '.wav';\n      hf.innerHTML = hf.download;\n      li.appendChild(au);\n      li.appendChild(hf);\n      recordingslist.appendChild(li);\n    }, _AudioFormat);\n  }, false);\n};\n\n//# sourceURL=webpack://Remember_Me/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"html, body {\\n    width: 100%;\\n    height: 100%;\\n    background: black;\\n    color: greenyellow;\\n}\\n\\n\\n.container {\\n    height: 70vh;\\n    width: 80vw;\\n}\\n\\nbutton {\\n    width: 100%;\\n    height: 1%;\\n    padding: 5%;\\n    background-color: greenyellow;\\n\\n}\\n\\n.center {\\n    margin: auto;\\n    border: 6px solid greenyellow;\\n    padding: 5%;\\n  }\\n\\n  ul {\\n    list-style: none;\\n}\\n\\n#recordingslist audio {\\n    display: block;\\n    margin-bottom: 10px;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://Remember_Me/./src/index.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://Remember_Me/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://Remember_Me/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"./node_modules/css-loader/dist/cjs.js!./src/index.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://Remember_Me/./src/index.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://Remember_Me/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://Remember_Me/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://Remember_Me/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://Remember_Me/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://Remember_Me/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://Remember_Me/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;