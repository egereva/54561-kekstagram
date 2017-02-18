'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');

  uploadFile.addEventListener('change', function () {
    window.utils.showUploadOverlayElement();
    window.initializeScale(document.querySelector('.upload-resize-controls-value'), 100, 25);
    window.initializeFilters();
  });

  uploadFormCancel.addEventListener('click', function () {
    window.utils.closeUploadOverlayElement();
  });

})();
