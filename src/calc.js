    // calc.js
// measure calculations

var _ = require('underscore');
var geocrunch = require('geocrunch');

var pad = function (num) {
  return num < 10 ? '0' + num.toString() : num.toString();
};

var ddToDms = function (coordinate, posSymbol, negSymbol) {
  var dd = Math.abs(coordinate),
      d = Math.floor(dd),
      m = Math.floor((dd - d) * 60),
      s = Math.round((dd - d - (m/60)) * 3600 * 100)/100,
      directionSymbol = dd === coordinate ? posSymbol : negSymbol;
  return pad(d) + '&deg; ' + pad(m) + '\' ' + pad(s) + '" ' + directionSymbol;
};

var measure = function (latlngs) {
  var last = _.last(latlngs);
  var path = geocrunch.path(_.map(latlngs, function (latlng) {
    return [latlng.lng, latlng.lat];
  }));
  return {
    lastCoord: {
      dd: {
        x: last.lng,
        y: last.lat
      },
      dms: {
        x: ddToDms(last.lng, 'E', 'W'),
        y: ddToDms(last.lat, 'N', 'S')
      }
    },
    length: {
      m: path.distance({
        units: 'meters'
      }),
      km: path.distance({
        units: 'meters'
      })
    },
    area: {
      sqm: path.area({
        units: 'sqmeters'
      })
    }
  };
};

module.exports = {
  measure: measure // `measure(latLngArray)` - returns object with calced measurements for passed points
};
