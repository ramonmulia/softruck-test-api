'use strict';

var informationModel = require('../information-model');

module.exports = function(state, city) {
  var promise = new Promise(function(resolve, reject) {
    var query = {
      name: state,
      cities: {
        $elemMatch: {
          name: city
        }
      }
    };
    informationModel.findOne(query, {
      cities: 1
    }, function(err, result) {
      if (err) {
        reject(err);
      } else {
        var cityFiltered = result.cities.filter(item => item.name === city)[0];
        resolve(cityFiltered);
      }
    });
  });

  return promise;
};
