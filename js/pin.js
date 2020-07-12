'use strict';

(function () {
  var MAP_MIN_HEIGHT = 130;
  var MAP_MAX_HEIGHT = 630;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (data) {
    var offerPin = pinTemplate.cloneNode(true);

    offerPin.querySelector('img').src = data.author.avatar;
    offerPin.querySelector('img').alt = data.offer.title;
    offerPin.style.left = data.location.x + 'px';
    offerPin.style.top = data.location.y + 'px';
    return offerPin;
  };

  var inputAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainStartX = mapPinMain.style.left;
  var mapPinMainStartY = mapPinMain.style.top;
  var mapPinMainWidth = 60;
  var mapPinMainHeigth = 84;
  var mapPinMainPositionX = Math.floor(570 + mapPinMainWidth / 2);
  var mapPinMainPositionY = Math.floor(375 + mapPinMainHeigth);

  var newPosition = function () {
    mapPinMainPositionX = Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMainWidth / 2);
    mapPinMainPositionY = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeigth);
    inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;
  };

  inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var oneNew = document.querySelector('.map--faded');

      if (oneNew) {
        window.map.enableSite();
        window.map.startMap();

      }

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
        var mapPinMainMaxX = MAP_WIDTH - mapPinMainWidth / 2;
        var mapPinMainMinX = -mapPinMainWidth / 2;
        var mapPinMainMaxY = MAP_MAX_HEIGHT - mapPinMainHeigth;
        var mapPinMainMinY = MAP_MIN_HEIGHT - mapPinMainHeigth;
        var siteWidth = document.documentElement.clientWidth;
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mapPinMain.style.top = (moveEvt.clientY - 70 + pageYOffset) + 'px';
        mapPinMain.style.left = (moveEvt.clientX - (siteWidth - MAP_WIDTH) / 2 - mapPinMainWidth / 2) + 'px';

        var pinX = mapPinMain.offsetLeft - shift.x;
        var pinY = mapPinMain.offsetTop - shift.y;

        if (pinY < mapPinMainMinY) {
          mapPinMain.style.top = mapPinMainMinY + 'px';
        } else if (pinY > mapPinMainMaxY) {
          mapPinMain.style.top = mapPinMainMaxY + 'px';
        }
        if (pinX < mapPinMainMinX) {
          mapPinMain.style.left = mapPinMainMinX + 'px';
        } else if (pinX > mapPinMainMaxX) {
          mapPinMain.style.left = mapPinMainMaxX + 'px';
        }

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
      evt.preventDefault();

      var oneNew = document.querySelector('.map--faded');

      if (oneNew) {
        window.map.enableSite();
        window.map.startMap();
      }
    }
  });

  window.pin = {
    renderPin: renderPin,
    newPosition: newPosition,
    mapPinMainStartX: mapPinMainStartX,
    mapPinMainStartY: mapPinMainStartY
  };

})();
