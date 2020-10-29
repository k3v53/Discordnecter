// ==UserScript==
// @name        Discordnecter - State Updater
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/*
// @grant       none
// @version     1.0.1
// @author      Me
// @description 10/27/2020, 9:55:03 PM
// ==/UserScript==

// Global Variables
console.log("Loading Discordnecter")
const stateIdle = document.querySelector("#status-picker-idle");
const appWindow = document.querySelector("#app-mount");
const auth = JSON.parse(localStorage.token);
var idleTime = 1;
var discTime = 7;
var timerInterval = 1;
var appC = 0;
var useActive = 1;
var useDate = null;

function stateUpdater(status) {
  const data = JSON.stringify({
    status: status,
  });

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      // Check the results
      // console.log(this.responseText);
    }
  });

  xhr.open("PATCH", "https://discord.com/api/v8/users/@me/settings");
  xhr.setRequestHeader("Content-Type", "application/json");
  // Set your discord auth token from your account
  xhr.setRequestHeader("authorization", auth);

  xhr.send(data);
}

appWindow.onmouseleave = function () {
  // Test on console if works
   console.log('see u soon '+appC)
  var actualDate = new Date();
  useDate = actualDate;
  useActive = 0;
  // stateUpdater("idle");
  appC++;
};

appWindow.onmouseenter = function () {
  var actualDate = new Date();
  useDate = actualDate;
  useActive = 1;
  // stateUpdater("online");
   console.log("Hello! "+appC)
};

setInterval(function () {
  console.log("Start Timer");

  switch (useActive) {
    case 1:
      let aStatus = JSON.parse(localStorage.UserSettingsStore).status;
      if (aStatus != "online") {
        console.log("SetOnline");
        stateUpdater("online");
      }
      break;
    case 0:
      let aStatus = JSON.parse(localStorage.UserSettingsStore).status;
      var actualDate = new Date();
      var useDateA = new Date(useDate);
      switch (aStatus) {
        case "online":
          console.log("Estoy Online!!");
          if (
            Date.parse(useDateA) + (idleTime * 1000 - 1) <
            Date.parse(actualDate)
          ) {
            console.log("SetIdle");
            stateUpdater("idle");
          }
          break;
        case "idle":
          console.log("Estoy AFK!!");
          if (
            Date.parse(useDateA) + (discTime * 1000 - 1) <
            Date.parse(actualDate)
          ) {
            console.log("SetInvisible");
            stateUpdater("invisible");
          }
          break;
        case "invisible":
          console.log("Estoy Desconectado D:!!");
          break;
        default:
          break;
      }
      // console.log(useDateA);
      // console.log(Date.parse(useDateA));
      // console.log(Date.parse(useDateA) - Date.parse(actualDate));
      /*

*/
      break;
    default:
      break;
  }
  /*  
if (useActive == 0) {
    var actualDate = new Date();
    var useDateA = new Date(useDate);
    var parseD = parseInt(useDateA);
    // console.log(useDateA);
    // console.log(Date.parse(useDateA));
    // console.log(Date.parse(useDateA) - Date.parse(actualDate));
    stateUpdater("online");
    if (Date.parse(useDateA) + (idleTime-1) < Date.parse(actualDate)) {
      stateUpdater("idle");
      if (Date.parse(useDateA) + (discTime-1) < Date.parse(actualDate)) {
        stateUpdater("invisible");
      }
    }
  } */

  console.log("finishTimer");
}, timerInterval * 1000);

//  $('input#authToken').value = JSON.parse(localStorage.token);
