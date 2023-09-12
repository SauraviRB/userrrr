"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const core_1 = require("@sequelize/core");
const database_js_1 = __importDefault(require("../config/database.js"));
const user_js_1 = __importDefault(require("./user.js"));
const post_js_1 = require("./post.js");
exports.Like = database_js_1.default.define("like", {
    id: {
        type: core_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        columnName: "user_id",
        references: {
            model: user_js_1.default,
            key: "id",
        },
    },
    postId: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: post_js_1.Post,
            key: "id",
        },
    },
    isLiked: {
        type: core_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    reactionEnum: {
        type: core_1.DataTypes.ENUM("LIKE", "LOVE"),
        allowNull: false,
        defaultValue: "LIKE",
    },
}, {
    tableName: "like",
    timestamps: true,
    underscored: true,
});
//# sourceMappingURL=like.js.map