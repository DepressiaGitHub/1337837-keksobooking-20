'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var fragmentCard = document.createDocumentFragment();

  var successCard = function (Cards) {
    fragmentCard.innerHTML = '';
    fragment.innerHTML = '';
    for (var i = 0; i < Cards.length; i++) {
      fragmentCard.appendChild(window.card.renderCard(Cards[i]));
      fragment.appendChild(window.pin.renderPin(Cards[i]));
    }
  };

  window.backend.load(successCard, window.util.errorMessage);

  var clearCards = function () {
    var allCards = siteMap.querySelectorAll('.map__card');

    for (var i = 0; i < allCards.length; i++) {
      siteMap.removeChild(allCards[i]);
    }
  };

  var clearPins = function () {
    var allPins = pinElement.querySelectorAll('.map__pin');

    for (var i = 1; i < allPins.length; i++) {
      pinElement.removeChild(allPins[i]);
    }
  };

  var fieldsetList = document.querySelectorAll('fieldset');
  var userForm = document.querySelector('.ad-form');
  var siteMap = document.querySelector('.map');
  var pinElement = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var cardElement = document.querySelector('.map__filters-container');

  siteMap.classList.add('map--faded');
  userForm.classList.add('ad-form--disabled');

  for (var i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].setAttribute('disabled', 'disabled');
  }

  var enableSite = function () {
    window.backend.load(successCard, window.util.errorMessage);

    siteMap.classList.remove('map--faded');
    userForm.classList.remove('ad-form--disabled');
    pinElement.appendChild(fragment);
    siteMap.insertBefore(fragmentCard, cardElement);

    for (i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].removeAttribute('disabled');
    }

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
      openedCard[i].setAttribute('style', 'display: none;');
    }

    document.removeEventListener('keydown', closeCardsOnEsc);
  };

  var disableSite = function () {
    siteMap.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = window.pin.mapPinMainStartX;
    mapPinMain.style.top = window.pin.mapPinMainStartY;
    clearCards();
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
    var buttonOpenCard = document.querySelectorAll('.map__pin');
    openedCard = document.querySelectorAll('.map__card');

    var showCard = function (card) {
      closeCardAll();
      card.removeAttribute('style');

      document.addEventListener('keydown', closeCardsOnEsc);
    };

    var addPinClickOpen = function (button, card) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        showCard(card);
      });
    };

    for (i = 1; i < buttonOpenCard.length; i++) {
      addPinClickOpen(buttonOpenCard[i], openedCard[i - 1]);
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
