"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LayDanhSachNguoiDung extends Model {
    //!password mình signin : so sáh với password mình gửi lên giống nhau hay ko -> mà xoá mất tiêu password rồi , làm sao so?? => ko làm z
    //!=> toJSON: là 1 function ko có params
    // toJSON(){
    //!assign: gắn tất cả những data lấy từ hàm this.get: là 1 method trong class Model này
    // const attributes = Object.assign({}, this.get());//this.get()=> trả về 1object đầy đủ các field của 1user
    // delete attributes.matKhau;
    // return attributes;
    //! => cách remove 1 field(key) ra nhưng khi cần vẫn đọc được, cách để ko trả về cái field password cho FE , nhưng field này khi cần mình vẫn đọc đc
    // }
    static associate({ Avatar, LayDanhSachPhim, Ticket }) {
      //1user có nhìu avatar: hasMany, 1 avatar: hasOne
      this.hasMany(Avatar, {
        foreignKey: "userId", //của bên Avatar
        as: "avatars", //alias: đổi tên trong postman từ Avatar -> avatars
      });
      this.hasOne(Avatar, {
        foreignKey: "userId",
        as: "avatar",
      });
      //1user có thể xem nhiều phim, thông qua nhiều ticket
      this.belongsToMany(LayDanhSachPhim, {
        through: Ticket,//thôg qua bảng Ticket
        as: "moviesWatched"
      });
    }
  }
  LayDanhSachNguoiDung.init(
    {
      taiKhoan: DataTypes.STRING,
      hoTen: DataTypes.STRING,
      email: DataTypes.STRING,
      soDt: DataTypes.INTEGER,
      matKhau: DataTypes.INTEGER,
      maLoaiNguoiDung: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LayDanhSachNguoiDung",
      // paranoid: true, //tự gắn thêm
      // deletedAt: "destroyTime",
    }
  );
  return LayDanhSachNguoiDung;
};
