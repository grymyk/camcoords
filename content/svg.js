'use strict';

let svg = {};

svg.makeSvgOptions = function makeSvgOptions(data) {
    let options = {};

    let altitude = data.a || data.m;
    options.color = svg.updateColor(altitude);

    return options;
};

svg.updateColor = function updateColor(altitude) {
    let lightness = Math.trunc(10000 / altitude);

    return 'hsl(235, 50%, ' + lightness + '%)';
};

svg.getCenter = function getCenter(elem) {
    let html = document.documentElement;

    let htmlWidth = html.clientWidth;
    let htmlHeight = html.clientHeight;

    let x = (htmlWidth - elem.width) / 2;
    let y = (htmlHeight - elem.height) / 2;

    return { x, y }
};

svg.makeBase = function makeBase() {
    base = document.createElement('div');

    base.id = 'base';

    let center = svg.getCenter({width: 120, height: 120});

    base.style.left = center.x + 'px';
    base.style.top = center.y + 'px';

    return base;
};

svg.createSVG = function createSVG(polygon) {
    //console.log('createSVG');

    let size = 120;

    const SVG_NS = 'http://www.w3.org/2000/svg';

    let viewBox = '0 0 ' + size + ' ' + size;

    let building = document.createElementNS(SVG_NS, 'svg');

    building.setAttributeNS(null, 'width', size);
    building.setAttributeNS(null, 'height', size);
    building.setAttributeNS(null, 'viewBox', viewBox);

    building.innerHTML = polygon;

    return building;
};

svg.createPolygon = function createPolygon(options) {
    //console.log('createPolygon');

    let style = 'style="stroke: #000; stroke-width: 1; ';
    style += 'fill:' + options.color + '"';

    // let points = 'points="60,20 100,40 100,80 60,100 20,80 20,40"';
    let points = 'points="0,0 0,60 60,60 60,0"';

    return '<polygon ' + points + style + '/>';
};


svg.clearPolygon = function clearPolygon() {
    return '';
};
