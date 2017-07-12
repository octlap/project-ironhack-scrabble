function Board(numPlayers) {

  // Board has a 15x15 matrix representing grid, will contain tiles
  this.grid = [
  //  0       1      2      3      4      5     6       7     8      9      10     11     12     13     14
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 0
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 1
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 2
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 3
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 4
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 5
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 6
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 7
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 8
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 9
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 10
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 11
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 12
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 13
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 14
  ]

  //Board has a reference 15x15 grid corresponding to special point scoring
  //'*' central,  'l2' - double letter, 'l3' - triple letter, 'w2' - double word, 'w3' - triple word
  this.letterBonusGrid = [
  //  0       1      2      3      4      5     6       7     8      9      10     11     12     13     14
    [null,  null,  null,  'l2',  null,  null,  null,  null,  null,  null,  null,  'l2',  null,  null,  null], // 0
    [null,  null,  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  null,  null], // 1
    [null,  null,  null,  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  null,  null,  null], // 2
    ['l2',  null,  null,  null,  null,  null,  null,  'l2',  null,  null,  null,  null,  null,  null,  'l2'], // 3
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 4
    [null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null], // 5
    [null,  null,  'l2',  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  'l2',  null,  null], // 6
    [null,  null,  null,  'l2',  null,  null,  null,  null,  null,  null,  null,  'l2',  null,  null,  null], // 7
    [null,  null,  'l2',  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  'l2',  null,  null], // 8
    [null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null], // 9
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 10
    ['l2',  null,  null,  null,  null,  null,  null,  'l2',  null,  null,  null,  null,  null,  null,  'l2'], // 11
    [null,  null,  null,  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  null,  null,  null], // 12
    [null,  null,  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  null,  null], // 13
    [null,  null,  null,  'l2',  null,  null,  null,  null,  null,  null,  null,  'l2',  null,  null,  null], // 14
  ]

  this.wordBonusGrid = [

  //  0       1      2      3      4      5     6       7     8      9      10     11     12     13     14
    ['w3',  null,  null,  null,  null,  null,  null,  'w3',  null,  null,  null,  null,  null,  null,  'w3'], // 0
    [null,  'w2',  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  'w2',  null], // 1
    [null,  null,  'w2',  null,  null,  null,  null,  null,  null,  null,  null,  null,  'w2',  null,  null], // 2
    [null,  null,  null,  'w2',  null,  null,  null,  null,  null,  null,  null,  'w2',  null,  null,  null], // 3
    [null,  null,  null,  null,  'w2',  null,  null,  null,  null,  null,  'w2',  null,  null,  null,  null], // 4
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 5
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 6
    ['w3',  null,  null,  null,  null,  null,  null,  '*',   null,  null,  null,  null,  null,  null,  'w3'], // 7
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 8
    [null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null], // 9
    [null,  null,  null,  null,  'w2',  null,  null,  null,  null,  null,  'w2',  null,  null,  null,  null], // 10
    [null,  null,  null,  'w2',  null,  null,  null,  null,  null,  null,  null,  'w2',  null,  null,  null], // 11
    [null,  null,  'w2',  null,  null,  null,  null,  null,  null,  null,  null,  null,  'w2',  null,  null], // 12
    [null,  'w2',  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  null,  'w2',  null], // 13
    ['w3',  null,  null,  null,  null,  null,  null,  'w3',  null,  null,  null,  null,  null,  null,  'w3'], // 14
  ]

  // this.bonusGrid = [
  //   ['w3',  null,  null,  'l2',  null,  null,  null,  'w3',  null,  null,  null,  'l2',  null,  null,  'w3'],
  //   [null,  'w2',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'w2',  null],
  //   [null,  null,  'w2',  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  'w2',  null,  null],
  //   ['l2',  null,  null,  'w2',  null,  null,  null,  'l2',  null,  null,  null,  'w2',  null,  null,  'l2'],
  //   [null,  null,  null,  null,  'w2',  null,  null,  null,  null,  null,  'w2',  null,  null,  null,  null],
  //   [null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null],
  //   [null,  null,  'l2',  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  'l2',  null,  null],
  //   ['w3',  null,  null,  'l2',  null,  null,  null,  '*',   null,  null,  null,  'l2',  null,  null,  'w3'],
  //   [null,  null,  'l2',  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  'l2',  null,  null],
  //   [null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null],
  //   [null,  null,  null,  null,  'w2',  null,  null,  null,  null,  null,  'w2',  null,  null,  null,  null],
  //   ['l2',  null,  null,  'w2',  null,  null,  null,  'l2',  null,  null,  null,  'w2',  null,  null,  'l2'],
  //   [null,  null,  'w2',  null,  null,  null,  'l2',  null,  'l2',  null,  null,  null,  'w2',  null,  null],
  //   [null,  'w2',  null,  null,  null,  'l3',  null,  null,  null,  'l3',  null,  null,  null,  'w2',  null],
  //   ['w3',  null,  null,  'l2',  null,  null,  null,  'w3',  null,  null,  null,  'l2',  null,  null,  'w3'],
  // ]

  // board has an array of word objects containing: word, first letter matrix coord, direction,

}



