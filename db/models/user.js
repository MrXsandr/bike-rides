const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Route, Like, Review }) {
      // define association here
      this.hasMany(Route, { foreignKey: 'userid' });
      this.hasMany(Like, { foreignKey: 'userid' });
      this.hasMany(Review, { foreignKey: 'userid' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
