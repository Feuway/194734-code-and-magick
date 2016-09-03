'use strict';

module.exports = (function() {
  var load = require('./load');
  var review = require('./review');
  
  var container = document.querySelector('.reviews-list');

  function JSONPCallback(reviews) {
    reviews.forEach(function(review) {
      container.appendChild(getReviews(review));
    });
  }

  return JSONPCallback;
})();
