var request = require('request')
var cheerio = require('cheerio')

request('http://substack.net/images/', function (error, response, html) {
  console.log(html);
});