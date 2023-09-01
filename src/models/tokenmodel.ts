import { DataTypes  } from '@sequelize/core';
import sequelize from '../config/database';

const tokenModel = sequelize.define<any>("tokenmodel", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

export default tokenModel;
