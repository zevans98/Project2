var db = require("../models");

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
  app.get("/entry/:id", function(req, res) {
    db.Food.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
