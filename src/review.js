'use strict';

var template = document.querySelector('#review-template');
var templateContainer = 'content' in template ? template.content : template;

var getReviews = function(review) {
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

var Review = function(data) {
  this.data = data;
  this.element = getReviews(this.data);

  this.yesAnswer = this.element.querySelector('.review-quiz-answer-yes');
  this.noAnswer = this.element.querySelector('.review-quiz-answer-no');

  this.yesAnswer.addEventListener('click', this.onYesAnswerClick.bind(this));
  this.noAnswer.addEventListener('click', this.onNoAnswerClick.bind(this));
};

Review.prototype.remove = function() {
  this.yesAnswer.removeEventListener('click', this.onYesAnswerClick.bind(this));
  this.noAnswer.removeEventListener('click', this.onNoAnswerClick.bind(this));
};

Review.prototype.onYesAnswerClick = function() {
  this.yesAnswer.classList.add('review-quiz-answer-active');
  this.noAnswer.classList.remove('review-quiz-answer-active');
};

Review.prototype.onNoAnswerClick = function() {
  this.noAnswer.classList.add('review-quiz-answer-active');
  this.yesAnswer.classList.remove('review-quiz-answer-active');
};

module.exports = Review;
