function Bag(language) {

  // Bag has a set of tiles of language played
  // https://en.wikipedia.org/wiki/Scrabble_letter_distributions
  switch (language) {
    case 'en':

    this.tiles = [
        // 12 E x 1 point
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'E', points: 1, placedBy: '', turnPlaced: null},

        // 9 A x 1 point
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'A', points: 1, placedBy: '', turnPlaced: null},

        // 9 I x 1 point
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'I', points: 1, placedBy: '', turnPlaced: null},

        // 8 O x 1 point
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'O', points: 1, placedBy: '', turnPlaced: null},

        // 6 N x 1 point
        {letter: 'N', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'N', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'N', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'N', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'N', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'N', points: 1, placedBy: '', turnPlaced: null},

        // 6 R x 1 point
        {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'R', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'R', points: 1, placedBy: '', turnPlaced: null},

        // 6 T x 1 point
        {letter: 'T', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'T', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'T', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'T', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'T', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'T', points: 1, placedBy: '', turnPlaced: null},

        // 4 L x 1 point
        {letter: 'L', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'L', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'L', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'L', points: 1, placedBy: '', turnPlaced: null},

        // 4 S x 1 point
        {letter: 'S', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'S', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'S', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'S', points: 1, placedBy: '', turnPlaced: null},

        // 4 S x 1 point
        {letter: 'U', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'U', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'U', points: 1, placedBy: '', turnPlaced: null},
        {letter: 'U', points: 1, placedBy: '', turnPlaced: null},

        // 4 D x 2 points
        {letter: 'D', points: 2, placedBy: '', turnPlaced: null},
        {letter: 'D', points: 2, placedBy: '', turnPlaced: null},
        {letter: 'D', points: 2, placedBy: '', turnPlaced: null},
        {letter: 'D', points: 2, placedBy: '', turnPlaced: null},

        // 3 G x 2 points
        {letter: 'G', points: 2, placedBy: '', turnPlaced: null},
        {letter: 'G', points: 2, placedBy: '', turnPlaced: null},
        {letter: 'G', points: 2, placedBy: '', turnPlaced: null},

        // 2 B x 3 points
        {letter: 'B', points: 3, placedBy: '', turnPlaced: null},
        {letter: 'B', points: 3, placedBy: '', turnPlaced: null},

        // 2 C x 3 points
        {letter: 'C', points: 3, placedBy: '', turnPlaced: null},
        {letter: 'C', points: 3, placedBy: '', turnPlaced: null},

        // 2 M x 3 points
        {letter: 'M', points: 3, placedBy: '', turnPlaced: null},
        {letter: 'M', points: 3, placedBy: '', turnPlaced: null},

        // 2 P x 3 points
        {letter: 'P', points: 3, placedBy: '', turnPlaced: null},
        {letter: 'P', points: 3, placedBy: '', turnPlaced: null},

        // 2 F x 4 points
        {letter: 'F', points: 4, placedBy: '', turnPlaced: null},
        {letter: 'F', points: 4, placedBy: '', turnPlaced: null},

        // 2 H x 4 points
        {letter: 'H', points: 4, placedBy: '', turnPlaced: null},
        {letter: 'H', points: 4, placedBy: '', turnPlaced: null},

        // 2 V x 4 points
        {letter: 'V', points: 4, placedBy: '', turnPlaced: null},
        {letter: 'V', points: 4, placedBy: '', turnPlaced: null},

        // 2 W x 4 points
        {letter: 'W', points: 4, placedBy: '', turnPlaced: null},
        {letter: 'W', points: 4, placedBy: '', turnPlaced: null},

        // 2 Y x 4 points
        {letter: 'Y', points: 4, placedBy: '', turnPlaced: null},
        {letter: 'Y', points: 4, placedBy: '', turnPlaced: null},

        // 1 K x 5 points
        {letter: 'K', points: 5, placedBy: '', turnPlaced: null},

        // 1 K x 8 points
        {letter: 'J', points: 8, placedBy: '', turnPlaced: null},

        // 1 X x 5 points
        {letter: 'X', points: 8, placedBy: '', turnPlaced: null},

        // 1 Q x 10 points
        {letter: 'Q', points: 10, placedBy: '', turnPlaced: null},

        // 1 K x 5 points
        {letter: 'Z', points: 10, placedBy: '', turnPlaced: null}

    ]
    break;

    // case 'fr':
    //
    //   tiles = [];
    //
    //   break;

  }

}



// Bag has method to shuffle tiles at the beggining of game
Bag.prototype.shuffleTiles = function () {

  var shuffledBag = []; var randIndex = 0; var numTiles = this.tiles.length;

  for (i = 0; i < numTiles ; i++) {
    randIndex = _.random(0,this.tiles.length - 1);
    shuffledBag.push(this.tiles[randIndex]);
    this.tiles.splice(randIndex,1);
  }

  this.tiles = shuffledBag;
};


// Bag has a function to draw n tiles - without replacement
Bag.prototype.drawTiles = function (n) {

  var drawnTiles = [];
  for ( var i = 0; i < n; i++) { drawnTiles.push(this.tiles.pop()); }
  return drawnTiles;

  // add case where not enough tiles are left in the bag

};

//Bag has a method that returns the number of tiles left
Bag.prototype.tilesLeft = function () {
  return this.tiles.length;
};
