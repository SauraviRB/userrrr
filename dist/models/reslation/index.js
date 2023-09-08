"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// User and Post association
index_1.userModel.hasMany(index_1.Post, {
    foreignKey: 'user_id',
    as: 'posts', //named as reference 
});
index_1.Post.belongsTo(index_1.userModel, {
    foreignKey: 'user_id',
    as: 'user',
});
//# sourceMappingURL=index.js.map