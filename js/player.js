function Player(name, n, side) {

  //Player has a name
  this.name = name;
  this.n = n; // player 1 or player 2

  //Player has a tray to store his tiles - 7 slots
  this.tray = [];

  // game stats
  this.score = 0;
  this.turnsPlayed = 0;
  this.tilesPlayed = 0;

  // side on board
  this.side = side;

}


// Player has a function that loads newly drawn tiles to her/his tray
Player.prototype.loadTiles = function (tiles) {
  for (var i = 0; i < tiles.length; i++) { this.tray.push(tiles[i]); }
  this.renderTray();
}

// Player has a function that draws a tile from her/his tray when it is player
Player.prototype.drawTile = function(index) {
  var drawnTile = this.tray.splice(index, 1)[0];
  this.renderTray();
  return drawnTile;
}

// Player has a method that updates the score
Player.prototype.updateScore = function (points, tilesPlayed) {
  this.score += points;
  this.turnsPlayed += 1;
  this.tilesPlayed += tilesPlayed;
  this.renderStats();
};

//Player has a render function that renders tray
Player.prototype.renderTray = function () {

  //render tray
  for (var i = 0; i < 7; i++) {
    if (this.tray[i] !== undefined) {
      // if there is tile, then add it and add "with tile" class
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ')' ).addClass('with-tile');
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ') .letter' ).html(this.tray[i].letter);
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ') .points' ).html(this.tray[i].points);
    } else {
      //if not clear html and remove "with tile" class
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ')' ).removeClass('with-tile');
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ') .letter' ).html('');
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ') .points' ).html('');


    }
  }

};

//Player has a render function that renders stats
Player.prototype.renderStats = function () {
  //render score + stats
  $('#player-' + this.n + '-score').html(this.score);
  $('#player-' + this.n + '-turns').html(this.turnsPlayed);
};
