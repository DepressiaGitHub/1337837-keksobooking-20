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

  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var inputAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainWidth = 65;
  var mapPinMainHeigth = 84;
  var mapPinMainPositionX = Math.floor(570 + mapPinMainWidth / 2);
  var mapPinMainPositionY = Math.floor(375 + mapPinMainHeigth);

  var mapPinMainMaxX = MAP_WIDTH - mapPinMainWidth / 2;
  var mapPinMainMinX = -mapPinMainWidth / 2;
  var mapPinMainMaxY = window.data.MAP_MAX_HEIGHT - mapPinMainHeigth;
  var mapPinMainMinY = window.data.MAP_MIN_HEIGHT - mapPinMainHeigth;

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

      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (moveEvt.clientY - 70) + 'px';
        mapPinMain.style.left = (moveEvt.clientX - 70) + 'px';

        if ((mapPinMain.offsetTop - shift.y) < mapPinMainMinY) {
          mapPinMain.style.top = mapPinMainMinY + 'px';
        } else if ((mapPinMain.offsetTop - shift.y) > mapPinMainMaxY) {
          mapPinMain.style.top = mapPinMainMaxY + 'px';
        }
        if ((mapPinMain.offsetLeft - shift.x) < mapPinMainMinX) {
          mapPinMain.style.left = mapPinMainMinX + 'px';
        } else if ((mapPinMain.offsetLeft - shift.x) > mapPinMainMaxX) {
          mapPinMain.style.left = mapPinMainMaxX + 'px';
        }

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

        newPosition();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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
