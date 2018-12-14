var db = require("../models");
var moment = require("moment");

module.exports = function(app) {
  // Get all examples
  app.get("/api/foods", function(req, res) {
    db.Food.findAll({
      where: {
        userId: req.user.id
      },
      order: db.Food.sequelize.literal("date DESC")
    }).then(function(dbFoods) {
      for (var i = 0; i < dbFoods.length; i++) {
        dbFoods[i].dataValues.date = moment(dbFoods[i].dataValues.date).format(
          "dddd, MMM DD, YYYY"
        );
      }
      res.json(dbFoods);
    });
  });

  // Create a new example
  app.post("/api/foods", function(req, res) {
    req.body.userId = req.user.id;
    req.body.date = moment(req.body.date).format("YYYY-MM-DD");
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

app.get('/api/cal',function(req,res) {
db.Food.findAll({ where: { userId: req.user.id , calories:{gt:1}} }).then(function(dbFood){
  res.json(dbFood);
 });
});

