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
    this.whoseTurn = null;
    this.selectedTile = null;
    this.wordOnDeck = {
      tiles: [],
      positions: [],
      wordsToScore: [],
      direction: null,
      mainFirst: null, // first letter of main word
      mainLast: null, // first letter of main word
      hookWords: null
    };

    this.playerOrder = ['left', 'right'];

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
    setTimeout(this.switchTurns(), 500);
    break;

    case 'awaiting-input':
    this.receiveInput();
    break;

    case 'validating-play':
    $('#message').html('Verifying word...<br><br><i class="fa fa-clock-o" aria-hidden="true"></i>');
    setTimeout(this.validatePlay(), 500);
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
        that.players.push( new Player( $('#user-input').val(), n, that.playerOrder[n-1] ) );

        // Display player's name
        $('.player-name.player-' + (that.players.length) ).html(_.last(that.players).name);
        $('.player-name.player-' + (that.players.length) ).show();
        $('#user-input').val(''); $('#user-input').hide(); // reset input

        if (that.players.length == 1) { // if only player already entered, ask for player 2's name
          $('#message').html('What is Player 2\'s name please?' );
          $('#user-input').show();

        } else { // else start game!
          $('#message').html('LET\'S PLAY SCRABBLE!!!' );
          that.status = 'begin';
          that.runGame();
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

  // Determine who begins -- for now player 1 by default
  this.whoseTurn = 0; // Player 1 by default

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
  setTimeout(this.players[i].renderTray(), 300);

};


// Game has a method that runs a turn in the the game
Game.prototype.switchTurns = function () {

  var that = this;

  if (this.turn == 0) {

    // special case if first turn, by default player 1 plays first
    this.turn += 1;
    $('#message').html('Distributing tiles...<br><br><i class="fa fa-clock-o" aria-hidden="true"></i>');
    setTimeout(function() {
      that.distributeTiles(that.players[0]);
      that.distributeTiles(that.players[1]);
      $('.score-box').show();
      $('.controls.player-' + that.players[that.whoseTurn].n ).show(); //Update to integrate change first player
      // $('#message').html(that.players[that.players[that.whoseTurn]].name + '\'s turn to play<br><br><i class="fa fa-chevron-' + that.players[that.whoseTurn].side +'" aria-hidden="true"></i>');
      that.status = 'awaiting-input';
      that.runGame();
    }, 300);

    // general case
  } else {
    this.turn += 1; // increment turn
    this.distributeTiles(this.players[this.whoseTurn]); // distribute tiles to player who just playerd

    // reset selected tile
    this.selectedTile = null;
    this.wordOnDeck = {
      tiles: [],
      positions: [],
      wordsToScore: [],
      direction: null,
      mainFirst: null, // first letter of main word
      mainLast: null, // first letter of main word
      hookWords: null
    };

    // Switch turns
    $('.controls.player-' + this.players[this.whoseTurn].n ).hide();
    this.whoseTurn = this.whoseTurn == 0 ? 1:0;


    // Go to collect input from next player
    setTimeout(function() {
      that.status = 'awaiting-input';
      that.runGame();
    }, 300);
  }

};

