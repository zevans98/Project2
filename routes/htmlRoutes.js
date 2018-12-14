var db = require("../models");
var auth = require("./auth.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Food.findAll({}).then(function(dbFoods) {
      res.render("index", {
        msg: "Welcome!",
        entry: dbFoods
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/entry/:id", isLoggedIn, function(req, res) {
    db.Food.findOne({ where: { id: req.params.id } }).then(function(dbFoods) {
      res.render("entry", {
        entry: dbFoods.dataValues
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/signin");
}