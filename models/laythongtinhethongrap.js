'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LayThongTinHeThongRap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LayThongTinHeThongRap.init({
    maHeThongRap: DataTypes.STRING,
    tenHeThongRap: DataTypes.STRING,
    biDanh: DataTypes.STRING,
    logo: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'LayThongTinHeThongRap',
  });
  return LayThongTinHeThongRap;
};