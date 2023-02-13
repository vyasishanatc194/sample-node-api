'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return await queryInterface.createTable('SourceFiles', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      BureauID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bureaus', // 'bureaus' refers to table name
          key: 'ID', // 'ID' refers to column name in fathers table
        }
      },
      FileName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      File: {
        type: Sequelize.BLOB,
        allowNull: true
      },
      isActive: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('SourceFiles')
  }
};
