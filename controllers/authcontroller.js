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
    },
    order: db.Food.sequelize.literal("date DESC")
  }).then(function(data) {
    res.render("index", {
      entries: data
    });
  });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/signin");
  });
};
