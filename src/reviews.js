'use strict';

var URL = 'http://localhost:1506/api/reviews';
var Review = require('./review');
var container = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsMore = document.querySelector('.reviews-controls-more');
var pageNumber = 0;
var PAGE_SIZE = 3;
var activeFilter = 'reviews-all';

reviewsMore.classList.remove('invisible');

var renderReviews = function(reviews) {
  reviewsFilter.classList.add('invisible');
  reviews.forEach(function(review) {
    container.appendChild((new Review(review)).element);
  });
  reviewsFilter.classList.remove('invisible');
};

module.exports = function(callback) {
  var loadReviews = function(filterID, currentPage) {
    callback(URL, {
      from: currentPage * PAGE_SIZE,
      to: currentPage * PAGE_SIZE + PAGE_SIZE,
      filter: filterID
    }, renderReviews);
  };

  var changeReviewsFilter = function(filterID) {
    container.innerHTML = '';
    pageNumber = 0;
    activeFilter = filterID;

    loadReviews(filterID, pageNumber);
  };

  reviewsMore.addEventListener('click', function() {
    pageNumber++;
    loadReviews(activeFilter, pageNumber);
  });

  reviewsFilter.addEventListener('change', function(evt) {
    changeReviewsFilter(evt.target.id);
  }, true);

  changeReviewsFilter(activeFilter);
};
