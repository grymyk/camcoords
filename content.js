'use strict';

let elem = null;

function createObj(data) {
    //console.log('Create Object');

    elem = document.createElement('div');

    elem.className = 'camera';
    elem.innerHTML = JSON.stringify(data);

    document.body.appendChild(elem);
}

function updateObj(data) {
    //console.log('Update Object');

    elem.innerHTML = JSON.stringify(data);
}

chrome.runtime.onMessage.addListener( (message, sender, sendResponse)=> {
    //console.log('Message');

    if (elem) {
        updateObj(message);
    } else {
        createObj(message);
    }
});
