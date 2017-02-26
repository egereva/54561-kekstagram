'use strict';

window.load = (function () {

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', onLoad);
    xhr.responseType = 'json';
    xhr.send();
  };
})();
