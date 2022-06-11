'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('LayDanhSachNguoiDungs', [{
        taiKhoan: "haoadmin - seeder",
        hoTen: "Hào Nguyễn - seeder",
        email: "babyloveyou@gmail.com",
        soDt: 909090909,
        matKhau: 123456789,
        maLoaiNguoiDung: "QuanTri",
        createdAt: new Date(),
        updatedAt: new Date(),
     }],{});  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
