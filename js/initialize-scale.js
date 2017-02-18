'use strict';

window.initializeScale = (function () {
  var controlDec = document.querySelector('.upload-resize-controls-button-dec');
  var controlInc = document.querySelector('.upload-resize-controls-button-inc');
  var preview = document.querySelector('.filter-image-preview');

  return function (controlValue, ValueScale, step) {
    controlValue.value = ValueScale + '%';
    preview.style.transform = 'scale(' + ValueScale / 100 + ')';

    var decValue = function (valueControl, min) {
      if (valueControl > min) {
        return (valueControl - step);
      } else {
        return valueControl;
      }
    };

    var incValue = function (valueControl, max) {
      if (valueControl < max) {
        return (valueControl + step);
      } else {
        return valueControl;
      }
    };

    controlDec.addEventListener('click', function () {
      var value = decValue(parseInt(controlValue.value, 10), 25, step);
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
      var value = incValue(parseInt(controlValue.value, 10), 100, step);
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
  };
})();
