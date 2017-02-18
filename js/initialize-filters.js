'use strict';

window.initializeFilters = (function () {
  var preview = document.querySelector('.filter-image-preview');
  var uploadFilterControls = document.querySelector('.upload-filter-controls');

  return function () {
    var defaultFilter = document.getElementById('upload-filter-none');
    preview.className = 'filter-image-preview';
    preview.classList.add('filter-' + defaultFilter.value);

    var toggleFilterAriaPressed = function () {
      var inputs = document.getElementsByName('upload-filter');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('aria-pressed', inputs[i].checked);
      }
    };

    uploadFilterControls.addEventListener('click', function () {
      var target = event.target;
      if (target.tagName.toLowerCase() !== 'input') {
        return;
      } else {
        preview.className = 'filter-image-preview';
        preview.classList.add('filter-' + target.value);
      }
      toggleFilterAriaPressed();
    }, false);

    uploadFilterControls.addEventListener('keydown', function (evt) {
      if (window.utils.isActivateEvent(evt)) {
        if (event.target.tagName.toLowerCase() === 'label') {
          preview.className = 'filter-image-preview';
          var labelFor = event.target.getAttribute('for');
          var input = document.getElementById(labelFor);
          input.checked = true;
          preview.classList.add('filter-' + input.value);
          toggleFilterAriaPressed();
        }
      }
    }, true);
  };

})();
