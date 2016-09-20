'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
    case 'reviews-all':
      return list;
      break;

    case 'reviews-recent':
      var treeDaysAgo = new Date().getTime() -  1000 * 60 * 60 * 24 * 3;
      var sortDate = list.filter(function(element) {
        return element.created > treeDaysAgo;
      });

      return sortDate.sort(function(a, b) {
        return b.created - a.created;
      });
      break;

    case 'reviews-good':
      var sortNotLessThree = list.filter(function(element) {
        return element.rating >= 3;
      });
      return sortNotLessThree .sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-bad':
      var sortLessThree = list.filter(function(element) {
        return element.rating < 3;
      });
      return sortLessThree.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

};
