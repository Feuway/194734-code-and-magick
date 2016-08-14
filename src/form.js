'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

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

var reviewName = document.querySelector('#review-name');
var reviewText = document.querySelector('#review-text');
var reviewFields = document.querySelector('.review-fields');
var reviewFieldsName = reviewFields.querySelector('.review-fields-name');
var reviewFieldsText = reviewFields.querySelector('.review-fields-text');
var reviewFormGroupMark = document.querySelector('.review-form-group-mark');
var ratingStar = reviewFormGroupMark.querySelectorAll('input');

reviewName.required = true;
reviewName.oninput = function() {
  if (!reviewName.valueMissing) {
    reviewFieldsName.style.display = 'none';
  } else {
    reviewFieldsName.style.display = '';
  }
};

reviewText.oninput = function() {
  if (!reviewText.valueMissing) {
    reviewFieldsText.style.display = 'none';
  } else {
    reviewFieldsText.style.display = '';
  }
};

for (var i = 0; i < ratingStar.length; i++) {
  if (i > 2) {
    ratingStar[i].onchange = function() {
      reviewText.required = true;
      reviewFieldsText.style.display = '';
    };
  } else {
    ratingStar[i].onchange = function() {
      reviewText.required = false;
      reviewFieldsText.style.display = 'none';
    };
  }
}