// Board has a function that places a word and returns and an error type if not validated
Board.prototype.play = function (tiles, positions, turn) {

  var that = this; //scope carry

  // here word should have been tested on availability of grid positions and same line criteria
  var numTiles = tiles.length;

  // tentatively place words on board for testing
  for (var n = 0; n < numTiles; n++) { this.grid[positions[n].i][positions[n].j] = tiles [n]; }
  var letterGrid = this.toLetters();

  // identity direction
  var wordDirection = this.isHorizontal(positions) ? 'h' : 'v';

  // identify primary word and any crosswords
  var primaryWord = [];
  var first; var primaryFirst; var primaryLast;
  switch (wordDirection) {

    case 'h':
      first = _.minBy(positions, 'j'); // first is most to the left
      var row = letterGrid[first.i]; // isolate row

      var before = _.take(row, first.j); // takes all letters from left of first of new placed letters
      primaryFirst = {i: first.i , j: _.lastIndexOf(before, null) + 1}; //isolate position of first letter of primary word

      var after = _.takeRight(row, row.length - first.j); // takes all positions to the right of first of newly places letters
      primaryLast = {i: first.i, j: _.indexOf(after, null) + first.j - 1}; //isolate position of last letter of primary word

    break;

    case 'v':
      first = _.minBy(positions, 'i'); // same as previous case, this time for vertical words
      var col = _.map(letterGrid, function (e) { return e[first.j] } );

      var above =  _.take(col, first.i);
      primaryFirst = {i: _.lastIndexOf(above, null) + 1, j: first.j};

      var below = _.takeRight(col, col.length - first.i);
      primaryLast = {i: _.indexOf(below, null) + first.i - 1, j: first.j};

    break;
  }

  // Calculate score of the current play
  return this.scorePlay(primaryFirst, primaryLast, wordDirection, turn);

};


// Board has a method that caculates the score of a given play
Board.prototype.scorePlay = function (primaryFirst, primaryLast, wordDirection, turn) {

  var points = 0;
  var wordBonuses = [];

  switch(wordDirection) {

  case 'h':
    for (var j = primaryFirst.j; j <= primaryLast.j; j++) {
      points += this.grid[primaryFirst.i][j].points * this.getLetterBonus( {i: primaryFirst.i, j: j} );
      wordBonuses.push(this.getWordBonus( {i: primaryFirst.i, j: j} )); // fetches and stores potential word bonus
      this.grid[primaryFirst.i][j].turnPlaced = turn; //validates tile placement
    }
  break;

  case 'v':
    for (var i = primaryFirst.i; i <= primaryLast.i; i++) {
      points += this.grid[i][primaryFirst.j].points * this.getLetterBonus( {i: i, j: primaryFirst.j} );
      wordBonuses.push(this.getWordBonus( {i: i, j: primaryFirst.j} )); //fetches and stores potential word bonus
      this.grid[i][primaryFirst.j].turnPlaced = turn; //validates tile placement
    }
  break;

  }



  ////// ADD CROSS WORDS MODULE SOMEDAY /////

  points = points * _.reduce(wordBonuses, function(product, e) { return product * e }, 1);
  return points;

};


