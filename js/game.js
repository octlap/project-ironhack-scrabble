
//On load, hide certain items
$('#user-input').hide(); // hide user input, score-box and controls on first render
$('.score-box').hide(); $('.player-name').hide();
$('.controls').hide(); $('.tray').hide();
$('.tile-deck').hide();
$('#message').html('Click on ' + '<i class="fa fa-star" aria-hidden="true"></i>' + ' to get started');

var gameOn = false;

//
$(document).ready(function(){


  $('.center').click( function (e) {

    if (!gameOn) {
      gameOn = true;
      $('#message').html('Hello!');
      setTimeout( function() {
        var game = new Game();
        game.runGame();
      }, 600);
    }
  });

});


function Game() {

    // initiate key elements
    this.board  = new Board(2);
    this.bag = new Bag('en');
    this.players = [];
    this.status = 'setup';
    this.turn = 0;
    this.whosTurn;
    this.wordOnDeck = {
      tiles: [],
      positions: []
    };

}

Game.prototype.runGame = function () {

  switch(this.status) {

    case 'setup':
    setTimeout(this.setupGame(), 500);
    break;

    case 'begin':
    setTimeout(this.beginGame(), 500);
    break;

    case 'switching-turns':
    setTimeout(this.runTurn(), 500)
    break;

    case 'verifying-word':
    $('#message').html('Verifying word...<br><br><i class="fa fa-clock-o" aria-hidden="true"></i>');

    break;


  }




};


// Game has a method to setup game, i.e. collect
Game.prototype.setupGame = function() {

    $('#message').html('What is Player 1\'s name please?' );
    $('#user-input').show();
    var that = this;

    $('#user-input').keypress( function(e) {

      if ($('#user-input').val() !== '' && e.which == 13) {

        // player number
        var n = that.players.length + 1;

        //store player's name
        that.players.push( new Player( $('#user-input').val(), n ) );

        // Display player's name
        $('.player-name.player-' + (that.players.length) ).html(_.last(that.players).name);
        $('.player-name.player-' + (that.players.length) ).show();
        $('#user-input').val(''); $('#user-input').hide(); // reset input

        if (that.players.length == 1) { // if only player already entered, ask for player 2's name
          $('#message').html('What is Player 2\'s name please?' );
          $('#user-input').show();

        } else { // else start game!
          $('#message').html('LET\'S PLAY SCRABBLE!!!' );
          that.status = 'begin'; that.runGame();
        }
      }
    });
}

// Game has a method that initiate
Game.prototype.beginGame = function () {

  //render board
  this.board.render();

  // Shuffle tiles
  $('#message').html('Shuffling tiles in the bag...<br><br><i class="fa fa-clock-o" aria-hidden="true"></i>');
  this.bag.shuffleTiles();

  // update game status
  this.status = 'switching-turns';

  // show player areas and return to run game
  var that = this;
  setTimeout( function() {
    $('.tray').show();
    $('.tile-deck').show();
    that.runGame()
  }, 500);

};


//Game has a function to distribute tiles to a player ( n= 1 or 2)
Game.prototype.distributeTiles = function (thisPlayer) {

  var i = _.findIndex(this.players, thisPlayer);

  // load as many tiles from bag as there are empty spaces in the players tray
  var tileNum = 7 - this.players[i].tray.length;
  this.players[i].loadTiles( this.bag.drawTiles(tileNum) );

  // render player with a slight delay
  setTimeout(this.players[i].render(), 300);

};


// Game has a method that runs a turn in the the game
Game.prototype.runTurn = function () {

  if (this.turn == 0) {

    // special case if first turn, by default player 1 plays first
    this.turn += 1;
    this.whosTurn = this.players[0];
    $('#message').html('Distributing tiles...<br><br><i class="fa fa-clock-o" aria-hidden="true"></i>');
    var that = this;
    setTimeout(function() {
      that.distributeTiles(that.players[0]);
      that.distributeTiles(that.players[1]);
      $('.score-box').show();
      $('.player-1-controls').show(); //Update to integrate change first player
      $('#message').html(that.players[0].name + '\'s turn to play<br><br><i class="fa fa-chevron-left" aria-hidden="true"></i>');
      that.receiveInput(that.players[0]);
    }, 300);
  } else {
    this.turn +=1
    //general case HERE, generalize from above
  }


};

