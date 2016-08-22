'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var formReview = document.querySelector('.review-form');
  var stars = formReview.elements['review-mark'];
  var reviewName = formReview.querySelector('#review-name');
  var reviewText = formReview.querySelector('#review-text');
  var reviewFields = formReview.querySelector('.review-fields');
  var reviewFieldsName = reviewFields.querySelector('.review-fields-name');
  var reviewFieldsText = reviewFields.querySelector('.review-fields-text');
  var submitButton = formReview.querySelector('.review-submit');

  var toggleInvisible = function(element, boolean) {
    if (boolean) {
      element.classList.add('invisible');
    } else {
      element.classList.remove('invisible');
    }
  };

  submitButton.disabled = true;
  toggleInvisible(reviewFieldsText, true);
  reviewName.required = true;

  reviewName.oninput = validation;
  reviewText.oninput = validation;
  stars.forEach(function(item) {
    item.onchange = validation;
  });

  function validation() {
    reviewText.required = stars.value < 3;

    var isNameValid = !reviewName.validity.valueMissing;
    var isTextValid = reviewText.required ? !reviewText.validity.valueMissing : true;
    var isFormValid = isNameValid && isTextValid;

    toggleInvisible(reviewFieldsName, isNameValid);
    toggleInvisible(reviewFieldsText, isTextValid);
    toggleInvisible(reviewFields, isFormValid);

    submitButton.disabled = !isFormValid;
  }

//Подсчет кол-ва дней с последнего ДР
  var date = new Date();
  var lastYear;

  function numberDays(month, day) {
    var dateOfBirth = new Date(lastYear, month, day);
    if (date.getMonth() > month) {
      lastYear = date.getFullYear();
    } else if (date.getMonth() === month) {
      if (date.getDate() >= day) {
        lastYear = date.getFullYear();
      } else {
        lastYear = date.getFullYear() - 1;
      }
    } else {
      lastYear = date.getFullYear() - 1;
    }
    dateOfBirth.setFullYear(lastYear);
    dateOfBirth.setMonth(month);
    dateOfBirth.setDate(day);
    return Math.round((date - dateOfBirth) / 1000 / 60 / 60 / 24);
  }

  var birthdayGraceHopper = {
    day: 9,
    month: 11
  };

//куки
  var browserCookies = require('browser-cookies');

  formReview.onsubmit = function() {
    browserCookies.set('review-mark', stars.value, {expires: numberDays(birthdayGraceHopper.month, birthdayGraceHopper.day)});
    browserCookies.set('review-name', reviewName.value, {expires: numberDays(birthdayGraceHopper.month, birthdayGraceHopper.day)});
  };

  stars.value = browserCookies.get('review-mark');
  reviewName.value = browserCookies.get('review-name');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
