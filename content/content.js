'use strict';

let elem = null;
let base = null;
let oldBuilding = null;

function createObj(data) {
    elem = document.createElement('div');

    elem.className = 'camera';
    elem.innerHTML = JSON.stringify(data);

    document.body.appendChild(elem);
}

function createBuilding(data) {
    console.log('createBuilding');

    let svgOptions = svg.makeSvgOptions(data);

    let polygon = svg.createPolygon(svgOptions);
    base = svg.makeBase();

    let building = svg.createSVG(polygon);

    oldBuilding = base.appendChild(building);

    document.body.appendChild(base);
}

function updateBuilding(data) {
    //console.log('updateBuilding');

    let svgOptions = svg.makeSvgOptions(data);
    let polygon = svg.createPolygon(svgOptions);
    let newBuilding = svg.createSVG(polygon);

    //console.log('new: ', newBuilding);
    //console.log('old: ', oldBuilding);

    base.removeChild(oldBuilding);
    oldBuilding = base.appendChild(newBuilding);
}

function updateObj(data) {
    //console.log('Update Object');
    
    let altitude = data.a || data.m;

    let style = elem.style;

    style.backgroundColor = svg.updateColor(altitude);
    //updateColor(data.a);

    elem.innerHTML = JSON.stringify(data);
}

chrome.runtime.onMessage.addListener( (message, sender, sendResponse)=> {
    if (elem && base) {
        updateBuilding(message);
        updateObj(message);
    } else {
        createBuilding(message);
        createObj(message);
    }
});
