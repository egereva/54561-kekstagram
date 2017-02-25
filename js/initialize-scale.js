'use strict';

window.initializeScale = (function () {
  var controlDec = document.querySelector('.upload-resize-controls-button-dec');
  var controlInc = document.querySelector('.upload-resize-controls-button-inc');
  var controls = document.querySelector('.upload-resize-controls');

  return function (controlValue, valueScale, step, callback) {

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

    controls.addEventListener('click', function (event) {
      if (event.target === controlDec) {
        valueScale = decValue(parseInt(controlValue.value, 10), 25);
        if (valueScale === 25) {
          controlDec.disabled = true;
          controlInc.disabled = false;
        } else {
          controlDec.disabled = false;
          controlInc.disabled = false;
        }
      }

      if (event.target === controlInc) {
        valueScale = incValue(parseInt(controlValue.value, 10), 100);
        if (valueScale === 100) {
          controlInc.disabled = true;
          controlDec.disabled = false;
        } else {
          controlDec.disabled = false;
          controlInc.disabled = false;
        }
      }

      if (typeof callback === 'function') {
        callback(valueScale);
      }
    }, false);
  };

})();
