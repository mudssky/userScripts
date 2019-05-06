// ==UserScript==
// @name         getNicoVideoLink
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.nicovideo.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function getVideoUrl(){
        var data = document.getElementById("js-initial-watch-data").getAttribute("data-api-data");
        var jsonData = JSON.parse(data);
        return jsonData.video.smileInfo.url;
    }
    setTimeout(function () {
   
    var a = document.createElement("a");
    var url = getVideoUrl
    a.href = url;
    a.target = "_blank";
    a.innerHTML = "<br/>原视频";
    document.querySelector(".VideoTitle").appendChild(a);
},2500);
})();