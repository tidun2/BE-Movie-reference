'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LayDanhSachPhims', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maPhim: {
        type: Sequelize.INTEGER
      },
      tenPhim: {
        type: Sequelize.STRING
      },
      biDanh: {
        type: Sequelize.STRING
      },
      trailer: {
        type: Sequelize.STRING
      },
      hinhAnh: {
        type: Sequelize.STRING
      },
      moTa: {
        type: Sequelize.STRING
      },
      ngayKhoiChieu: {
        type: Sequelize.DATE
      },
      danhGia: {
        type: Sequelize.INTEGER
      },
      hot: {
        type: Sequelize.BOOLEAN
      },
      dangChieu: {
        type: Sequelize.BOOLEAN
      },
      sapChieu: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LayDanhSachPhims');
  }
};