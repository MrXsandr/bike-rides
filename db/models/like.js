const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
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
  Like.init({
    userid: DataTypes.INTEGER,
    routeid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
