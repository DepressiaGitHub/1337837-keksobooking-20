'use strict';

(function () {
  window.util = {
    getRandom: function (start, end) {
      start = Math.ceil(start);
      end = Math.floor(end);

      return Math.floor(Math.random() * (end - start + 1)) + start;
    },

    getRandomElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },

    shuffleArray: function (arr) {
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
    },

    getRandomArray: function (arr) {
      var newArr = window.util.shuffleArray(arr);

      return newArr.slice(0, window.util.getRandom(0, newArr.length));
    },

    errorMessage: function (errorMessage) {
      var alert = document.getElementById('error-block');

      if (alert) {
        node.textContent = errorMessage;
      } else {
        var node = document.createElement('div');
        node.style = 'display: block; z-index: 9999; margin: 0 auto; text-align: center; color: white; background-color: gray;';
        node.style.position = 'fixed';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '40px';
        node.id = 'error-block';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      }
    }
  };
})();
