'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var DEFAULT_VALUE = 100;
  var STEP = 25;

  uploadFile.addEventListener('change', function () {
    window.utils.showUploadOverlayElement(function () {
      window.utils.setDefaultValue(DEFAULT_VALUE);
    });
  });

  uploadFormCancel.addEventListener('click', function () {
    window.utils.closeUploadOverlayElement();
  });

  window.initializeScale(document.querySelector('.upload-resize-controls-value'), DEFAULT_VALUE, STEP, window.utils.adjustScale);
  window.initializeFilters(window.utils.applyFilter);

})();
