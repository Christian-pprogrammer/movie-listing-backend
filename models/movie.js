'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Movie.init({
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
      type: DataTypes.NUMBER
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
    }
  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
  });
  return Movie;
};