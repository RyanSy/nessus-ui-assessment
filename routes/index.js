var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/download/request', function(req, res, next) {
  fs.readFile('./data/data.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var serverResponse = JSON.parse(data);
    var configurationsArray = serverResponse.configurations;
    var numberSelected = req.query.host;
    var displayResults = req.query.displayResults;
    var resultsArray = [];
    for (var i = 0; i < req.query.host && i < configurationsArray.length; i++) {
      resultsArray.push(configurationsArray[i]);
    }
    var numberOfResults = resultsArray.length;
    var numberOfPages = Math.ceil(numberOfResults/10);
    res.render('index', { resultsArray: resultsArray, numberSelected: numberSelected, numberOfResults: numberOfResults, displayResults: displayResults });
  });
});

module.exports = router;
