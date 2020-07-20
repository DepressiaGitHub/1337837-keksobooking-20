'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var offers = [];

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element) {
      element.remove();
    });
  };

  var removeCards = function () {
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (element) {
      element.remove();
    });
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();
    var siteMap = document.querySelector('.map');
    var pinElement = document.querySelector('.map__pins');
    var cardElement = document.querySelector('.map__filters-container');

    removePins();
    removeCards();

    var takeNumber = data.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragmentCard.appendChild(window.card.renderCard(data[i]));
      fragment.appendChild(window.pin.renderPin(data[i]));
    }

    pinElement.appendChild(fragment);
    siteMap.insertBefore(fragmentCard, cardElement);
  };

  var successOffer = function (Cards) {
    offers = Cards;
    updateOffer(Cards);
  };

  var updateOffer = function (type) {
    var filtred = [];

    switch (type) {
      case 'any':
        filtred = offers.slice();
        break;
      case 'palace':
        filtred = offers.filter(function (el) {
          return el.offer.type === 'palace';
        });
        break;
      case 'flat':
        filtred = offers.filter(function (el) {
          return el.offer.type === 'flat';
        });
        break;
      case 'house':
        filtred = offers.filter(function (el) {
          return el.offer.type === 'house';
        });
        break;
      case 'bungalo':
        filtred = offers.filter(function (el) {
          return el.offer.type === 'bungalo';
        });
        break;
    }

    render(filtred);
  };

  window.backend.load(successOffer, window.util.errorMessage);

  var filters = document.querySelector('.map__filters');
  var houseType = filters.querySelector('#housing-type');

  houseType.addEventListener('change', function () {
    updateOffer(houseType.value);
    window.map.startMap();
  });

  window.render = {
    updateOffer: updateOffer
  };
})();
