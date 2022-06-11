'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LayDanhSachBanner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LayDanhSachBanner.init({
    maBanner: DataTypes.INTEGER,
    maPhim: DataTypes.INTEGER,
    hinhAnh: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LayDanhSachBanner',
  });
  return LayDanhSachBanner;
};