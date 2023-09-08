// dist/models/userModel.js
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";
import userModel from "./user.js";

export const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: userModel,
        key: "id",
      },
    
  
    },
    likeCount:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull:false,
    }
  },
  {
    tableName: "post",
    timestamps: true,
    paranoid: true,
    underscored:true,
  }
);
