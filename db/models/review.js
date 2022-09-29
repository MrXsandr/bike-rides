const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Route }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userid' });
      this.belongsTo(Route, { foreignKey: 'routeid' });
    }
  }
  Review.init({
    userid: DataTypes.INTEGER,
    routeid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
