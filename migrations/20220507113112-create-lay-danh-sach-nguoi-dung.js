'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LayDanhSachNguoiDungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taiKhoan: {
        type: Sequelize.STRING
      },
      hoTen: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      soDt: {
        type: Sequelize.INTEGER
      },
      matKhau: {
        type: Sequelize.INTEGER
      },
      maLoaiNguoiDung: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      paranoid: true,
    deleteAt: 'destroyTime'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LayDanhSachNguoiDungs');
  }
};