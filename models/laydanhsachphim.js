"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LayDanhSachPhim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //!1 movie có nhiều user thông qa ticket, 1 user có thể xem nhiều phim, mà 1 phim cũng có thể xem bởi nhiều user
    static associate({ LayDanhSachNguoiDung, Ticket }) {
      this.belongsToMany(LayDanhSachNguoiDung, { through: Ticket });
    }
  }
  LayDanhSachPhim.init(
    {
      maPhim: DataTypes.INTEGER,
      tenPhim: DataTypes.STRING,
      biDanh: DataTypes.STRING,
      trailer: DataTypes.STRING,
      hinhAnh: DataTypes.STRING,
      moTa: DataTypes.STRING,
      ngayKhoiChieu: DataTypes.DATE,
      danhGia: DataTypes.INTEGER,
      hot: DataTypes.BOOLEAN,
      dangChieu: DataTypes.BOOLEAN,
      sapChieu: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "LayDanhSachPhim",
    }
  );
  return LayDanhSachPhim;
};
