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
var FEATURES_LIST = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
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
  var tempValue;
  var newArr = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    tempValue = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = tempValue;
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
    author: author,
    offer: offer,
    location: location
  };
};

//  Цикл для заполнения массива случайных объявлений.
for (i = 0; i < TOTAL_AMOUNT; i++) {
  randomOffer[i] = getRandomHouse();
}

// Находим темплейт для маркера.
var pinElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Функция для заполнения маркера.
var renderPin = function (data) {
  var offerElement = pinTemplate.cloneNode(true);

  offerElement.querySelector('img').src = data.author.avatar;
  offerElement.querySelector('img').alt = data.offer.title;
  offerElement.style.left = data.location.x;
  offerElement.style.top = data.location.y;
  return offerElement;
};

var fragment = document.createDocumentFragment();

//  Отрисовываем маркер на карте.
for (i = 0; i < randomOffer.length; i++) {
  fragment.appendChild(renderPin(randomOffer[i]));
}

pinElement.appendChild(fragment);

//  Находим блок map и показываем его.
var siteMap = document.querySelector('.map');
siteMap.classList.remove('map--faded');

// Находим темплейт для карточки с описанием.
var cardElement = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// Функция для проверки типа жилья.
var getCheckType = function (type) {
  if (type === 'Palace') {
    return 'Дворец';
  }
  if (type === 'Flat') {
    return 'Квартира'
  }
  if (type === 'House') {
    return 'Дом'
  }
  if (type === 'Bungalo') {
    return 'Бунгало'
  }
};

// Функция для заполнения карточки с описанием.
var renderCard = function (data) {
  var mapCardElement = cardTemplate.cloneNode(true);
  var photosLength = data.offer.photos.length;
  var photoBlock = mapCardElement.querySelector('.popup__photos');
  var photoElement = mapCardElement.querySelector('.popup__photos')
    .querySelector('.popup__photo');

  mapCardElement.querySelector('.popup__title').textContent = data.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = getCheckType(data.offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests;
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  mapCardElement.querySelector('.popup__features').textContent = data.offer.features;
  mapCardElement.querySelector('.popup__description').textContent = data.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = data.author.avatar;

  photoElement.src = data.offer.photos[0];
  if (photosLength > 1) {
    for (var j = 1; j < photosLength; j++) {
      var photoElementTemplate = photoElement.cloneNode(true);
      photoElementTemplate.src = data.offer.photos[j];
      photoBlock.appendChild(photoElementTemplate);
    }
  }

  return mapCardElement;
};

var fragmentCard = document.createDocumentFragment();

//  Отрисовываем карточку на карте.
for (i = 0; i < randomOffer.length; i++) {
  fragmentCard.appendChild(renderCard(randomOffer[i]));
}

siteMap.insertBefore(fragmentCard, cardElement);
