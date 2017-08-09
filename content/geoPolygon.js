'use strict';

function getLatitude(level, heightLevel) {
    console.log('getLatitude');
}

function getLongitude(level, heightLevel) {
    console.log('getLongitude');
}

function getAltitude(level, heightLevel) {
    console.log('getAltitude');

    return level * heightLevel;
}

function getColor() {
    console.log('getColor');
}

function get3DCoors(options) {
    let basic = options.coords;
    let numberLevel = options.numberLevel;
    let heightLevel = options.heightLevel;

    let floor3D = [];
    let temp = [];

    for (let level = 0; level < numberLevel; level += 1) {

        for (let point = 0, len = basic.length; point < len; point += 1) {
            temp[point] = basic[point];
            //temp[point][0] = getLatitude(level, heightLevel);
            //temp[point][1] = getLongitude(level, heightLevel);
            temp[point][2] = getAltitude(level, heightLevel);

            //console.log(basic[point]);
        }
        //console.log('----');

        floor3D.push(temp);
    }

    //console.log('3D points:', floor3D);

    return floor3D
}