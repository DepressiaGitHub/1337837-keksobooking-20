'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var fragmentCard = document.createDocumentFragment();

  var successCard = function (Cards) {
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

  var disableSite = function () {
    siteMap.classList.add('map--faded');
    userForm.classList.add('ad-form--disabled');
    mapPinMain.style.left = window.pin.mapPinMainStartX;
    mapPinMain.style.top = window.pin.mapPinMainStartY;
    clearCards();
    clearPins();
    userForm.reset();

    for (i = 0; i < fieldsetList.length; i++) {
      fieldsetList[i].setAttribute('disabled', 'disabled');
    }
  };

  var startMap = function () {
    var buttonCloseCard = document.querySelectorAll('.popup__close');
    var buttonOpenCard = document.querySelectorAll('.map__pin');
    var openedCard = document.querySelectorAll('.map__card');

    var closeCardsOnEsc = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();

        for (i = 0; i < openedCard.length; i++) {
          openedCard[i].setAttribute('style', 'display: none;');
        }
      }
    };

    var showCard = function (pin, card) {
      pin.addEventListener('click', function () {
        closeCardAll();
        card.removeAttribute('style');
      });

      document.addEventListener('keydown', closeCardsOnEsc);
    };

    for (i = 1; i < buttonOpenCard.length; i++) {
      showCard(buttonOpenCard[i], openedCard[i - 1]);
    }

    var closeCard = function (pin, card) {
      pin.addEventListener('click', function () {
        card.setAttribute('style', 'display: none;');
      });
    };

    var closeCardAll = function () {
      for (i = 0; i < openedCard.length; i++) {
        openedCard[i].setAttribute('style', 'display: none;');
      }
    };

    for (i = 0; i < openedCard.length; i++) {
      closeCard(buttonCloseCard[i], openedCard[i]);
    }
  };

  window.map = {
    enableSite: enableSite,
    disableSite: disableSite,
    startMap: startMap
  };
})();
