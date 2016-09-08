'use strict';

var Gallery = function(gallery) {
  var self = this;
  self.pictures = [];
  this.activePicture = 0;
  this.photogallery = gallery;
  this.overlayGallary = document.querySelector('.overlay-gallery');
  this.leftArrow = this.overlayGallary.querySelector('.overlay-gallery-control-left');
  this.rightArrow = this.overlayGallary.querySelector('.overlay-gallery-control-right');
  this.previewNumberCurrent = this.overlayGallary.querySelector('.preview-number-current');
  this.previewNumberTotal = this.overlayGallary.querySelector('.preview-number-total');
  this.closeGallery = this.overlayGallary.querySelector('.overlay-gallery-close');
};

Gallery.prototype.init = function() {
  var photogalleryImage = this.photogallery.querySelectorAll('.photogallery-image');
  Array.prototype.forEach.call(photogalleryImage, function(item, i) {
    var image = item.querySelector('img').src;
    self.pictures.push(image.src);

    item.onclick = function() {
      self.show(i);
    };
  });
};

Gallery.prototype.show = function(number) {
  self.overlayGallary.classList.remove('invisible');
  self.setActivePicture(number);

  this.closeGallery.onclick = function() {
    self.closedGallery();
  };

  this.leftArrow.onclick = function() {
    number--;
    self.onClickArrow(number);
  };

  this.rightArrow.onclick = function() {
    number++;
    self.onClickArrow(number);
  };
};

Gallery.prototype.hide = function() {
  self.overlayGallary.classList.add('invisible');

  this.closeGallery.onclick = null;

  this.leftArrow.onclick = null;

  this.rightArrow.onclick = null;
};

Gallery.prototype.setActivePicture = function(number) {
  self.activePicture = number;
  var picture = new Image();
  picture.src = this.pictures[number];

  this.galleryPreview = self.overlayGallary.querySelector('.overlay-gallery-preview');
  this.galleryPreview.appendChild(picture);
  this.galleryPreview.replaceChild(picture, picture);//второй арг.

  self.previewNumberCurrent = self.activePicture;
};

Gallery.prototype.closedGallery = function() {
  self.hide();
};

Gallery.prototype.onClickArrow = function(i) {
  this.setActivePicture(i);
};

module.exports = Gallery;
