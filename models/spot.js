'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init({
    name: DataTypes.STRING,
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    cycle_access: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};