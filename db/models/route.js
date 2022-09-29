const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like, Review }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userid' });
      this.hasMany(Like, { foreignKey: 'routeid' });
      this.hasMany(Review, { foreignKey: 'routeid' });
    }
  }
  Route.init({
    title: DataTypes.STRING,
    length: DataTypes.STRING,
    city: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    startX: DataTypes.DECIMAL,
    startY: DataTypes.DECIMAL,
    endX: DataTypes.DECIMAL,
    endY: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};
