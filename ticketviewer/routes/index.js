var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {

  var options = {
    url: 'https://ritikachadha.zendesk.com/api/v2/tickets.json',
    json: true,
    auth:{
      username: 'ritikachadha05@gmail.com',
      password: 'qwerty'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('index',
      { title: 'Ticket Viewer',
        tickets: body.tickets
      });
    }

    else {
      res.render('error',{
        error: 'Page not Found'
      })
    }
  }
  request.get(options, callback);

});

router.get('/singleticket/:id', function (req, res) {

var options = {
  url: 'https://ritikachadha.zendesk.com/api/v2/tickets/'+req.params.id+'.json',
  json: true,
  auth:{
    username: 'ritikachadha05@gmail.com',
    password: 'qwerty'
  }
};

function callback(error, response, body) {

  if (!body.error && response.statusCode == 200) {
    res.render('index',
    { title: 'Ticket Viewer',
      tickets: body
    });
  }  else if (body.error.title){
    res.render('error',
    {
      error: body.error.title,
      message: body.error.message
    });
  }
  else{
    res.render('error',
    {
      error: body.error||'Page Not Found'
    });
  }

}
request.get(options, callback);

});

module.exports = router;
