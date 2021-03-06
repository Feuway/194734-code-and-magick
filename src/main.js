'use strict';

var form = require('./form');
var Game = require('./game');
var reviews = require('./reviews');
var load = require('./load');

var Gallery = require('./gallery');

var gallery = new Gallery('.photogallery');
gallery.init();

reviews(load);

(function() {
  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);

  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();

    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };

  form.onClose = function() {
    game.setDeactivated(false);
  };
})();



