'use strict';

(function () {
  var pictures = [];
  var picturesBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template');
  var pictureContent = pictureTemplate.content.querySelector('.picture');
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var filtersBlock = document.querySelector('.filters');

  var getPictures = function (arr) {
    arr.forEach(function (picture) {
      var pictureElement = pictureContent.cloneNode(true);
      var imgPictureElement = pictureElement.children[0];
      var pictureLikes = pictureElement.querySelector('.picture-likes');
      var pictureComments = pictureElement.querySelector('.picture-comments');

      imgPictureElement.src = picture.url;
      pictureLikes.innerText = picture.likes;
      pictureComments.innerText = picture.comments.length;
      picturesBlock.appendChild(pictureElement);

      pictureElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.showGalery(picture);
      });
    });
  };

  var getRandomPicture = function (arr, count) {
    var copyArr = arr.slice(0);
    var newArr = [];
    for (var i = 0; i < count; i++) {
      var index = Math.floor(Math.random() * copyArr.length);
      newArr.push(copyArr[index]);
      copyArr.splice(index, 1);
    }
    return newArr;
  };

  var sortByComments = function (a, b) {
    return b.comments.length - a.comments.length;
  };

  var getSortedPictures = function (arr) {
    return arr.slice().sort(sortByComments);
  };

  var onLoad = function (xhr) {
    var target = xhr.target;
    pictures = target.response;


    getPictures(pictures);

    filtersBlock.classList.remove('hidden'); // в условии класс invisible, но в верстке вроде hidden

    filtersBlock.addEventListener('click', function (event) {
      if (event.target.tagName.toLowerCase() !== 'input') {
        return;
      }
      picturesBlock.innerHTML = '';
      switch (event.target.value) {
        case 'popular':
          getPictures(pictures);
          break;
        case 'new':
          getPictures(getRandomPicture(pictures, 10));
          break;
        case 'discussed':
          getPictures(getSortedPictures(pictures));
          break;
      }
    });
  };

  window.load(url, onLoad);

})();
