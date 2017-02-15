'use strict';

// 1 и 2 задания

var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = document.querySelector('.upload-form-cancel');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

var setupKeydownHandler = function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    closeUploadOverlayElement();
  }
};

var showUploadOverlayElement = function () {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
  toggleAriaHidden(uploadOverlay);

  document.addEventListener('keydown', setupKeydownHandler);
};

var closeUploadOverlayElement = function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  toggleAriaHidden(uploadOverlay);

  document.removeEventListener('keydown', setupKeydownHandler);
};

var toggleFilterAriaPressed = function () {
  var inputs = document.getElementsByName('upload-filter');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      inputs[i].setAttribute('aria-pressed', true);
    } else {
      inputs[i].setAttribute('aria-pressed', false);
    }
  }
};


var toggleAriaHidden = function (element) {
  if (element.getAttribute('aria-hidden') === 'true') {
    element.setAttribute('aria-hidden', false);
  } else {
    element.setAttribute('aria-hidden', true);
  }
};

uploadFile.addEventListener('change', function () {
  showUploadOverlayElement();
});

uploadFormCancel.addEventListener('click', function () {
  closeUploadOverlayElement();
});

// 3 задание

// var filters = document.getElementsByName('upload-filter');
var preview = document.querySelector('.filter-image-preview');
// var filtersLabels = document.querySelectorAll('.upload-filter-label');
var uploadFilterControls = document.querySelector('.upload-filter-controls');

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
  if (isActivateEvent(evt)) {
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

/* пока закомментировала то, что было до попытки делегирования

var changeControl = function (control, controlLabels) {
  control.addEventListener('click', function () {
    preview.className = 'filter-image-preview';
    if (control.checked) {
      preview.classList.add('filter-' + control.value);
    }
  });

  controlLabels.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      preview.className = 'filter-image-preview';
      preview.classList.add('filter-' + control.value);
    }
  });
};

for (var i = 0; i < filters.length; i++) {
  changeControl(filters[i], filtersLabels[i]);
}
*/

// 4 задание

var controlDec = document.querySelector('.upload-resize-controls-button-dec');
var controlInc = document.querySelector('.upload-resize-controls-button-inc');
var controlValue = document.querySelector('.upload-resize-controls-value');


var decValue = function (valueControl, min, n) {
  if (valueControl > min) {
    return (valueControl - n);
  } else {
    return valueControl;
  }
};

var incValue = function (valueControl, max, n) {
  if (valueControl < max) {
    return (valueControl + n);
  } else {
    return valueControl;
  }
};

controlDec.addEventListener('click', function () {
  var value = decValue(parseInt(controlValue.value, 10), 25, 25);
  if (value === 25) {
    controlDec.disabled = true;
    controlInc.disabled = false;
  } else {
    controlDec.disabled = false;
    controlInc.disabled = false;
  }
  controlValue.value = value + '%';
  preview.style.transform = 'scale(' + value / 100 + ')';
});

controlInc.addEventListener('click', function () {
  var value = incValue(parseInt(controlValue.value, 10), 100, 25);
  if (value === 100) {
    controlInc.disabled = true;
    controlDec.disabled = false;
  } else {
    controlDec.disabled = false;
    controlInc.disabled = false;
  }
  controlValue.value = value + '%';
  preview.style.transform = 'scale(' + value / 100 + ')';
});
