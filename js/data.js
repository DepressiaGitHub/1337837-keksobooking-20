'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var MAP_MIN_HEIGHT = 130;
  var MAP_MAX_HEIGTH = 630;
  var MARKER_WIDTH = 50;
  var MARKER_HEIGTH = 70;
  var randomOffer = [];
  var AVATAR_LIST = [];
  var TOTAL_AMOUNT = 8;
  var TITLE_LIST = [
    'Отличное жильё!',
    'Недорого и без тараканов!',
    'Дом, который сдаёт Джек!',
    'Нам не страшен серый Волк!'
  ];
  var PRICE = {min: 2000, max: 15000};
  var TYPE_LIST = ['Palace', 'Flat', 'House', 'Bungalo'];
  var ROOMS = {min: 1, max: 121};
  var GUESTS = {min: 1, max: 10};
  var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
  var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = 'Любой каприз за ваши шекели!';
  var PHOTOS_LIST = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  for (var i = 0; i < TOTAL_AMOUNT; i++) {
    AVATAR_LIST[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }

  AVATAR_LIST = window.util.shuffleArray(AVATAR_LIST);

  var getRandomHouse = function () {
    var author = {
      avatar: AVATAR_LIST.shift()
    };
    var location = {
      x: window.util.getRandom(0, MAP_WIDTH) - (MARKER_WIDTH / 2) + 'px',
      y: window.util.getRandom(MAP_MIN_HEIGHT, MAP_MAX_HEIGTH) - (MARKER_HEIGTH) + 'px'
    };
    var offer = {
      title: window.util.getRandomElement(TITLE_LIST),
      address: parseInt(location.x, 10) + ', ' + parseInt(location.y, 10),
      price: window.util.getRandom(PRICE.min, PRICE.max),
      type: window.util.getRandomElement(TYPE_LIST),
      rooms: window.util.getRandom(ROOMS.min, ROOMS.max),
      guests: window.util.getRandom(GUESTS.min, GUESTS.max),
      checkin: window.util.getRandomElement(CHECKIN_LIST),
      checkout: window.util.getRandomElement(CHECKOUT_LIST),
      features: window.util.getRandomArray(window.util.shuffleArray(FEATURES_LIST)),
      description: DESCRIPTION,
      photos: window.util.getRandomArray(window.util.shuffleArray(PHOTOS_LIST))
    };

    return {
      author: author,
      offer: offer,
      location: location
    };
  };

  for (i = 0; i < TOTAL_AMOUNT; i++) {
    randomOffer[i] = getRandomHouse();
  }

  window.data = {
    randomOffer: randomOffer
  };
})();
