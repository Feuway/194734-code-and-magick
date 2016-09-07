'use strict';

var template = document.querySelector('#review-template');
var templateContainer = 'content' in template ? template.content : template;

module.exports = function(review) {
  var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
  reviewElement.querySelector('.review-text').textContent = review.description;
  var starReview = reviewElement.querySelector('.review-rating');
  starReview.style.display = 'inline-block';

  for (var i = 1; i < review.rating; i++) {
    reviewElement.insertBefore(starReview.cloneNode(true), starReview);
  }
  var IMAGE_SIZE = 124;
  var pictureAuthor = new Image(IMAGE_SIZE, IMAGE_SIZE);
  var TIMEOUT;
  var IMAGE_LOAD_TIMEOUT = 10;

  pictureAuthor.onload = function() {
    reviewElement.replaceChild(pictureAuthor, reviewElement.querySelector('.review-author'));
    pictureAuthor.classList.add('review-author');
    pictureAuthor.title = review.author.name;
    clearTimeout(TIMEOUT);
  };

  pictureAuthor.onerror = function() {
    reviewElement.classList.add('review-load-failure');
  };

  TIMEOUT = setTimeout(function() {
    reviewElement.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  pictureAuthor.src = review.author.picture;


  return reviewElement;
};


