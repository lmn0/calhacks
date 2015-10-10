/*
  This module is used for handling authentication related actions
*/

// Node modules
var express = require('express'),
    async = require("async"),
    router = express.Router(),
    passport=require("passport"),
    Api = require("../../api"),
    r = require("../../lib/request");
// ===

var Authentication = {
  login: function(req, res, r_type, cb) {
    switch(r_type) {
      case "PUT":
        // Api.login(req.body, res, cb);
        // //alert("hey");
        
        break;

      default:
        res.status(400)
           .render("error", {
              pageTitle: "pyCloud! - Error",
              errCode: 400,
              errMsg: "Invalid request"
            });
        break;
    }
  }
};

// GET requests
router.get(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;
  switch(action) {
    case "register":
      res.status(200).render("authentication/login.jade", {
        pageTitle: "pyCloud! - Login",
        showRegister: true
      });
      break;

    default:
      res.status(200).render("authentication/login.jade", {
        pageTitle: "pyCloud! - Login",
        showRegister: false
      });
  }
  return next();
});
// ====

// POST requests
router.post(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;

  // if(Authentication.hasOwnProperty(action)) {
  //   Authentication[action].call(this, req, res, "PUT",
  //   function(err, resp, body) {
  //       if(err) {
  //         res.status(500).json({"errors" : ["Internal Server error"]});
  //       } else {
  //         res.status(200).json(body);
  //       }
  //       next();
  //   });
passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/chat/' + user.username);
    });
  })(req,res,next);
  
  // else {
  //   res.status(404)
  //      .render("404.jade", {
  //         pageTitle: "pyCloud!"
  //   });
  //   return next();
  // }
});
// ====

module.exports = router;
