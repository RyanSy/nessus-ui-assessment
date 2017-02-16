var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* refactor: save serverResponse as ./data/serverResponse.json
** use fetch to retrieve data
*/
var serverResponse = {
  'configurations':[
    {
      'name': 'host1',
      'hostname': 'nessus-ntp.lab.com',
      'port': 1241,
      'username': 'toto'
    },
    {
      'name': 'host2',
      'hostname': 'nessus-xml.lab.com',
      'port': 3384,
      'username': 'admin'
    }
  ]
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nessus UI Assessment' });
});

router.get('/download/request', function(req, res, next) {
  var configurationsArray = serverResponse.configurations
  var numberSelected = req.query.host;
  console.log('========== Server Response ==========');
  console.log(configurationsArray);
  res.render('index', { title: 'Nessus UI Assessment', serverResponse: configurationsArray, numberSelected: numberSelected });
});

module.exports = router;
