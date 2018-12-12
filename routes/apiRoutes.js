var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/foods", function(req, res) {
    db.Food.findAll({
      where: {
        userId: req.user.id
      }
    }).then(function(dbFoods) {
      res.json(dbFoods);
    });
  });

  // Create a new example
  app.post("/api/foods", function(req, res) {
    req.body.userId = req.user.id;
    db.Food.create(req.body).then(function(dbFood) {
      res.json(dbFood);
    });
  });

  // Delete an example by id
  app.delete("/api/foods/:id", function(req, res) {
    db.Food.destroy({ where: { id: req.params.id } }).then(function(dbFood) {
      res.json(dbFood);
    });
  });
};
