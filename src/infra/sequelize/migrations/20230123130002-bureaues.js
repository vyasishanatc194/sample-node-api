'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return await queryInterface.createTable('bureaus', {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // 'users' refers to table name
          key: 'ID', // 'id' refers to column name in fathers table
        }
      },
      PrimaryContact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PrimaryContactPhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PrimaryContactMobile: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      City: {
        type: Sequelize.STRING,
        allowNull: true
      },
      State: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Zip: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      EmployerCount:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    return await queryInterface.dropTable('bureaus')
  }
};
