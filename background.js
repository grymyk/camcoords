'use strict';

function makeConfig(data) {
    let config = {};
    const CAMERA_INDEX_DATA = 2;

    let len = data.length;

    let coordCenter = {
        lat: data[0],
        lng: data[1]
    };

    let camera = {};

    for (let i = CAMERA_INDEX_DATA; i < len; i += 1) {
        let key = data[i].slice(-1);
        camera[key] = data[i].slice(0, -1);
    }

    //console.log(coordCenter, camera);

    config = Object.assign(config, coordCenter, camera);
    console.log(config);

    return config;
}

function parseUrl(url) {
    console.log('parseUrl');
    console.log(url);

    if (url) {
        let at = url.split('@');
        let atDataPath = at[1].split('/');
        let data = atDataPath[0];
        let params = data.split(',');

        //console.log(params);

        makeConfig(params);
    }

    return;
}

chrome.browserAction.onClicked.addListener( (tab) => {
    console.log('Clicked');

    parseUrl(tab.url);

    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});

chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab)=> {
    //console.log('Updated: ', changeInfo.url);

    if (changeInfo && changeInfo.url) {
        parseUrl(changeInfo.url);
    }
});