//Game has a method to receive an input from a designated player
Game.prototype.receiveInput = function (player) {

  var selectedTile = null;
  var that = this;


  // Event listener for clicking on a tile given player's tray, if
  // if it's given player's turn
  // tray square contains a tile
  // user has not already selected a tile

  // => adds tile to selectedTile, clears tray object, renders tray

  $('.tray-square.player-' +  player.n).click( function(e) {

    var n = e.currentTarget.className.includes('player-1') ? 1:2;

    if (that.whosTurn.n == 1 && // if it's given player's turn
        e.currentTarget.className.includes('with-tile') && // tray square contains a tile
        selectedTile == null) { // user has not already selected a tile

      selectedTile = player.drawTile( $(e.currentTarget).index() ); //draws tile from player and loads to selectedTile
      $('.tile-deck.player-' +  player.n).html(selectedTile.letter);
      $('.tile-deck.player-' +  player.n).addClass('with-tile');
      var test = 0;
    }
  });


  // Event listener for clicking on a tile given player's tray, if
  // user has already selected a tile
  // target square on board is empty

  // => unloads tile from selectedTile (back to null), adds tiles to board object

  $('.square').click( function(e) {

    if (selectedTile !== null && // user has already selected a tile
        !e.currentTarget.className.includes('with-tile') ) // target square on board is empty

      var i = $(e.currentTarget.parentElement).index(); // i coordinate of selected tile
      var j = $(e.currentTarget).index() // j coordinate of selected tile

      $(e.currentTarget).html(selectedTile.letter); // adds letter square
      $(e.currentTarget).addClass('with-tile'); // adds the with tile styling
      $('.tile-deck.player-' +  player.n).html(''); //reset tile-deck
      $('.tile-deck.player-' +  player.n).removeClass('with-tile');


      that.wordOnDeck.tiles.push(selectedTile); // load tile and positions to word on deck
      that.wordOnDeck.positions.push( {i: i, j:j});

      selectedTile = null; // clear selected tile

  });


  //Event listener on Submit button
  // ==> updates game status to verify input, goes to run game
  $('.submit.player-' +  player.n).click( function(e) {

    that.status = 'verifying-word';
    that.runGame();


  });





  //Event listner on Delete button
  // ==> clears all newly placed tiles, clears word on deck, places them back in tray  (NICE TO HAVE)
  $('.delete.player-' +  player.n).click( function(e) {


    if (selectedTile == null) { // after placing a letter
      player.loadTiles(that.wordOnDeck.tiles); // places tiles back in tray and renders board
      that.board.render();
      that.wordOnDeck = { //resets word on deck
        tiles: [],
        positions: []
      };

    } else { // mid placing a letter
      $('.tile-deck.player-' +  player.n).html(''); //reset tile-deck
      $('.tile-deck.player-' +  player.n).removeClass('with-tile');
      player.loadTiles([selectedTile]);
      selectedTile = null;
    }

  });


};


















////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/////// TESTS /////////////

// board.grid[7][6] = {letter: 'O', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[7][7] = {letter: 'C', points: 3, placedBy: '', turnPlaced: 0};
// board.grid[7][8] = {letter: 'T', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[7][9] = {letter: 'A', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[7][10] = {letter: 'V', points: 4, placedBy: '', turnPlaced: 0};
// board.grid[7][11] = {letter: 'E', points: 1, placedBy: '', turnPlaced: 0};
//
//
// board.grid[2][9] = {letter: 'I', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[3][9] = {letter: 'R', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[4][9] = {letter: 'O', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[5][9] = {letter: 'N', points: 1, placedBy: '', turnPlaced: 0};
// board.grid[6][9] = {letter: 'H', points: 4, placedBy: '', turnPlaced: 0};
// // board.grid[7][9] = 'A';
// board.grid[8][9] = {letter: 'C', points: 3, placedBy: '', turnPlaced: 0};
// board.grid[9][9] = {letter: 'K', points: 5, placedBy: '', turnPlaced: 0};
//
// // board.printBoard();
//
// // vertical test
// var testWord = [
//   {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
//   {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
//   {letter: 'S', points: 1, placedBy: '', turnPlaced: null}
// ];
//
// var testPositions = [
//   {i: 10, j: 9},
//   {i: 11, j: 9},
//   {i: 12, j: 9}
// ];``

// horizontal test
// var testWord = [
//   {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
//   {letter: 'S', points: 1, placedBy: '', turnPlaced: null}
// ];
//
// var testPositions = [
//   {i: 7, j: 12},
//   {i: 7, j: 13}
// ];


//

// var points = board.play(testWord, testPositions, 1);
