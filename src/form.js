'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var formReview = document.querySelector('.review-form');
  var stars = formReview.elements['review-mark'];
  var reviewName = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var reviewFields = document.querySelector('.review-fields');
  var reviewFieldsName = reviewFields.querySelector('.review-fields-name');
  var reviewFieldsText = reviewFields.querySelector('.review-fields-text');
  var submitButton = document.querySelector('.review-submit');

  submitButton.disabled = true;
  reviewFieldsText.classList.add('invisible');

  reviewName.oninput = validation;
  reviewText.oninput = validation;
  stars.onchange = validation;

  function validation() {
    var isNameValid = reviewName.validity.valueMissing;
    var isTextValid = reviewText.validity.valueMissing || !reviewText.require;
    var isFormValid = isNameValid && isTextValid;

    reviewName.required = true;
    reviewText.required = stars.value < 3;

    submitButton.disabled = isFormValid;

    if (!isNameValid) {
      reviewFieldsName.classList.add('invisible');
    } else {
      reviewFieldsName.classList.remove('invisible');
    }

    if (!reviewText.validity.valueMissing || !reviewText.required) {
      reviewFieldsText.classList.add('invisible');
    } else {
      reviewFieldsText.classList.remove('invisible');
    }

    if (reviewFieldsName.classList.contains('invisible') &&
      reviewFieldsText.classList.contains('invisible')) {
      reviewFields.classList.add('invisible');
    } else {
      reviewFields.classList.remove('invisible');
    }
  }

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
