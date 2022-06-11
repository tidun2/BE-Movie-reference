const {LayDanhSachNguoiDung} = require("../../models");

const graphqlResolvers = {
  async getAllUser() {
    try {
      const userList = await LayDanhSachNguoiDung.findAll();
      return userList;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getUserByTaiKhoan(params) {
    const taiKhoan = params?.taiKhoan
    try {
        const user = User.findByPk(taiKhoan);
        return user;
    } catch (error) {
        throw new Error(error);
    }
  },
};
module.exports= graphqlResolvers;