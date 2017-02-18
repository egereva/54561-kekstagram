'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var uploadSelectImage = document.querySelector('#upload-select-image');
  var uploadOverlay = document.querySelector('.upload-overlay');

  var setupKeydownHandler = function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      closeUploadOverlayElement();
    }
  };

  var closeUploadOverlayElement = function () {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
    toggleAriaHidden(uploadOverlay);

    document.removeEventListener('keydown', setupKeydownHandler);
  };

  var toggleAriaHidden = function (element) {
    if (element.getAttribute('aria-hidden') === 'true') {
      element.setAttribute('aria-hidden', false);
    } else {
      element.setAttribute('aria-hidden', true);
    }
  };

  return {
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    showUploadOverlayElement: function () {
      uploadOverlay.classList.remove('invisible');
      uploadSelectImage.classList.add('invisible');
      toggleAriaHidden(uploadOverlay);

      document.addEventListener('keydown', setupKeydownHandler);
    },

    closeUploadOverlayElement: closeUploadOverlayElement
  };
})();
