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

  return newArr.slice(0, getRandom(0, newArr.length));
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
  var location = {
    x: getRandom(0, MAP_WIDTH) - (MARKER_WIDTH / 2) + 'px',
    y: getRandom(MAP_MIN_HEIGHT, MAP_MAX_HEIGTH) - (MARKER_HEIGTH) + 'px'
  };
  var offer = {
    title: getRandomElement(TITLE_LIST),
    address: parseInt(location.x, 10) + ', ' + parseInt(location.y, 10),
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


//  Находим блок map.
var siteMap = document.querySelector('.map');

// Находим темплейт для карточки с описанием.
var cardElement = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// Функция для проверки типа жилья.
var HOUSE_TYPES_MAP = {
  'Palace': 'Дворец',
  'Flat': 'Квартира',
  'House': 'Дом',
  'Bungalo': 'Бунгало'
};

var getHouseType = function (type) {
  return HOUSE_TYPES_MAP[type];
};

// Функции для правильного склонения "комнаты" и "гости".
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

// Функция для заполнения карточки с описанием.
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

var fragmentCard = document.createDocumentFragment();

//  Отрисовываем карточку на карте.
for (i = 0; i < randomOffer.length; i++) {
  fragmentCard.appendChild(renderCard(randomOffer[i]));
}

// Находим все fieldset и добавляем им аттрибут disabled.
var fieldsetList = document.querySelectorAll('fieldset');
var userForm = document.querySelector('.ad-form');
siteMap.classList.add('map--faded');
userForm.classList.add('ad-form--disabled');
for (i = 0; i < fieldsetList.length; i++) {
  fieldsetList[i].setAttribute('disabled', 'disabled');
}

// Находит основной маркер на экране и вводит сайт в активное состояние после ЛКМ.
var mapPinMain = document.querySelector('.map__pin--main');

var mapPinMainWidth = 65;
var mapPinMainHeigth = 84;

var mapPinMainPositionX = Math.floor(570 + mapPinMainWidth / 2);
var mapPinMainPositionY = Math.floor(375 + mapPinMainHeigth / 2);
var inputAddress = document.querySelector('#address');

inputAddress.setAttribute('disabled', 'disabled');

var enableSite = function () {
  siteMap.classList.remove('map--faded');
  userForm.classList.remove('ad-form--disabled');
  pinElement.appendChild(fragment);
  siteMap.insertBefore(fragmentCard, cardElement);

  for (i = 0; i < fieldsetList.length; i++) {
    fieldsetList[i].removeAttribute('disabled');
  }
  newPosition();
};

var newPosition = function () {
  mapPinMainPositionX = Math.floor(parseInt(mapPinMain.style.left, 10) + mapPinMainWidth / 2);
  mapPinMainPositionY = Math.floor(parseInt(mapPinMain.style.top, 10) + mapPinMainHeigth);
  inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;
};

inputAddress.value = mapPinMainPositionX + ', ' + mapPinMainPositionY;

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    enableSite();
    startMap();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    enableSite();
    startMap();
  }
});

// Валидация формы.
var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var BUNGALO_PRICE_MIN = 0;
var FLAT_PRICE_MIN = 1000;
var HOUSE_PRICE_MIN = 5000;
var PALACE_PRICE_MIN = 10000;
var userTitleInput = document.querySelector('#title');
var userPriceInput = document.querySelector('#price');
var userTypeOption = document.querySelector('#type');

userTitleInput.addEventListener('invalid', function () {
  if (userTitleInput.validity.tooShort) {
    userTitleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов.');
  } else if (userTitleInput.validity.tooLong) {
    userTitleInput.setCustomValidity('Заголовок должен состоять максимум из 100 символов.');
  } else if (userTitleInput.validity.valueMissing) {
    userTitleInput.setCustomValidity('Обязательное поле');
  } else {
    userTitleInput.setCustomValidity('');
  }
});

userTitleInput.addEventListener('input', function () {
  var valueLength = userTitleInput.value.length;

  if (valueLength < TITLE_MIN_LENGTH) {
    userTitleInput.setCustomValidity('Ещё ' + (TITLE_MIN_LENGTH - valueLength) + ' символов.');
  } else if (valueLength > TITLE_MAX_LENGTH) {
    userTitleInput.setCustomValidity('Удалите лишние ' + (valueLength - TITLE_MAX_LENGTH) + ' символов.');
  } else {
    userTitleInput.setCustomValidity('');
  }
});

var setPriceInputAttrs = function (priseMin) {
  userPriceInput.min = priseMin;
  PRICE_MIN = priseMin;
  userPriceInput.placeholder = priseMin;
};

userTypeOption.addEventListener('change', function () {
  switch (userTypeOption.value) {
    case 'bungalo':
      setPriceInputAttrs(BUNGALO_PRICE_MIN);
      break;
    case 'flat':
      setPriceInputAttrs(FLAT_PRICE_MIN);
      break;
    case 'house':
      setPriceInputAttrs(HOUSE_PRICE_MIN);
      break;
    case 'palace':
      setPriceInputAttrs(PALACE_PRICE_MIN);
      break;
  }
});

userPriceInput.addEventListener('input', function () {
  if (userPriceInput.value < PRICE_MIN) {
    userPriceInput.setCustomValidity('Давай дороже!');
  } else if (userPriceInput.value > PRICE_MAX) {
    userPriceInput.setCustomValidity('Ну это слишком дорого!');
  } else {
    userPriceInput.setCustomValidity('');
  }
});


var userTimeIn = document.querySelector('#timein');
var userTimeOut = document.querySelector('#timeout');

userTimeIn.addEventListener('change', function () {
  userTimeOut.value = userTimeIn.value;
});

userTimeOut.addEventListener('change', function () {
  userTimeIn.value = userTimeOut.value;
});

var userRooms = document.querySelector('#room_number');
var userGuests = document.querySelector('#capacity');
var userGuestsList = userGuests.querySelectorAll('option');

var userRoomsValues = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var availableRooms = function () {
  var userRoomValue = userRooms.value;
  var userGuestValues = userRoomsValues[userRoomValue];
  var isSelected = false;

  for (var j = 0; j < userGuestsList.length; j++) {
    userGuestsList[j].removeAttribute('selected');
  }

  for (j = 0; j < userGuestsList.length; j++) {
    var option = userGuestsList[j];

    if (userGuestValues.includes(option.value)) {
      option.removeAttribute('disabled');
      if (!isSelected) {
        option.setAttribute('selected', 'selected');
        isSelected = true;
      }
    } else {
      option.setAttribute('disabled', 'disabled');
    }
  }
};

availableRooms();
userRooms.addEventListener('change', availableRooms);


var startMap = function () {
  var buttonCloseCard = document.querySelectorAll('.popup__close');
  var buttonOpenCard = document.querySelectorAll('.map__pin');
  var openedCard = document.querySelectorAll('.map__card');

  var closeCardAll = function () {
    for (i = 0; i < openedCard.length; i++) {
      openedCard[i].setAttribute('style', 'display: none;');
    }
  };

  var showCard = function (pin, card) {
    pin.addEventListener('click', function () {
      closeCardAll();
      card.removeAttribute('style');
    });
  };

  for (i = 1; i < buttonOpenCard.length; i++) {
    showCard(buttonOpenCard[i], openedCard[i - 1]);
  }

  var closeCard = function (pin, card) {
    pin.addEventListener('click', function () {
      card.setAttribute('style', 'display: none;');
    });
  };

  for (i = 0; i < openedCard.length; i++) {
    closeCard(buttonCloseCard[i], openedCard[i]);
  }

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCardAll();
    }
  });
};
