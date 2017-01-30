'use strict';

// 1 и 2 задания

var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = document.querySelector('.upload-form-cancel');

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
});

uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
});

// 3 задание

var filters = document.getElementsByName('upload-filter');
var preview = document.querySelector('.filter-image-preview');

var setFilterName = function () {
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].checked) {
      preview.classList.add('filter-' + filters[i].value);
    } else {
      preview.classList.remove('filter-' + filters[i].value);
    }
  }
};

var clickControl = function (control) {
  control.addEventListener('click', function () {
    setFilterName();
  });
};

for (var i = 0; i < filters.length; i++) {
  clickControl(filters[i]);
}

// 4 задание

var controlDec = document.querySelector('.upload-resize-controls-button-dec');
var controlInc = document.querySelector('.upload-resize-controls-button-inc');
var controlValue = document.querySelector('.upload-resize-controls-value');

var decValue = function (min, n) {
  var value = parseInt(controlValue.value, 10);
  if (value > min) {
    value = value - n;
    if (value === min) {
      controlDec.disabled = true;
      controlInc.disabled = false;
    }
    return value;
  } else {
    return value;
  }
};

var incValue = function (max, n) {
  var value = parseInt(controlValue.value, 10);
  if (value < max) {
    value = value + n;
    if (value === max) {
      controlInc.disabled = true;
      controlDec.disabled = false;
    }
    return value;
  } else {
    return value;
  }
};

preview.style.transform = 'scale(' + parseInt(controlValue.value, 10) / 100 + ')';

controlDec.addEventListener('click', function () {
  var value = decValue(25, 25);
  controlValue.value = value + '%';
  preview.style.transform = 'scale(' + value / 100 + ')';
});

controlInc.addEventListener('click', function () {
  var value = incValue(100, 25);
  controlValue.value = value + '%';
  preview.style.transform = 'scale(' + value / 100 + ')';
});
