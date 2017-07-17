function checkWord(word) {

  var result = $.ajax({
    url: "http://www.wordgamedictionary.com/api/v1/references/scrabble/" + word + "?key=1.1718115275527805e30",
    method: "GET",
    async: false,
    success: function (response) {
      return parseInt($(response).children('entry').children('scrabble').html());
    },
    error: function (err) {
      console.log(err);
    }
  });

  return parseInt($(result.responseXML).find('scrabble').html());

}
