"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const index_js_1 = require("./index.js");
const sequelize = new core_1.Sequelize(index_js_1.db.name, index_js_1.db.username, index_js_1.db.password, {
    dialect: "postgres",
    host: index_js_1.db.host,
    port: index_js_1.db.port,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map