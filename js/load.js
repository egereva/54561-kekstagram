'use strict';

window.load = (function () {

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 200 && event.target.status < 300) {
        onLoad(evt.target.response);
      }
    });
    xhr.responseType = 'json';
    xhr.send();
  };
})();
