'use strict';

let config = {
    numberLevel: 20,
    heightLevel: 3,
    coords: [
        [
            -122.416608,
            37.807246
        ],
        [
            -122.416844,
            37.807220
        ],
        [
            -122.416881,
            37.807356
        ],
        [
            -122.416645,
            37.807386
        ]
    ],

    place: {
        lat:37.357476,
        lng:-121.932604
    },

    camera: {
        lat: '',
        lng: '',
        alt: 100,
        tilt: ''
    }
};

config.setData = function setData(prop, value) {
    config[prop]=value;
};

config.getData = function getData(prop) {
    if (prop) {
        return config[prop];
    }

    return config;
};

//export default config;
