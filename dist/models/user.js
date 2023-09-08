"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dist/models/userModel.js
const core_1 = require("@sequelize/core");
const database_js_1 = __importDefault(require("../config/database.js"));
const userModel = database_js_1.default.define("users", {
    id: {
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: core_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: core_1.DataTypes.DATE,
        field: "created_at",
    },
    updatedAt: {
        type: core_1.DataTypes.DATE,
        field: "updated_at",
    },
}, {
    tableName: "users",
    timestamps: true,
});
exports.default = userModel;
//# sourceMappingURL=user.js.map