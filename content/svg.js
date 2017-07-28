'use strict';

let svg = {};

svg.createSVG = function createSVG(polygon) {
    //console.log('createSVG');

    const SVG_NS = 'http://www.w3.org/2000/svg';
    let size = 120;
    let viewBox = '0 0 120 120';

    let building = document.createElementNS(SVG_NS, 'svg');

    building.setAttributeNS(null, 'width', size);
    building.setAttributeNS(null, 'height', size);
    building.setAttributeNS(null, 'viewBox', viewBox);

    building.innerHTML = polygon;

    //console.log(building);

    return building;
};

svg.createPolygon = function createPolygon() {
    //console.log('createPolygon');

    return '<polygon ' +
        'points="60,20 100,40 100,80 60,100 20,80 20,40"' +
        'style="fill: red; stroke: blue; stroke-width: 1"' +
        '/>';
};
