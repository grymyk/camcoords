'use strict';

let elem = null;
let base = null;

function updateColor(altitude) {
    let lightness = Math.trunc(10000 / altitude);

    return 'hsl(235, 50%, ' + lightness + '%)';
}

function createObj(data) {
    //console.log('Create Object');

    elem = document.createElement('div');

    elem.className = 'camera';
    elem.innerHTML = JSON.stringify(data);

    document.body.appendChild(elem);
}

function createBuilding() {
    console.log('createBuilding');

    let polygon = svg.createPolygon();
    base = svg.makeBase();

    let building = svg.createSVG(polygon);

    base.appendChild(building);

    document.body.appendChild(base);
}

function updateBuilding() {
    console.log('updateBuilding');

}

function updateObj(data) {
    //console.log('Update Object');
    
    let altitude = data.a || data.m;

    let style = elem.style;

    style.backgroundColor = updateColor(altitude);
    //updateColor(data.a);

    elem.innerHTML = JSON.stringify(data);
}

chrome.runtime.onMessage.addListener( (message, sender, sendResponse)=> {
    //console.log('Message');

    if (elem && base) {
        //updateBuilding();
        updateObj(message);
    } else {
        createBuilding(message);
        createObj(message);
    }
});
