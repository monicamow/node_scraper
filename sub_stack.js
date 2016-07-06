var request = require('request')
var cheerio = require('cheerio')

request('http://substack.net/images/', function (error, response, html) {
  if (error)
    console.log(error)

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('tr').each(function(i, element) { 
      var filePermission = $(this).children(':nth-child(1)').text();
      var absoluteURL = $(this).children(':nth-child(2)').text();
      var fileType = $(this).children(':nth-child(3)').text();
    });
  }
  
});