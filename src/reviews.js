'use strict';

var getReviews = require('./review');
var container = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');

module.exports = function(reviews) {
  reviewsFilter.classList.add('invisible');
  reviews.forEach(function(review) {
    container.appendChild(getReviews(review));
  });
  reviewsFilter.classList.remove('invisible');
};
