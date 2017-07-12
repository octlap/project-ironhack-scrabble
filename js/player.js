function Player(name, n) {

  //Player has a name
  this.name = name;
  this.n = n; // player 1 or player 2

  //Player has a tray to store his tiles - 7 slots
  this.tray = [];

  // game stats
  this.score = 0;
  this.turnsPlayed = 0;
  this.lettersPlaced = 0;

}


// Player has a function that loads newly drawn tiles to her/his tray
Player.prototype.loadTiles = function (tiles) {
  for (var i = 0; i < tiles.length; i++) { this.tray.push(tiles[i]); }
  this.render();
}

// Player has a function that draws a tile from her/his tray when it is player
Player.prototype.drawTile = function(index) {
  var drawnTile = this.tray.splice(index, 1)[0];
  this.render();
  return drawnTile;
}

//Player has a render function that
Player.prototype.render = function () {

  //render tray
  for (var i = 0; i < 7; i++) {
    if (this.tray[i] !== undefined) {
      // if there is tile, then add it and add "with tile" class
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ')' ).html(this.tray[i].letter);
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ')' ).addClass('with-tile');
    } else {
      //if not clear html and remove "with tile" class
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ')' ).html('');
      $('#player-' + this.n + '-tray :nth-child(' + (i+1) + ')' ).removeClass('with-tile');

    }
  }

  //render score + stats
  $('#player-' + this.n + '-score').html(this.score);
  $('#player-' + this.n + '-score').html(this.turnsPlayed);


};
