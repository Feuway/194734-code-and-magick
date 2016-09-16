'use strict';

var Review = require('./review');
var container = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');

module.exports = function(reviews) {
  reviewsFilter.classList.add('invisible');
  reviews.forEach(function(review) {
    container.appendChild((new Review(review)).element);
  });
  reviewsFilter.classList.remove('invisible');
};
