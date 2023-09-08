// dist/models/userModel.js
import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database";
import { Comment, userModel } from ".";

export const Reply = sequelize.define(
  "reply",
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
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "comment_id",
      references: {
        model: Comment,
        key: "id",
      },
    },
  },
  {
    tableName: "reply",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
