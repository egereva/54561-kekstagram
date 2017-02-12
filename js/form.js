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

  document.addEventListener('keydown', setupKeydownHandler);
};

var toggleAriaPressed = function (element) {
  if (element.getAttribute('aria-pressed') === 'false') {
    element.setAttribute('aria-pressed', true);
  } else {
    element.setAttribute('aria-pressed', false);
  }
}; // снова сложности с пониманием этой функции. как должен переключаться aria-pressed? когда он должен становиться true и возвращаться в false?

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

  if (target.tagName !== 'INPUT') {
    return;
  } else {
    preview.className = 'filter-image-preview';
    preview.classList.add('filter-' + target.value);
    toggleAriaPressed(target);
  }
}, false);

uploadFilterControls.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    if (event.target.tagName === 'LABEL') {
      preview.className = 'filter-image-preview';
      event.target.previousElementSibling.checked = true;  // вот тут я использую previousElementSibling - это больше похоже на подгон и не слишком правильно, хоть и работает, да? Получается же, что если кто-то поменяет что-нибудь местами, то всё поломается? Подскажи, как можно грамотно указать на input по label, с которым он связан (в ситуации, когда input не вложен в label)?
      preview.classList.add('filter-' + event.target.previousElementSibling.value);
      toggleAriaPressed(event.target);
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
