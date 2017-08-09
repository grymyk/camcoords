'use strict';

let camera = null;

chrome.browserAction.onClicked.addListener( (tab)=> {
    // case 1
    gmaps.setCamera(tab.id);

    // case 2
    //camera = gmaps.parseUrl(tab.url);
    //gmaps.getCameraCoords(tab.id, camera, chrome.tabs.sendMessage);
    //console.log(camera);

    // case 3
    //chrome.tabs.sendMessage(tab.id, camera);
});

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab)=> {
    if (changeInfo && changeInfo.url) {
        console.log(changeInfo.url);

        setTimeout(function () {
            camera = gmaps.parseUrl(changeInfo.url);
            console.log(camera);

            chrome.tabs.sendMessage(tabId, camera);
        }, 2000);
    }
});
