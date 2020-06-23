'use strict';

(function () {
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
  var inputAddress = document.querySelector('#address');

  inputAddress.setAttribute('disabled', 'disabled');

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
})();