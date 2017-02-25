'use strict';

window.initializeFilters = (function () {
  var uploadFilterControls = document.querySelector('.upload-filter-controls');

  return function (callback) {

    uploadFilterControls.addEventListener('click', function () {
      var target = event.target;
      if (target.tagName.toLowerCase() !== 'input') {
        return;
      } else {
        var newFilter = target.value;
      }
      window.utils.toggleFilterAriaPressed();

      if (typeof callback === 'function') {
        callback(newFilter);
      }
    }, false);

    uploadFilterControls.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        if (event.target.tagName.toLowerCase() === 'label') {
          var labelFor = event.target.getAttribute('for');
          var input = document.getElementById(labelFor);
          input.checked = true;
          var newFilter = input.value;
          window.utils.toggleFilterAriaPressed();
        }
      }
      if (typeof callback === 'function') {
        callback(newFilter);
      }
    }, true);

  };

})();