//Game has a method to receive an input from a designated player
Game.prototype.receiveInput = function () {

  //Message to ask for input
  $('.controls.player-' + this.players[this.whoseTurn].n ).show();
  $('#message').html(this.players[this.whoseTurn].name + '\'s turn to play<br><br><i class="fa fa-chevron-' + this.players[this.whoseTurn].side +'" aria-hidden="true"></i>');

  // var selectedTile = null;
  var that = this;

  // Event listener for clicking on a tile given player's tray, if
  // if it's given player's turn
  // tray square contains a tile
  // user has not already selected a tile

  // => adds tile to selectedTile, clears tray object, renders tray

  $('.tray-square.player-' +  this.players[this.whoseTurn].n).click( function(e) {

    var n = e.currentTarget.className.includes('player-1') ? 1:2;

    if (that.players[that.whoseTurn].n == n &&
        e.currentTarget.className.includes('with-tile')
        && that.selectedTile == null &&
        that.status == 'awaiting-input') {

      that.selectedTile = that.players[that.whoseTurn].drawTile( $(e.currentTarget).index() ); //draws tile from player and loads to selectedTile
      $('.tile-deck.player-' +  that.players[that.whoseTurn].n).addClass('with-tile');
      $('.tile-deck.player-' +  that.players[that.whoseTurn].n + ' .letter').html(that.selectedTile.letter);
      $('.tile-deck.player-' + that.players[that.whoseTurn].n + ' .points').html(that.selectedTile.points);
      var test = 0;
    }
  });


  // Event listener for clicking on a tile given player's tray, if
  // user has already selected a tile
  // target square on board is empty

  // => unloads tile from selectedTile (back to null), adds tiles to board object

  $('.square').click( function(e) {

    if (that.selectedTile !== null &&
        !e.currentTarget.className.includes('with-tile') &&
        that.status == 'awaiting-input') {

      var i = $(e.currentTarget.parentElement).index(); // i coordinate of selected tile
      var j = $(e.currentTarget).index() // j coordinate of selected tile

      // Adds tile to board
      if (i == 7 && j == 7) $(e.currentTarget).children('i').remove(); // special case for center square, remove star
      $(e.currentTarget).children('.bonus').remove();
      $(e.currentTarget).addClass('with-tile'); // adds the with tile styling
      $(e.currentTarget).children('.letter').html(that.selectedTile.letter); // adds letter square
      $(e.currentTarget).children('.points').html(that.selectedTile.points);


      // Removes tile from deck
      $('.tile-deck.player-' +  that.players[that.whoseTurn].n).removeClass('with-tile');
      $('.tile-deck.player-' +  that.players[that.whoseTurn].n + ' .letter').html('');
      $('.tile-deck.player-' + that.players[that.whoseTurn].n + ' .points').html('');


      that.wordOnDeck.tiles.push(that.selectedTile); // load tile and positions to word on deck
      that.wordOnDeck.positions.push( {i: i, j:j});

      that.selectedTile = null; // clear selected tile
    }

  });


  //Event listener on Submit button
  // ==> updates game status to verify input, goes to run game
  $('.submit.player-' +  this.players[this.whoseTurn].n).click( function(e) {

    if(that.status == 'awaiting-input' && that.players[that.whoseTurn].tray.length < 7) {
      that.status = 'validating-play';
      that.runGame();
    }

  });



  //Event listner on Delete button
  // ==> clears all newly placed tiles, clears word on deck, places them back in tray  (NICE TO HAVE)
  $('.delete.player-' +  this.players[this.whoseTurn].n).click( function(e) {

    if(that.status == 'awaiting-input') {
      if (that.selectedTile == null) { // after placing a letter
        that.players[that.whoseTurn].loadTiles(that.wordOnDeck.tiles); // places tiles back in tray and renders board
        that.board.render();
        that.wordOnDeck = { //resets word on deck
          tiles: [],
          positions: []
        };

      } else { // mid placing a letter
        $('.tile-deck.player-' +  that.players[that.whoseTurn].n).removeClass('with-tile');
        $('.tile-deck.player-' +  that.players[that.whoseTurn].n + ' .letter').html('');
        $('.tile-deck.player-' + that.players[that.whoseTurn].n + ' .points').html('');
        that.board.render();
        that.players[that.whoseTurn].loadTiles([that.selectedTile]);
        that.selectedTile = null;
      }
    }

  });


};


// Game has a function to reset tiles placed on Board
Game.prototype.resetTiles = function () {

  this.players[this.whoseTurn].loadTiles(this.wordOnDeck.tiles); // places tiles back in tray and renders board
  this.board.render();
  this.wordOnDeck = { //resets word on deck
    tiles: [],
    positions: []
  }

  // clears selectedTile if necessary
  if (this.selectedTile !== null) {
    $('.tile-deck.player-' +  that.players[that.whoseTurn].n).removeClass('with-tile');
    $('.tile-deck.player-' +  that.players[that.whoseTurn].n + ' .letter').html('');
    $('.tile-deck.player-' + that.players[that.whoseTurn].n + ' .points').html('');
    player.loadTiles([this.selectedTile]);
  }

};


