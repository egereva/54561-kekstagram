'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var controlValue = document.querySelector('.upload-resize-controls-value');
  var preview = document.querySelector('.filter-image-preview');
  var controlDec = document.querySelector('.upload-resize-controls-button-dec');
  var controlInc = document.querySelector('.upload-resize-controls-button-inc');
  var VALUE_SCALE = 100;

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

    showUploadOverlayElement: function (callback) {
      uploadOverlay.classList.remove('invisible');
      uploadSelectImage.classList.add('invisible');
      toggleAriaHidden(uploadOverlay);

      document.addEventListener('keydown', setupKeydownHandler);

      if (typeof callback === 'function') {
        callback();
      }

    },

    setDefaultValue: function () {
      (window.initializeFilters())();

      controlValue.value = VALUE_SCALE + '%';
      preview.style.transform = 'scale(' + VALUE_SCALE / 100 + ')';
      controlDec.disabled = false;
      controlInc.disabled = true;
    },

    closeUploadOverlayElement: closeUploadOverlayElement,

    valueScale: VALUE_SCALE
  };
})();
