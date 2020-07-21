'use strict';

(function () {

  var siteMap = document.querySelector('.map');
  var pinElement = document.querySelector('.map__pins');

  var clearPins = function () {
    var allPins = pinElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].classList.add('hidden');
    }
  };

  var fieldsetList = document.querySelectorAll('fieldset');
  var userForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');

  siteMap.classList.add('map--faded');
  userForm.classList.add('ad-form--disabled');

  for (var i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].setAttribute('disabled', 'disabled');
  }

  var enableSite = function () {
    siteMap.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    pinElement = document.querySelector('.map__pins');

    for (i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].removeAttribute('disabled');
    }

    var filters = document.querySelector('.map__filters');
    var houseType = filters.querySelector('#housing-type');
    window.render.updateOffer(houseType.value);

    window.pin.newPosition();
  };

  var resetButton = userForm.querySelector('.ad-form__reset');
  var onResetClick = function (evt) {
    evt.preventDefault();
    userForm.reset();
    mapPinMain.style.left = window.pin.mapPinMainStartX;
    mapPinMain.style.top = window.pin.mapPinMainStartY;
    window.pin.newPosition();
  };

  resetButton.addEventListener('click', onResetClick);

  var openedCard;

  var closeCardsOnEsc = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCardAll();
    }
  };

  var closeCardAll = function () {
    for (i = 0; i < openedCard.length; i++) {
      openedCard[i].classList.add('hidden');
    }

    document.removeEventListener('keydown', closeCardsOnEsc);
  };

  var disableSite = function () {
    siteMap.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = window.pin.mapPinMainStartX;
    mapPinMain.style.top = window.pin.mapPinMainStartY;
    closeCardAll();
    clearPins();
    userForm.reset();
    window.pin.newPosition();

    for (i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].setAttribute('disabled', 'disabled');
    }

    closeCardAll();
  };

  var startMap = function () {
    var buttonCloseCard = document.querySelectorAll('.popup__close');
    var buttonOpenCard = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    openedCard = document.querySelectorAll('.map__card');

    var showCard = function (card) {
      closeCardAll();
      card.classList.remove('hidden');

      document.addEventListener('keydown', closeCardsOnEsc);
    };

    var addPinClickOpen = function (button, card) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        showCard(card);
      });
    };

    for (i = 0; i < buttonOpenCard.length; i++) {
      addPinClickOpen(buttonOpenCard[i], openedCard[i]);
    }

    var addPinClickClose = function (button) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        closeCardAll();
      });
    };

    for (i = 0; i < buttonCloseCard.length; i++) {
      addPinClickClose(buttonCloseCard[i]);
    }
  };

  window.map = {
    enableSite: enableSite,
    disableSite: disableSite,
    startMap: startMap
  };
})();
