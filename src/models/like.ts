import { DataTypes } from "@sequelize/core";
import sequelize from "../config/database.js";
import userModel from "./user.js";
import { Post } from "./post.js";
import { ReactionEnum } from "../Enum/reactionEnum.js";

export const Like = sequelize.define(
  "like",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
    isLiked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    reactionEnum: {
      type: DataTypes.ENUM("LIKE", "LOVE"),
      allowNull: false,
      defaultValue: ReactionEnum.LIKE,
    },
  },

  {
    tableName: "like",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
