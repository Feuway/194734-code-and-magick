'use strict';

var Gallery = function(gallery) {
  this.pictures = [];
  this.activePicture = 0;
  this.photogallery = document.querySelector(gallery);
  this.overlayGallary = document.querySelector('.overlay-gallery');
  this.leftArrow = this.overlayGallary.querySelector('.overlay-gallery-control-left');
  this.rightArrow = this.overlayGallary.querySelector('.overlay-gallery-control-right');
  this.previewNumberCurrent = this.overlayGallary.querySelector('.preview-number-current');
  this.previewNumberTotal = this.overlayGallary.querySelector('.preview-number-total');
  this.closeGallery = this.overlayGallary.querySelector('.overlay-gallery-close');
};

Gallery.prototype.init = function() {
  var self = this;
  var photogalleryImage = this.photogallery.querySelectorAll('.photogallery-image');
  Array.prototype.forEach.call(photogalleryImage, function(item, i) {
    var image = item.querySelector('img').src;
    self.pictures.push(image);

    item.onclick = function() {
      self.show(i);
    };
  });
};

Gallery.prototype.show = function(number) {
  this.overlayGallary.classList.remove('invisible');
  this.setActivePicture(number);

  this.onClickLeftArrow = function() {
    number--;
    if (number >= 0) {
      this.onClickArrow(number);
    } else {
      number = 0;
    }
  };

  this.onClickRightArrow = function() {
    number++;
    if (number <= this.pictures.length - 1) {
      this.onClickArrow(number);
    } else {
      number = this.pictures.length - 1;
    }
  };

  this.closeGallery.addEventListener('click', this.closedGallery.bind(this));
  this.leftArrow.addEventListener('click', this.onClickLeftArrow.bind(this));
  this.rightArrow.addEventListener('click', this.onClickRightArrow.bind(this));
};

Gallery.prototype.hide = function() {
  this.overlayGallary.classList.add('invisible');

  this.closeGallery.removeEventListener('click', this.closedGallery.bind(this));
  this.leftArrow.removeEventListener('click', this.onClickLeftArrow.bind(this));
  this.rightArrow.removeEventListener('click', this.onClickRightArrow.bind(this));
};

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number + 1;
  var picture = new Image();
  picture.src = this.pictures[number];

  this.previewNumberCurrent.textContent = this.activePicture;
  this.previewNumberTotal.textContent = this.pictures.length;

  this.galleryPreview = this.overlayGallary.querySelector('.overlay-gallery-preview');
  this.galleryPreview.replaceChild(picture, this.galleryPreview.firstChild);
};

Gallery.prototype.closedGallery = function() {
  this.hide();
};

Gallery.prototype.onClickArrow = function(i) {
  this.setActivePicture(i);
};

module.exports = Gallery;
