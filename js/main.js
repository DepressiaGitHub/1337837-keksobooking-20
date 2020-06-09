'use strict';

var siteMap = document.querySelector('.map');
siteMap.classList.remove('map--faded');

var getRandom = function (start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);

  return Math.floor(Math.random() * (end - start + 1)) + start;
};

var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGTH = 630;
var AVATAR_LIST = [];
var TITLE_LIST = ['', '', '', ''];
var ADRESS_LIST = [];
var PRICE_LIST = getRandom(5000, 150000);
var TYPE_LIST = ['Palace', 'Flat', 'House', 'Bungalo'];
var ROOMS_LIST = getRandom(1, 5);
var GUESTS_LIST = getRandom(1, 10);
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DISCRIPTION_LIST = [];
var PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var POSITION_LIST = {
  x: getRandom((MARKER_WIDTH / 2), MAP_WIDTH - (MARKER_WIDTH / 2)),
  y: getRandom(MAP_MIN_HEIGHT, MAP_MAX_HEIGTH)
};
var MARKER_WIDTH = 65;
var MARKER_HEIGTH = 65 + 22;

for (var i = 0; i < 8; i++) {
  AVATAR_LIST[i] = 'img/avatars/user0' + (i + 1) + '.png'
  console.log(AVATAR_LIST[i]);
}

