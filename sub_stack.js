var request = require('request')
var cheerio = require('cheerio')

request('http://substack.net/images/', function (error, response, html) {
  if (error)
    console.log(error)

  if (!error && response.statusCode == 200) {
    console.log(html);
  }
  
});