// Board has a method that return letter bonus when eligible
Board.prototype.getLetterBonus = function (position) {

  // first branch : position corresponds to a letter bonus
  if (this.letterBonusGrid[position.i][position.j] !== null) {

    // if no tile has been placed return bonus multiplier
    if (this.grid[position.i][position.j] == null) {
      return parseInt(this.letterBonusGrid[position.i][position.j]);

    // else if there is a tile, but it was just placed in this turn, also return bonus multiplier
    } else if (this.grid[position.i][position.j].turnPlaced == null){
      return parseInt(this.letterBonusGrid[position.i][position.j]);

    // if there is a tile but from a previous turn, return 1 as multiplier
    } else {
      return 1;
    }

  // addresses all cases on non-bonus positions
  } else { //
    return 1;
  }
};

//Board has a method that returns word bonus multiplier when eligible
Board.prototype.getWordBonus = function (position) {

  // first branch : position corresponds to a letter bonus
  if (this.wordBonusGrid[position.i][position.j] !== null) {

    // if no tile has been placed return bonus multiplier
    if (this.grid[position.i][position.j] == null) {
      return parseInt(this.wordBonusGrid[position.i][position.j]);

    // else if there is a tile, but it was just placed in this turn, also return bonus multiplier
    } else if (this.grid[position.i][position.j].turnPlaced == null){
      return parseInt(this.wordBonusGrid[position.i][position.j]);

    // if there is a tile but from a previous turn, return 1 as multiplier
    } else {
      return 1;
    }

  // addresses all cases on non-bonus positions
  } else { //
    return 1;
  }
};


// Board has method that returns true/false if word is contained in dictionary
Board.prototype.isWord = function () {
  return true;
  //find API, maybe through:
  //http://scrabblewordfinder.org/dictionary-checker
  //or https://scrabble.hasbro.com/en-us/tools
};


// Board has methods that returns true/false if horizontal, vertical, or one line
Board.prototype.isHorizontal = function (positions) {
  // is true if all positions are on the same row, i.e. same x
  return _.reduce(positions, function(result, p){
    return result * (p.i == positions[0].i ? true : false);
  }, true);
}

Board.prototype.isVertical = function (positions) {
  // is true if all positions are on the same row, i.e. same x
  return _.reduce(positions, function(result, p){
    return result * (p.j == positions[0].j ? true : false);
  }, true);
};


Board.prototype.isOnOneLine = function (positions) {
  return (this.isVertical(positions) || this.isHorizontal(positions)) ? true:false;

}

//print Board
Board.prototype.printBoard = function () {

  // adds a break at the end of every line, flattens and logs
  var toPrint = _.flatten( _.map( this.toLetters(), function(e) {return _.concat(e, '\n')} ) );
  toPrint = _.map(toPrint, function(e) { return e? e : '-' });
  console.log(' ' + toPrint.join(' '));

};

//convert board grid to letters matrix
Board.prototype.toLetters = function () {
  var letters = [];

  for (var i = 0; i < this.grid.length; i++) {
      letters[i] = this.grid[i].map( function(e) {
        return e ? e.letter : null;
      });
  }

  return letters;
};

Board.prototype.isValidFirstPlay = function () {
// code here to make sure includes centre square
};


// Board has a method that renders Board
Board.prototype.render = function () {

  if (true) {

    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[0].length; j++) {

        if (this.grid[i][j] == null) {
          $('.square.square-' + i + '-' + j).html(''); // clears square if no tile is present
          if (i == 7 && j == 7)$('.square.square-' + i + '-' + j).html('<i class="fa fa-star" aria-hidden="true"></i>');
          $('.square.square-' + i + '-' + j).removeClass('with-tile'); // removes 'with-tile' class
        }

        if (this.grid[i][j] == null && this.letterBonusGrid[i][j] !== null) {
          $('.square.square-' + i + '-' + j).addClass(this.letterBonusGrid[i][j]);
          $('.square.square-' + i + '-' + j).html(this.letterBonusGrid[i][j].split('').reverse().join('').toUpperCase());

        } else if (this.grid[i][j] == null && this.wordBonusGrid[i][j] !== null && this.wordBonusGrid[i][j] !== "*") {
          $('.square.square-' + i + '-' + j).addClass(this.wordBonusGrid[i][j]);
          $('.square.square-' + i + '-' + j).html(this.wordBonusGrid[i][j].split('').reverse().join('').toUpperCase());
        }

      }
    }

  }

};
