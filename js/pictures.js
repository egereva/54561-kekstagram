'use strict';

(function () {
  var pictures = [];
  var picturesBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template');
  var pictureContent = pictureTemplate.content.querySelector('.picture');
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  var onLoad = function (xhr) {
    var target = xhr.target;
    pictures = target.response;

    if (target.status !== 200) {
      document.write(target.status + ': ' + target.statusText);
      return;
    }

    pictures.forEach(function (picture) {
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

  window.load(url, onLoad);

})();
