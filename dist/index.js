(()=>{"use strict";var e={424:(e,n,t)=>{t.d(n,{Z:()=>p});var r=t(81),o=t.n(r),a=t(645),c=t.n(a),i=t(667),s=t.n(i),l=new URL(t(892),t.b),u=c()(o()),d=s()(l);u.push([e.id,"@font-face {\r\n    font-family: MyWebFont;\r\n    src: url("+d+")\r\n}\r\n\r\nhtml,\r\nbody {\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #6BB0F9;\r\n    color: gold;\r\n    font-family: MyWebFont;\r\n    font-size: 1.3em;\r\n}\r\n\r\n\r\n.container {\r\n    height: 85vh;\r\n    width: 80vw;\r\n    border-style: solid;\r\n    padding: 10px;\r\n}\r\n\r\nbutton {\r\n    width: 100%;\r\n    height: 10%;\r\n    background-color: #425CA7;\r\n    color: gold;\r\n\r\n}\r\n\r\n.center {\r\n    margin: auto;\r\n    padding-bottom: 1%;\r\n}\r\n\r\nul {\r\n    list-style: none;\r\n}\r\n\r\n#recordingslist audio {\r\n    display: block;\r\n    margin-bottom: 10px;\r\n}\r\n\r\naudio, input {\r\n    width: 100%;\r\n    padding-bottom: 5%;\r\n}\r\n\r\noutput {\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n}",""]);const p=u},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(c[s]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&c[u[0]]||(void 0!==a&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=a),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var a={},c=[],i=0;i<e.length;i++){var s=e[i],l=r.base?s[0]+r.base:s[0],u=a[l]||0,d="".concat(l," ").concat(u);a[l]=u+1;var p=t(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var g=o(f,r);r.byIndex=i,n.splice(i,0,{identifier:d,updater:g,references:1})}c.push(d)}return c}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<a.length;c++){var i=t(a[c]);n[i].references--}for(var s=r(e,o),l=0;l<a.length;l++){var u=t(a[l]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}a=s}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},892:(e,n,t)=>{e.exports=t.p+"d1c4ee44a1c22b44da16.ttf"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var a=n[r]={id:r,exports:{}};return e[r](a,a.exports,t),a.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e=t(379),n=t.n(e),r=t(795),o=t.n(r),a=t(569),c=t.n(a),i=t(565),s=t.n(i),l=t(216),u=t.n(l),d=t(589),p=t.n(d),f=t(424),g={};g.styleTagTransform=p(),g.setAttributes=s(),g.insert=c().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=u(),n()(f.Z,g),f.Z&&f.Z.locals&&f.Z.locals;const h=document.getElementById("scanButton"),m=document.getElementById("output"),v=document.getElementById("outputUpload");let y;h.addEventListener("click",(async()=>{console.log("User clicked scan button");try{const e=new NDEFReader;await e.scan(),console.log("> Scan started"),e.addEventListener("readingerror",(()=>{console.log("Argh! Cannot read data from the NFC tag. Try another one?")})),e.addEventListener("reading",(({message:e,serialNumber:n})=>{y=n,console.log(`> Serial Number: ${n}`),m.innerHTML=`${n}`,console.log(`> Records: (${e.records.length})`)}))}catch(e){console.log("Argh! "+e)}}));const b=document.getElementById("recorder"),w=document.getElementById("player");let x,E,T;b.addEventListener("change",(function(e){x=e.target.files[0],T=URL.createObjectURL(x),console.log(T),w.src=T})),document.getElementById("uploadButton").addEventListener("click",(async()=>{try{E=new File([x],`${y}.m4a`),console.log(E);var e=await async function(e){return new Promise(((n,t)=>{let r=new FileReader;r.onerror=t,r.onload=e=>n(e.target.result),r.readAsDataURL(e)}))}(E);console.log(e),async function(e){const n=await fetch("https://forgetmenotbox.netlify.app/.netlify/functions/dbwrite",{method:"POST",body:e});await function(e){200===e.status?v.innerHTML="Success! File upload!":v.innerHTML=`Failed with code: ${e.status}`}(n)}(`${y}SPLITSTRING${e}`)}catch(e){console.log("Argh! "+e)}}))})()})();