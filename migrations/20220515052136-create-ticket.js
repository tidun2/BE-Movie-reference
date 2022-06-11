'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      //!liên kết NHIỀU-NHIỀU
      userId: {
        type: Sequelize.INTEGER,
        //tham chiếu tới:
        references: {
          model: "LayDanhSachNguoiDungs",
          key: "id",
        }
      },
      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: "LayDanhSachPhims",
          key: "id",
        }
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
    await queryInterface.dropTable('Tickets');
  }
};