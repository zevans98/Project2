var exports = (module.exports = {});
var db = require("../models");

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("signin");
};

exports.dashboard = function(req, res) {
  db.Food.findAll({
    where: {
      userId: req.user.id
    }
  }).then(function(dbExamples) {
    res.render("index", {
      msg: "Welcome!",
      entries: dbExamples
    });
  });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/signin");
  });
};
