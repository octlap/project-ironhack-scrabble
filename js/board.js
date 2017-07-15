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
    ['w3',  null,  null,  null,  null,  null,  null,  '*w2', null,  null,  null,  null,  null,  null,  'w3'], // 7
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
Board.prototype.getMain = function (wordOnDeck) {

  // place words on a test grid with only letters
  var testGrid = this.toLetters();
  for (var n = 0; n < wordOnDeck.positions.length; n++) {
    testGrid[wordOnDeck.positions[n].i][wordOnDeck.positions[n].j] = wordOnDeck.tiles[n].letter;
  }

  // identify main word and any hookwords
  var mainWord = [];
  var first; var mainFirst; var mainLast;
  switch (wordOnDeck.direction) {

    case 'h':
      first = _.minBy(wordOnDeck.positions, 'j'); // first is most to the left
      var row = testGrid[first.i]; // isolate row

      var before = _.take(row, first.j + 1); // takes all letters from left of first of new placed letters, incl. first
      mainFirst = {i: first.i , j: this.findStart(before)}; //isolate position of first letter of main word
      var after = _.takeRight(row, row.length - first.j); // takes all positions to the right of first of newly places letters, incl first
      mainLast = {i: first.i, j: this.findEnd(after) + first.j}; //isolate position of last letter of main word

    break;

    case 'v':
      first = _.minBy(wordOnDeck.positions, 'i'); // same as previous case, this time for vertical words
      var col = _.map(testGrid, function (e) { return e[first.j] } );

      var above =  _.take(col, first.i + 1);
      mainFirst = {i: this.findStart(above), j: first.j};
      var below = _.takeRight(col, col.length - first.i);
      mainLast = {i: this.findEnd (below) + first.i, j: first.j};

    break;
  }

  return [mainFirst, mainLast];

};


// Board has a method that finds hookwords
Board.prototype.getHookWords = function (wordOnDeck) {

  numTiles = wordOnDeck.tiles.length;
  var hookWords =[];
  var testGrid = this.toLetters();
  for (var n = 0; n < wordOnDeck.positions.length; n++) {
    testGrid[wordOnDeck.positions[n].i][wordOnDeck.positions[n].j] = wordOnDeck.tiles[n].letter;
  }

  for (var n = 0; n < numTiles; n++) { //loop through new placed tiles

    switch (wordOnDeck.direction) {

      case 'h':
        if (wordOnDeck.positions[n].i > 0 &&this.grid[wordOnDeck.positions[n].i - 1][wordOnDeck.positions[n].j] !== null || // if there is tile immediately above
            wordOnDeck.positions[n].i < 14 && this.grid[wordOnDeck.positions[n].i + 1][wordOnDeck.positions[n].j] !== null) { //if there is a tile immediately below

          // look for vertical hook word
          var col = _.map(testGrid, function (e) { return e[wordOnDeck.positions[n].j] } );
          var above =  _.take(col, wordOnDeck.positions[n].i + 1);
          var hookFirst = {i: this.findStart(above), j: wordOnDeck.positions[n].j};
          var below = _.takeRight(col, col.length - wordOnDeck.positions[n].i);
          var hookLast = {i: this.findEnd(below), j: wordOnDeck.positions[n].j};

          hookWords.push({first: hookFirst, last: hookLast, direction: 'v'}); // push hook word positions
        }

        break;

      case 'v':
      if (wordOnDeck.positions[n].j > 0 && this.grid[wordOnDeck.positions[n].i][wordOnDeck.positions[n].j - 1] !== null || // if there is tile immediately to the left
          wordOnDeck.positions[n].j < 14 && this.grid[wordOnDeck.positions[n].i][wordOnDeck.positions[n].j + 1] !== null) { //if there is a tile immediately above


          // look for horizontal hook word
          var row = testGrid[wordOnDeck.positions[n].i]; // Same logic as in GetPrimary
          var before = _.take(row, wordOnDeck.positions[n].j + 1);
          var hookFirst = {i: wordOnDeck.positions[n].i , j: this.findStart(before)};
          var after = _.takeRight(row, row.length - wordOnDeck.positions[n].j);
          var hookLast = {i: wordOnDeck.positions[n].i, j: this.findEnd(after)};

          hookWords.push({first: hookFirst, last: hookLast, direction: 'h'});
      }

      break;
    }
  }

  return hookWords;

};

