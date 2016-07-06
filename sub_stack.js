var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var websiteURL = 'http://substack.net/images/'

request(websiteURL, function (error, response, html) {
  if (error)
    console.log(error)

  var dataArray = [];

  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('tr').each(function(i, element) { 
      var filePermission = $(this).children(':nth-child(1)').text();
      var absoluteURL = $(this).children(':nth-child(3)').children().attr('href');
      var fileName = $(this).children(':nth-child(3)').text();

      // extract file type

      var fileType = fileName.split('.')[1];

      var data = {
        filePermission: filePermission,
        absoluteURL: websiteURL + absoluteURL.substring(8, absoluteURL.length),
        fileType: fileType
      }

      dataArray.push(data);

    });

    function isImageFile(obj) {
      return obj.fileType !== undefined
    }

    var filteredDataArray = dataArray.filter(isImageFile);

    console.log(filteredDataArray); 

  }
  
});
