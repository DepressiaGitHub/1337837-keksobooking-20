'use strict';

(function () {
  var cardElement = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var HOUSE_TYPES_MAP = {
    'Palace': 'Дворец',
    'Flat': 'Квартира',
    'House': 'Дом',
    'Bungalo': 'Бунгало'
  };

  var getHouseType = function (type) {
    return HOUSE_TYPES_MAP[type];
  };

  var getTextAboutRooms = function (rooms, guests) {
    var text = '';
    if (rooms === 1 || rooms % 10 === 1 && rooms % 100 !== 11) {
      text += rooms + ' комната для ';
    } else if (rooms % 10 < 5 && rooms % 10 > 0 && rooms % 100 > 21 || rooms % 10 < 5 && rooms % 100 < 5 && rooms % 10 > 0) {
      text += rooms + ' комнаты для ';
    } else {
      text += rooms + ' комнат для ';
    }
    switch (guests) {
      case 1:
        text += guests + ' гостя';
        break;
      default:
        text += guests + ' гостей';
    }

    return text;
  };


  var renderCard = function (data) {
    var mapCardElement = cardTemplate.cloneNode(true);
    var photosLength = data.offer.photos.length;
    var photoBlock = mapCardElement.querySelector('.popup__photos');
    var photoElement = mapCardElement.querySelector('.popup__photos')
      .querySelector('.popup__photo');

    mapCardElement.setAttribute('style', 'display: none;');
    mapCardElement.querySelector('.popup__title').textContent = data.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = getHouseType(data.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = getTextAboutRooms(data.offer.rooms, data.offer.guests);
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    mapCardElement.querySelector('.popup__features').textContent = data.offer.features.join(', ');
    mapCardElement.querySelector('.popup__description').textContent = data.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = data.author.avatar;

    if (photosLength > 0) {
      photoElement.src = data.offer.photos[0];
      for (var j = 1; j < photosLength; j++) {
        var photoElementTemplate = photoElement.cloneNode(true);
        photoElementTemplate.src = data.offer.photos[j];
        photoBlock.appendChild(photoElementTemplate);
      }
    } else {
      photoElement.style = 'display: none';
    }

    return mapCardElement;
  };

  window.card = {
    renderCard: renderCard
  }
})();