// Board has a method that returns the last non-null element of an array passed as input
Board.prototype.findStart = function (array) {

  var lastNull = _.lastIndexOf(array, null);
  return lastNull == -1 ? 0 : lastNull + 1;

};

// Board has a method that returns the first non-null element of an array passed as input
Board.prototype.findEnd = function (array) {

  var firstNull = _.indexOf(array, null);
  return firstNull == -1 ? array.length - 1 : firstNull -1 ;

};




// Board has a method that places the tiles on the board once it's been validated
Board.prototype.place = function (wordOnDeck, player, turn) {

  for (var n = 0; n < wordOnDeck.tiles.length; n++) {
    wordOnDeck.tiles[n].placedBy = player.name;
    wordOnDeck.tiles[n].turnPlaced = turn;
    this.grid[wordOnDeck.positions[n].i][wordOnDeck.positions[n].j] = wordOnDeck.tiles[n];
  }

};


// Board has a method that caculates the score of a given play
Board.prototype.score = function (first, last, direction, turn) {

  var points = 0;
  var wordBonuses = [];

  switch(direction) {

  case 'h':
    for (var j = first.j; j <= last.j; j++) {
      points += this.grid[first.i][j].points * this.getLetterBonus( {i: first.i, j: j}, turn);
      wordBonuses.push(this.getWordBonus( {i: first.i, j: j}, turn)); // fetches and stores potential word bonus
    }
  break;

  case 'v':
    for (var i = first.i; i <= last.i; i++) {
      points += this.grid[i][first.j].points * this.getLetterBonus( {i: i, j: first.j}, turn );
      wordBonuses.push(this.getWordBonus( {i: i, j: first.j}, turn )); //fetches and stores potential word bonus
    }
  break;

  }

  points = points * _.reduce(wordBonuses, function(product, e) { return product * e }, 1);
  return points;

};


