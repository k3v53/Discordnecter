// ==UserScript==
// @name        Discordnecter - State Updater
// @namespace   Violentmonkey Scripts
// @match       https://discord.com/*
// @grant       none
// @version     1.0
// @updateURL https://raw.githubusercontent.com/k3v53/Discordnecter/main/Discordnecter.user.js
// @author      Me
// @description 10/27/2020, 9:55:03 PM
// ==/UserScript==

// Global Variables

var avatar = document.querySelector('#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.sidebar-2K8pFh > section > div.container-3baos1 > div.avatarWrapper-2yR4wp')
var stateIdle = document.querySelector('#status-picker-idle')
var appWindow = document.querySelector('#app-mount')
var auth = "mfa.9N9he0luR_wwvkh4KUi8Trtnbgg5LhYR9UZ4sYg-XAcEbm72YpMwJimd0-Qga6oohD8g-ZOxy9kO4eUn6PP0"
var appC = 0
var useActive = 1
var useDate = null



appWindow.onmouseleave = function(){
 // console.log('see u soon '+appC)
var actualDate = new Date()
useDate = actualDate
  useActive = 0
const data = JSON.stringify({
  "status": "idle"
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    //console.log(this.responseText);
  }
});

xhr.open("PATCH", "https://discord.com/api/v8/users/@me/settings");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("authorization", auth);

xhr.send(data);
  appC++
}





appWindow.onmouseenter = function(){
  var actualDate = new Date()
useDate = actualDate
  useActive = 1
  const data = JSON.stringify({
  "status": "online"
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    //console.log(this.responseText);
  }
});

xhr.open("PATCH", "https://discord.com/api/v8/users/@me/settings");
//xhr.setRequestHeader("cookie", "__cfduid=d21f5316eee08bed06484068057522afd1603847697");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("authorization", auth);

xhr.send(data);
}


setInterval(function(){ 
  console.log("Start Timer")
                      if (useActive == 0){
                       var actualDate = new Date()
                       var useDateA = new Date(useDate)
                       var parseD = parseInt(useDateA)
                                                console.log(useDateA)
                                                console.log(Date.parse(useDateA))
                                                 console.log(Date.parse(useDateA)-Date.parse(actualDate))

                        if (Date.parse(useDateA) + 900000 < Date.parse(actualDate)){
                          
                            const data = JSON.stringify({
  "status": "invisible"
});

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    //console.log(this.responseText);
  }
});

xhr.open("PATCH", "https://discord.com/api/v8/users/@me/settings");
//xhr.setRequestHeader("cookie", "__cfduid=d21f5316eee08bed06484068057522afd1603847697");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("authorization", auth);

xhr.send(data);
                          
                          
                          
                          
                        }
                      }
                      
                      console.log("finishTimer")
                      }, 60000);