// Game has a method that verifies a word's:
//- position
//- if it's the scrabble dictionary
Game.prototype.validatePlay = function () {

  var that = this;
  conditionsToBeMet = [];


  // 1) TEST POSITION OF WORD
  // if first first turn, word must cover center square
  if (this.turn == 1) {
    if ( _.findIndex(this.wordOnDeck.positions, {i: 7, j:7}) < 0 ) {
      conditionsToBeMet.push(false);
    } else {
      conditionsToBeMet.push(true);
    }


  // in all other cases, word cannot be "floating", needs at least one adjacent tile
  } else {
    var numAdjacentTiles = _.reduce(this.wordOnDeck.positions, function (result, p) {
      return result + that.board.hasAdjacentTiles(p);
    }, true);
    conditionsToBeMet.push( numAdjacentTiles > 0 ? true:false);
  }

  // Regardless of turn, tiles placed must be on same line
  conditionsToBeMet.push(this.board.isOnOneLine(this.wordOnDeck.positions));

  // It must also form a continuous word
  // First determine word direction -- by default horizonal (e.g. when a single tile is placed in a corner)
  // And get first main first and last letters (combining with any previously played tiles)
  // Then check continuity
  this.wordOnDeck.direction = this.board.isHorizontal(this.wordOnDeck.positions) ? 'h' : 'v';
  [this.wordOnDeck.mainFirst, this.wordOnDeck.mainLast] = this.board.getMain(this.wordOnDeck);

  var continuous = false;
  switch(this.wordOnDeck.direction) {

    // First/last of the newly placed tiles cannot be before/after pimary first/last
    case 'h':
    continuous = _.minBy(this.wordOnDeck.positions, 'j').j >= this.wordOnDeck.mainFirst.j && _.maxBy(this.wordOnDeck.positions, 'j').j <= this.wordOnDeck.mainLast.j;
    break;

    case 'v':
    continuous = _.minBy(this.wordOnDeck.positions, 'i').i >= this.wordOnDeck.mainFirst.i && _.maxBy(this.wordOnDeck.positions, 'i').i <= this.wordOnDeck.mainLast.i;
    break;
  }
  conditionsToBeMet.push(continuous);

  //////////////////////////////////////////////////////////////////////////////////
  // Check if all conditions have been met thus far, otherwise return position error
  if ( !_.reduce(conditionsToBeMet, function(product, e) {return product * e}, true) ) {

    this.status = 'awaiting-input';
    $('#message').html('Position of word is not valid. Please try again.');
    setTimeout( function() {
      that.resetTiles();
      that.runGame();
    }, 1500);
  } else {

    // 2) TEST VALIDITY OF WORDS
    // Identify hookwords
    // Then store main word and any potential hook words in a vector of strings
    // Then check all words in vector
    this.wordOnDeck.hookWords = this.board.getHookWords(this.wordOnDeck);

    var wordsToTest = [];

    // first add primary word
    wordsToTest.push(this.board.getWord(this.wordOnDeck, this.wordOnDeck.mainFirst, this.wordOnDeck.mainLast, this.wordOnDeck.direction));

    // then loop through hookWords
    for (var n = 0; n < this.wordOnDeck.hookWords.length; n++) {
      wordsToTest.push(this.board.getWord(this.wordOnDeck, this.wordOnDeck.hookWords[n].first, this.wordOnDeck.hookWords[n].last, this.wordOnDeck.hookWords[n].direction));
    }

    // finally test validity of each word
    var wordValidityTests = [];
    for (var n = 0; n < wordsToTest.length; n++) {
      wordValidityTests.push(checkWord(wordsToTest[n]));
    }

    var result = _.reduce(wordValidityTests, function(result, e) {
      return result * e;
    }, true);

    conditionsToBeMet.push(result);

    //////////////////////////////////////////////////////////////////////////////////
    // Check if all conditions have been met thus far, otherwise return word error
    if ( !_.reduce(conditionsToBeMet, function(product, e) {return product * e}, true) ) {

      this.status = 'awaiting-input';
      $('#message').html('Invalid word(s). Please try again.');
      setTimeout( function() {
        that.resetTiles();
        that.runGame();
      }, 1500);
    } else {


      // 3) IF ALL THE WAY HERE, SCORE WORDS
      // first place word on deck
      this.board.place(this.wordOnDeck, this.players[this.whoseTurn],  this.turn);
      test = 0;

      // then score main word + potential hookWords
      var mainWordPoints = this.board.score(this.wordOnDeck.mainFirst, this.wordOnDeck.mainLast, this.wordOnDeck.direction, this.turn);
      var message = wordsToTest[0].toUpperCase() + ': ' + mainWordPoints + " points"

      var points = 0;
      var hookWordPoints = 0;
      for (var n = 0; n < this.wordOnDeck.hookWords.length; n++) {
        points = this.board.score(this.wordOnDeck.hookWords[n].first, this.wordOnDeck.hookWords[n].last, this.wordOnDeck.hookWords[n].direction, this.turn);
        message += '<br>' + wordsToTest[n+1].toUpperCase() + ': ' + points + ' points'
        hookWordPoints += points;
      }

      // Sum total score including Scrabble Bonus
      var scrabbleBonus = (this.wordOnDeck.tiles.length == 7) ? 50 : 0;
      var totalPoints = mainWordPoints + hookWordPoints + scrabbleBonus;

      that.players[that.whoseTurn].updateScore(totalPoints, that.wordOnDeck.tiles.length);


      $('#message').html(that.players[that.whoseTurn].name + ' scores ' + totalPoints + ' points<br>' + message);

      var timeoutId = setTimeout (function() {
        that.status = 'switching-turns';
        that.runGame();
      }, 1000);

    }
  }




};

// Board has method that returns true/false if word is contained in dictionary
Game.prototype.isWord = function () {
  return true;
  //find API, maybe through:
  //http://scrabblewordfinder.org/dictionary-checker
  //or https://scrabble.hasbro.com/en-us/tools
};