// Board has a method that return letter bonus when eligible
Board.prototype.getLetterBonus = function (position, turn) {

  // first branch : position corresponds to a letter bonus
  if (this.letterBonusGrid[position.i][position.j] !== null) {

    // if no tile has been placed return bonus multiplier
    if (this.grid[position.i][position.j] == null) {
      return parseInt(_.takeRight(this.letterBonusGrid[position.i][position.j], 1));

    // else if there is a tile, but it was just placed in this turn, also return bonus multiplier
  } else if (this.grid[position.i][position.j].turnPlaced == turn){
      return parseInt(_.takeRight(this.letterBonusGrid[position.i][position.j], 1));

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
Board.prototype.getWordBonus = function (position, turn) {

  // first branch : position corresponds to a letter bonus
  if (this.wordBonusGrid[position.i][position.j] !== null) {

    // if no tile has been placed return bonus multiplier
    if (this.grid[position.i][position.j] == null) {
      return parseInt(_.takeRight(this.wordBonusGrid[position.i][position.j],1));

    // else if there is a tile, but it was just placed in this turn, also return bonus multiplier
  } else if (this.grid[position.i][position.j].turnPlaced == turn){
      return parseInt(_.takeRight(this.wordBonusGrid[position.i][position.j], 1));

    // if there is a tile but from a previous turn, return 1 as multiplier
    } else {
      return 1;
    }

  // addresses all cases on non-bonus positions
  } else { //
    return 1;
  }
};


// Board has methods that returns true/false if horizontal, vertical, or one line
Board.prototype.isHorizontal = function (positions) {

  // in case just one tile has been put down, check for tiles left or right from words already played
  if (positions.length == 1) {
    if (positions[0].j < 14 && this.grid[positions[0].i][positions[0].j + 1] !== null) return true; // tile to the right?
    if (positions[0].j > 0 && this.grid[positions[0].i][positions[0].j - 1] !== null) return true; // tile to the left?
  }


  // otherwise true if all positions are on the same row, i.e. same x
  return _.reduce(positions, function(result, p){
    return result * (p.i == positions[0].i ? true : false);
  }, true);
}

Board.prototype.isVertical = function (positions) {

  // in case just one tile has been put down, check for tiles left or right from words already played
  if (positions.length == 1) {
    if (positions[0].i < 14 && this.grid[positions[0].i + 1][positions[0].j] !== null) return true; // tile to the right?
    if (positions[0].i > 0 && this.grid[positions[0].i - 1][positions[0].j] !== null) return true; // tile to the left?
  }


  // otherwise true if all positions are on the same row, i.e. same x
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


//Board has a method that returns turn in input position has at least
//one adjacent tile (placed in a previous turn on the board)
Board.prototype.hasAdjacentTiles = function (position) {

  if (position.i > 0 && this.grid[position.i - 1][position.j] !== null) return true; // tile above?
  if (position.j < 14 && this.grid[position.i][position.j + 1] !== null) return true; // tile to the right?
  if (position.i < 14 && this.grid[position.i + 1][position.j] !== null) return true; // tile below?
  if (position.j > 0 && this.grid[position.i][position.j - 1] !== null) return true; // tile to the left?

  // return false if none of the above
  return false;

};


//Board has method that returns a string of the letters from one position another
Board.prototype.getWord = function (wordOnDeck, first, last, direction) {

  var word = '';

  // place words on a test grid with only letters
  var tempGrid = this.toLetters();
  for (var n = 0; n < wordOnDeck.positions.length; n++) {
    tempGrid[wordOnDeck.positions[n].i][wordOnDeck.positions[n].j] = wordOnDeck.tiles[n].letter;
  }

  switch (direction) {
    case 'h':
      for (var j = first.j ; j <= last.j; j++) {
        word += tempGrid[first.i][j];
      }
      break;

    case 'v':
      for (var i = first.i ; i <= last.i; i++) {
        word += tempGrid[i][first.j];
      }
      break;
  }

  return word.toLowerCase();

};



// Board has a method that renders Board
Board.prototype.render = function () {

  if (true) {

    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[0].length; j++) {

        if (this.grid[i][j] == null) {
          $('.square.square-' + i + '-' + j).removeClass('with-tile'); // removes 'with-tile' class
          $('.square.square-' + i + '-' + j).children('.letter').html(''); // clears letter if no tile is present
          $('.square.square-' + i + '-' + j).children('.points').html(''); // clears points if no tile is present
          if (i == 7 && j == 7) {
              $('.square.square-' + i + '-' + j).html('<i class="fa fa-star" aria-hidden="true"></i><span class="letter"></span><span class="points"></span></div>');
          }
        }

        if (this.grid[i][j] == null && this.letterBonusGrid[i][j] !== null) {
          $('.square.square-' + i + '-' + j).addClass(this.letterBonusGrid[i][j]);
          $('.square.square-' + i + '-' + j + ' .bonus').remove();
          $('.square.square-' + i + '-' + j + ' .letter').before('<span class="bonus">' + this.letterBonusGrid[i][j].split('').reverse().join('').toUpperCase() + '<span class="bonus">');

        } else if (this.grid[i][j] == null && this.wordBonusGrid[i][j] !== null && this.wordBonusGrid[i][j] !== "*w2") {
          $('.square.square-' + i + '-' + j + ' .bonus').remove();
          $('.square.square-' + i + '-' + j).addClass(this.wordBonusGrid[i][j]);
          $('.square.square-' + i + '-' + j + ' .letter').before('<span class="bonus">' + this.wordBonusGrid[i][j].split('').reverse().join('').toUpperCase() + '<span class="bonus">');
        }

      }
    }

  }

};
