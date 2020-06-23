'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (data) {
    var offerElement = pinTemplate.cloneNode(true);

    offerElement.querySelector('img').src = data.author.avatar;
    offerElement.querySelector('img').alt = data.offer.title;
    offerElement.style.left = data.location.x;
    offerElement.style.top = data.location.y;
    return offerElement;
  };

  window.pin = {
    renderPin: renderPin
  };

})();
