function checkWord(word) {

  var result = $.ajax({
    url: "https://www.wordgamedictionary.com/api/v1/references/scrabble/" + word + "?key=1.1718115275527805e30",
    method: "GET",
    async: false,
    // beforeSend: function(xhr){
    //   xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
    //   xhr.setRequestHeader('origin', '*');
    // },
    success: function (response) {
      return parseInt($(response).children('entry').children('scrabble').html());
    },
    error: function (err) {
      console.log(err);
    }
    // crossDomain: true,
    // xhrFields: {
    //   withCredentials: true
    // }
  });

  return parseInt($(result.responseXML).find('scrabble').html());

}
