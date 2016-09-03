'use strict';

module.exports = (function() {
  var loadReviews = require('./load');
  var getReviews = require('./review');
  var container = document.querySelector('.reviews-list');
  var URL = 'http://localhost:1506/api/reviews';

  function JSONPCallback(reviews) {
    reviews.forEach(function(review) {
      container.appendChild(getReviews(review));
    });
  }

  loadReviews(URL, JSONPCallback);
})();
