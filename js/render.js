'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var ANY = 'any';
  var offers = [];


  var removePins = function () {
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
      el.remove();
    });
  };

  var removeCards = function () {
    document.querySelectorAll('.map__card').forEach(function (el) {
      el.remove();
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
    updateOffer(offers);
  };

  var getFilteredByType = function (el) {
    return el.offer.type === houseType.value;
  };

  var updateOffer = function () {
    var filtered = offers.slice();

    if (houseType.value !== ANY) {
      filtered = filtered.filter(getFilteredByType);
    }

    render(filtered);
  };

  window.backend.load(successOffer, window.util.errorMessage);

  var filters = document.querySelector('.map__filters');
  var houseType = filters.querySelector('#housing-type');

  filters.addEventListener('change', function () {
    updateOffer();
    window.map.startMap();
  });
})();

