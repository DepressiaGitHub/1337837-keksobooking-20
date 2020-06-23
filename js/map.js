'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.randomOffer.length; i++) {
    fragment.appendChild(window.pin.renderPin(window.data.randomOffer[i]));
  }

  var fragmentCard = document.createDocumentFragment();
  for (i = 0; i < window.data.randomOffer.length; i++) {
    fragmentCard.appendChild(window.card.renderCard(window.data.randomOffer[i]));
  }

  var fieldsetList = document.querySelectorAll('fieldset');
  var userForm = document.querySelector('.ad-form');
  var siteMap = document.querySelector('.map');
  var pinElement = document.querySelector('.map__pins');
  var cardElement = document.querySelector('.map__filters-container');
  var inputAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var mapPinMainWidth = 65;
  var mapPinMainHeigth = 84;
  var mapPinMainPositionX = Math.floor(570 + mapPinMainWidth / 2);
  var mapPinMainPositionY = Math.floor(375 + mapPinMainHeigth / 2);

  siteMap.classList.add('map--faded');
  userForm.classList.add('ad-form--disabled');

  for (i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].setAttribute('disabled', 'disabled');
  }

  var enableSite = function () {
    siteMap.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    pinElement.appendChild(fragment);
    siteMap.insertBefore(fragmentCard, cardElement);

    for (i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].removeAttribute('disabled');
    }
    newPosition();
  };

  var newPosition = function () {
    mapPinMainPositionX = Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMainWidth / 2);
    mapPinMainPositionY = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeigth);
    inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;
  };

  inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      enableSite();
      startMap();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      enableSite();
      startMap();
    }
  });

  var startMap = function () {
    var buttonCloseCard = document.querySelectorAll('.popup__close');
    var buttonOpenCard = document.querySelectorAll('.map__pin');
    var openedCard = document.querySelectorAll('.map__card');

    var closeCardAll = function () {
      for (i = 0; i < openedCard.length; i++) {
        openedCard[i].setAttribute('style', 'display: none;');
      }
    };

    var showCard = function (pin, card) {
      pin.addEventListener('click', function () {
        closeCardAll();
        card.removeAttribute('style');
      });
    };

    for (i = 1; i < buttonOpenCard.length; i++) {
      showCard(buttonOpenCard[i], openedCard[i - 1]);
    }

    var closeCard = function (pin, card) {
      pin.addEventListener('click', function () {
        card.setAttribute('style', 'display: none;');
      });
    };

    for (i = 0; i < openedCard.length; i++) {
      closeCard(buttonCloseCard[i], openedCard[i]);
    }

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCardAll();
      }
    });
  };
})();
