'use strict';
window.JSONPRegistry = {};
var URL = 'http://localhost:1506/api/reviews';

var loadReviews = function(url, callback) {
  var callbackName = 'cb' + String(Math.random()).slice(-6);
  window.JSONPRegistry[callbackName] = function(data) {
    callback(data);
  };

  var script = document.createElement('script');
  script.src = url + '?callback=JSONPRegistry.' + callbackName;
  document.body.appendChild(script);
};

loadReviews(URL, JSONPCallback);

function JSONPCallback(reviews) {
  reviews.forEach(function(review) {
    container.appendChild(getReviews(review));
  });
}

var reviewsFilter = document.querySelector('.reviews-filter');
var container = document.querySelector('.reviews-list');
var template = document.querySelector('#review-template');
var templateContainer = 'content' in template ? template.content : template;


reviewsFilter.classList.add('invisible');

var getReviews = function(review) {
  var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
  reviewElement.querySelector('.review-text').textContent = review.description;
  reviewElement.querySelector('.review-author').title = review.author.name;
  var starReview = reviewElement.querySelector('.review-rating');
  starReview.style.display = 'inline-block';

  for (var i = 1; i < review.rating; i++) {
    reviewElement.insertBefore(starReview.cloneNode(true), starReview);
  }

  var pictureAuthor = new Image();

  pictureAuthor.onload = function() {
    reviewElement.querySelector('.review-author').src = pictureAuthor.src;
    reviewElement.querySelector('.review-author').width = '124';
    reviewElement.querySelector('.review-author').height = '124';
  };

  pictureAuthor.onerror = function() {
    reviewElement.classList.add('review-load-failure');
  };

  pictureAuthor.src = review.author.picture;

  reviewsFilter.classList.remove('invisible');
  return reviewElement;
};


