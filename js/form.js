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


var clickControl = function (control) {
  control.addEventListener('click', function () {
    preview.className = 'filter-image-preview'; // если совсем очистить className, то потом проблема с присвоением класса начинается, т.к. класс .filter-image-preview удален и preview не находится. Можно делать вот так? Но, получается, если кем-то будет добавлен новый класс какой-то элементу, то он будет теряться на этом шаге? Есть ли более грамотное решение? Или возможность заранее получать className элемента, а потом его же возвращать?
    if (control.checked) {
      preview.classList.add('filter-' + control.value);
    }
  });
};

for (var i = 0; i < filters.length; i++) {
  clickControl(filters[i]);
}

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


preview.style.transform = 'scale(' + parseInt(controlValue.value, 10) / 100 + ')'; // на этом моменте ужасным образом туплю. смотри как работает моя логика: я же тут не задаю значение? я задаю стиль для preview, чтобы фотография была в том масштабе, который указан в дефолтном значении. если я уберу эту строчку, а в html укажу 50%, то на размере фото это никак не скажется. а должно же?..объясни, что именно не так в этой мыслЕ?)))
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
