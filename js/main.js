'use strict';

//  Объявляем переменные.
var randomOffer = [];
var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGTH = 630;
var AVATAR_LIST = [];
var TITLE_LIST = [
  'Отличное жильё!',
  'Недорого и без тараканов!',
  'Дом, который сдаёт Джек!',
  'Нам не страшен серый Волк!'
];
var PRICE = {min: 5000, max: 150000};
var TYPE_LIST = ['Palace', 'Flat', 'House', 'Bungalo'];
var ROOMS = {min: 1, max: 5};
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
var MARKER_WIDTH = 50;
var MARKER_HEIGTH = 70;
var TOTAL_AMOUNT = 8;

//  Функция для случайных чисел от min до max включительно.
var getRandom = function (start, end) {
  start = Math.ceil(start);
  end = Math.floor(end);

  return Math.floor(Math.random() * (end - start + 1)) + start;
};

//  Функция для случайных элементов массива.
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// Функция для перемешивания массива.
var shuffleArray = function (arr) {
  var initIndex;
  var newArr = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    initIndex = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = initIndex;
    newArr.push(arr[i]);
  }
  return newArr;
};

//  Создаёт массив со случайным кол-вом элементов из данного массива.
var getRandomArray = function (arr) {
  var newArr = shuffleArray(arr);

  return newArr.slice(0, getRandom(1, newArr.length));
};

//  Цикл для создания списка аватарок.
for (var i = 0; i < TOTAL_AMOUNT; i++) {
  AVATAR_LIST[i] = 'img/avatars/user0' + (i + 1) + '.png';
}

// Мешаем массив с аватарками.
AVATAR_LIST = shuffleArray(AVATAR_LIST);

//  Функция для генерации случайных объявлений.
var getRandomHouse = function () {
  var author = {
    avatar: AVATAR_LIST.shift()
  };
  var offer = {
    title: getRandomElement(TITLE_LIST),
    address: getRandom(0, MAP_WIDTH) + ', ' + getRandom(MAP_MIN_HEIGHT, MAP_MAX_HEIGTH),
    price: getRandom(PRICE.min, PRICE.max),
    type: getRandomElement(TYPE_LIST),
    rooms: getRandom(ROOMS.min, ROOMS.max),
    guests: getRandom(GUESTS.min, GUESTS.max),
    checkin: getRandomElement(CHECKIN_LIST),
    checkout: getRandomElement(CHECKOUT_LIST),
    features: getRandomArray(shuffleArray(FEATURES_LIST)),
    description: DESCRIPTION,
    photos: getRandomArray(shuffleArray(PHOTOS_LIST))
  };
  var location = {
    x: getRandom(0, MAP_WIDTH) - (MARKER_WIDTH / 2) + 'px',
    y: getRandom(MAP_MIN_HEIGHT, MAP_MAX_HEIGTH) - (MARKER_HEIGTH) + 'px'
  };

  return {
    author,
    offer,
    location
  };
};

//  Цикл для заполнения массива случайных объявлений.
for (i = 0; i < TOTAL_AMOUNT; i++) {
  randomOffer[i] = getRandomHouse();
}

//  Отрисовываем метку на карте с автаром через scr и зоголовов в атрибуте alt
var pinElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renederPin = function (data) {
  var offerElement = pinTemplate.cloneNode(true);

  offerElement.querySelector('img').src = data.author.avatar;
  offerElement.querySelector('img').alt = data.offer.title;
  offerElement.style.left = data.location.x;
  offerElement.style.top = data.location.y;
  return offerElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < randomOffer.length; i++) {
  fragment.appendChild(renederPin(randomOffer[i]));
}

pinElement.appendChild(fragment);

//  Находим блок map и показываем его.
var siteMap = document.querySelector('.map');
siteMap.classList.remove('map--faded');
