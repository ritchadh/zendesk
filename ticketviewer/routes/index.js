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
        title: 'Error Page',
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
  if (!body.error && !response.statusCode == 404) {
    res.render('index',
    { title: 'Ticket Viewer',
      tickets: body
    });
  }  else if (body.error.title){
    res.render('error',
    {
      title: 'Page Error',
      error: body.error.title,
      message: body.error.message
    });
  }
  else{
    res.render('error',
    {
      title: 'Page Error',
      error: body.error
    });
  }

}
request.get(options, callback);

});



// router.get('/alltickets', function (req, res) {
//
//   request({
//   uri: 'https://ritikachadha.zendesk.com/api/v2/tickets.json',
//   auth:{
//     user: 'ritikachadha05@gmail.com',
//     pass: 'qwerty'
//   },
//   type: 'GET',
//   dataType: 'json'
// }).pipe(res);
// });

// router.get('/singleticket/:id', function (req, res) {
//   request({
//   uri: 'https://ritikachadha.zendesk.com/api/v2/tickets/'+id+'.json',
//   auth:{
//     user: 'ritikachadha05@gmail.com',
//     pass: 'qwerty'
//   },
//   type: 'GET',
//   dataType: 'json'
// }).pipe(res);
// });

module.exports = router;
