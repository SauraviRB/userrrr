"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
// dist/models/userModel.js
const core_1 = require("@sequelize/core");
const database_js_1 = __importDefault(require("../config/database.js"));
const user_js_1 = __importDefault(require("./user.js"));
const comment_js_1 = require("./comment.js");
exports.Reply = database_js_1.default.define("reply", {
    id: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
            model: user_js_1.default,
            key: "id",
        },
    },
    commentId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        field: "comment_id",
        references: {
            model: comment_js_1.Comment,
            key: "id",
        },
    },
}, 
// createdAt: {
//   type: DataTypes.DATE,
//   field: "created_at",
// },
// updatedAt: {
//   type: DataTypes.DATE,
//   field: "updated_at",
// },
// deletedAt: {
//   type: DataTypes.BOOLEAN,
//   field: "deleted_at",
// },
{
    tableName: "reply",
    timestamps: true,
    paranoid: true,
    underscored: true,
});
//# sourceMappingURL=reply.js.map