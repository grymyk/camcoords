'use strict';

let camera = null;

chrome.browserAction.onClicked.addListener( (tab)=> {
    //console.log('Click');
    //console.log('URL: ', tab.url);

    camera = gmaps.parseUrl(tab.url);
    //console.log(camera);

    chrome.tabs.sendMessage(tab.id, camera);
});

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab)=> {
    //console.log('Update');

    if (changeInfo && changeInfo.url) {
        //console.log(changeInfo.url);

        camera = gmaps.parseUrl(changeInfo.url);

        chrome.tabs.sendMessage(tabId, camera);
    }
});
