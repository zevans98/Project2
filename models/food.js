module.exports = function(sequelize, Sequelize) {
  var Food = sequelize.define("Food", {
    userId: Sequelize.INTEGER,
    food: Sequelize.STRING,
    calories: Sequelize.INTEGER
  });
  return Food;
};
