'use strict';

window.initializeFilters = (function () {
  var uploadFilterControls = document.querySelector('.upload-filter-controls');

  return function (callback) {

    uploadFilterControls.addEventListener('click', function () {
      var target = event.target;
      if (target.tagName.toLowerCase() !== 'input') {
        return;
      }

      window.utils.toggleFilterAriaPressed();

      if (typeof callback === 'function') {
        callback(target.value);
      }
    }, false);

    uploadFilterControls.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        if (event.target.tagName.toLowerCase() === 'label') {
          var labelFor = event.target.getAttribute('for');
          var input = document.getElementById(labelFor);
          input.checked = true;
          window.utils.toggleFilterAriaPressed();
        }
      }
      if (typeof callback === 'function') {
        callback(input.value);
      }
    }, true);

  };

})();
