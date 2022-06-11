'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LayDanhSachLoaiNguoiDung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LayDanhSachLoaiNguoiDung.init({
    maLoaiNguoiDung: DataTypes.STRING,
    tenLoai: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LayDanhSachLoaiNguoiDung',
  });
  return LayDanhSachLoaiNguoiDung;
};