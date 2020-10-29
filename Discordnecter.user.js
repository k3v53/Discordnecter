// ==UserScript==
// @name        Discordnecter - State Updater
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/*
// @grant       none
// @version     1.0.0.1
// @updateURL https://raw.githubusercontent.com/k3v53/Discordnecter/main/Discordnecter.user.js
// @author      Me
// @description 10/27/2020, 9:55:03 PM
// ==/UserScript==

// Global Variables

var avatar = document.querySelector(
  "#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.avatarWrapper-2yR4wp"
);
var stateIdle = document.querySelector("#status-picker-idle");
var appWindow = document.querySelector("#app-mount");
var auth = JSON.parse(localStorage.token);
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
  // console.log('see u soon '+appC)
  var actualDate = new Date();
  useDate = actualDate;
  useActive = 0;
  stateUpdater("idle");
  appC++;
};

appWindow.onmouseenter = function () {
  var actualDate = new Date();
  useDate = actualDate;
  useActive = 1;
  stateUpdater("online");
};

setInterval(function () {
  console.log("Start Timer");
  if (useActive == 0) {
    var actualDate = new Date();
    var useDateA = new Date(useDate);
    var parseD = parseInt(useDateA);
    console.log(useDateA);
    console.log(Date.parse(useDateA));
    console.log(Date.parse(useDateA) - Date.parse(actualDate));

    if (Date.parse(useDateA) + 900000 < Date.parse(actualDate)) {
      stateUpdater("invisible");
    }
  }

  console.log("finishTimer");
}, 60000);
