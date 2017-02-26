'use strict';

window.showGalery = (function () {

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var image = galleryOverlay.querySelector('.gallery-overlay-image');
  var galeryCloseElement = galleryOverlay.querySelector('.gallery-overlay-close');
  var likes = galleryOverlay.querySelector('.likes-count');
  var comments = galleryOverlay.querySelector('.comments-count');
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var showgalleryOverlay = function () {
    galleryOverlay.classList.remove('invisible');
    galeryCloseElement.focus();
    window.utils.toggleAriaHidden(galleryOverlay);
    document.addEventListener('keydown', setupKeydownHandler);
  };

  var closeGalleryOverlay = function () {
    galleryOverlay.classList.add('invisible');
    window.utils.toggleAriaHidden(galleryOverlay);

    document.removeEventListener('keydown', setupKeydownHandler);
  };

  var setupKeydownHandler = function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      closeGalleryOverlay();
    }
  };

  var closeByEnter = function (event) {
    event.preventDefault();
    if (event.keyCode === ENTER_KEY_CODE) {
      closeGalleryOverlay();
    }
  };

  return function (picture) {

    showgalleryOverlay();
    image.src = picture.url;
    likes.innerText = picture.likes;
    comments.innerText = picture.comments.length;

    galeryCloseElement.addEventListener('click', closeGalleryOverlay);
    galeryCloseElement.addEventListener('keydown', closeByEnter);
    galleryOverlay.addEventListener('keydown', setupKeydownHandler);
  };
})();
