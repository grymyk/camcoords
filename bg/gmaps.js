'use strict';

let gmaps = {};

gmaps.makeConfig = function makeConfig(data) {
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

    config = Object.assign(config, coordCenter, camera);

    return config;
};

gmaps.parseUrl = function parseUrl(url) {
    if (url) {
        let at = url.split('@');
        let atDataPath = at[1].split('/');
        let data = atDataPath[0];
        let params = data.split(',');

        return this.makeConfig(params);
    }
};

gmaps.getDeltaLatDegree = function getDeltaLat(meter) {
    let earthRadius = 6371000;
    let radian = 180 / Math.PI;
    let fixedDelta = meter / earthRadius * radian;

    return fixedDelta.toFixed(6);
};

gmaps.getTilt = function getTilt(altCamera, distanceFromObj) {
    let heightObj = 100;

    let dh = altCamera - heightObj / 2;
    let radian = 180 / Math.PI;
    let fixedTilt = Math.atan( distanceFromObj / dh ) * radian;

    return fixedTilt.toFixed(2);
};

gmaps.setCameraCoords = function setCameraCoords(deltaLat) {
    let latCamera = config.getData('place');

    let lat = config['place']['lat'];
    let lng = config['place']['lng'];
    let heightCamera = 100;
    let tilt = gmaps.getTilt(heightCamera);

    config.setData('camera', [lat, lng, heightCamera, tilt])
};

gmaps.formatUrl = function formatUrl(params) {
    let host = 'https://www.google.com/maps/@';

    let lat = params.lat + ',';
    let lng = params.lng + ',';
    let alt = params.alt + 'a,';
    let y = params.y + 'y,';
    let tilt = params.tilt + 't';

    let coords = lat + lng + alt + y + tilt;

    let suffix = '/data=!3m1!1e3';

    return host + coords + suffix;
};

gmaps.getLatCamera = function getLatCamera(distanceFromObj) {
    let deltaDegree = gmaps.getDeltaLatDegree(distanceFromObj);
    let latObj = config['place']['lat'];

    return latObj - deltaDegree;
};

gmaps.setBuilding = function setBuilding(tab) {
    //console.log('setBuilding');

    let camera = gmaps.parseUrl(tab.url);
    //console.log('camera: ', camera);

    chrome.tabs.sendMessage(tab.id, camera);
};

gmaps.setCamera = function setCamera(tabId) {
    let latObj = config['place']['lat'];
    let lngObj = config['place']['lng'];
    let altCamera = config['camera']['alt'];

    let distanceFromObj = 100;

    let params = {};
    params.lat = gmaps.getLatCamera(distanceFromObj);
    params.lng = config['place']['lng'];
    params.alt = altCamera;
    params.y = 35;
    params.tilt = gmaps.getTilt(altCamera, distanceFromObj);

    let url = gmaps.formatUrl(params);

    let updateProperties = {url};

    chrome.tabs.update(tabId, updateProperties, gmaps.setBuilding);
};

gmaps.getCameraCoords = function getCameraCoords(tabId, coord, callback) {
    callback(tabId, coord);
};
