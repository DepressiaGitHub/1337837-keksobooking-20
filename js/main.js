'use strict';

var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
var MAP_MIN_HEIGHT = 130;
var MAP_MAX_HEIGTH = 630;
var MARKER_WIDTH = 50;
var MARKER_HEIGTH = 70;
var TOTAL_AMOUNT = 8;

var mapPinMain = document.querySelector('.map__pin--main');

var mapPinMainWidth = 65;
var mapPinMainHeigth = 84;

var mapPinMainPositionX = Math.floor(570 + mapPinMainWidth / 2);
var mapPinMainPositionY = Math.floor(375 + mapPinMainHeigth / 2);
