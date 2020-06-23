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
    }
  };
})();
