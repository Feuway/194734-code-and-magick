'use strict';

var container = document.querySelector('.reviews-list');
var URL = 'http://localhost:1506/api/reviews';

module.exports = (function() {

  function JSONPCallback(reviews) {
    reviews.forEach(function(review) {
      container.appendChild(getReviews(review));
    });
  }

  loadReviews(URL, JSONPCallback);
})();
