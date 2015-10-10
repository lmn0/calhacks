
// Node modules
var express = require('express'),
    async = require("async"),
    router = express.Router(),
    Api = require("../../api"),
    r = require("../../lib/request");
    http=require("http");
// ===


router.get("/session",function(req,res,next){
var options = {
  host: 'localhost',
  port:5050,
  path: '/opentok'
};

callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    res.status(200).render("chat/session.jade", {
      sessiondetails:str,
      pageTitle: "Jyotisham - Chat",
      showRegister: false
    });
  });
}

http.request(options, callback).end();
})

module.exports = router;
