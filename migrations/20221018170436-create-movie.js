'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      movieName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER
      },
      cast: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      genre: {
        type: DataTypes.STRING
      },
      releaseDate: {
        type: DataTypes.DATE
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      movieStatus: {
        type: DataTypes.ENUM('active','deleted'),
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  }
};