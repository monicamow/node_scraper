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

    function CSV(array) {
        // Use first element to choose the keys and the order
        var keys = Object.keys(array[0]);

        // Build header
        var result = keys.join("\t") + "\n";

        // Add the rows
        array.forEach(function(obj){
            keys.forEach(function(key, value){
                if (value) result += "\t";
                result += obj[key];
            });
            result += "\n";
        });

        return result;
    }

    var dataCSV = CSV(filteredDataArray);

    var options = {flags: 'w', encoding: 'utf8', autoClose: true}

    fs.writeFile('sub_stack.csv', dataCSV, options, function (err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else{
        console.log('It\'s saved!');
      }
    });

  }
  
});
