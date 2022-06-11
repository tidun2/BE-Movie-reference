'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Avatars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        //!tạo -> tham chiếu tới LayDanhSachNguoiDung
        //!=> CÁCH LIÊN KẾT 1-NHIỀU
        references:{
          model: "LayDanhSachNguoiDungs",//tên bảng tham chiếu đến 
          key: "id",
        } 
      },
      isActive: {
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
    await queryInterface.dropTable('Avatars');
  }
};