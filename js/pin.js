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

  var inputAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainWidth = 65;
  var mapPinMainHeigth = 84;
  var mapPinMainPositionX = Math.floor(570 + mapPinMainWidth / 2);
  var mapPinMainPositionY = Math.floor(375 + mapPinMainHeigth / 2);

  var newPosition = function () {
    mapPinMainPositionX = Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMainWidth / 2);
    mapPinMainPositionY = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeigth);
    inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;
  };

  inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.enableSite();
      window.map.startMap();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.enableSite();
      window.map.startMap();
    }
  });

  window.pin = {
    renderPin: renderPin,
    newPosition: newPosition
  };

})();
