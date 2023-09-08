'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class create - reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  create - reply.init({
    id: DataTypes.NUMBER,
    description: DataTypes.STRING,
    user_id: DataTypes.NUMBER,
    comment_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'create-reply',
  });
  return create - reply;
};