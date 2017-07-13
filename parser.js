'use strict';

let gmaps = {
    makeConfig(data) {
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
    },

    parseUrl(url) {
        if (url) {
            let at = url.split('@');
            let atDataPath = at[1].split('/');
            let data = atDataPath[0];
            let params = data.split(',');

            //console.log(params);

            return this.makeConfig(params);
        }

        return;
    }
};
