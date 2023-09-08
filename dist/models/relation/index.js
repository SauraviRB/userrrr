"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// User and Post association
index_1.userModel.hasMany(index_1.Post, {
    foreignKey: "user_id",
    as: "posts", //named as reference
});
index_1.Post.belongsTo(index_1.userModel, {
    foreignKey: "user_id",
    as: "user",
});
//user and comment association
index_1.userModel.hasMany(index_1.Comment, {
    foreignKey: "user_id",
    as: "comments",
});
index_1.Comment.belongsTo(index_1.userModel, {
    foreignKey: "user_id",
    as: " user",
});
// Post and Comment association
index_1.Post.hasMany(index_1.Comment, {
    foreignKey: "post_id",
    as: "comments",
});
index_1.Comment.belongsTo(index_1.Post, {
    foreignKey: "post_id",
    as: "post",
});
// User and Reply association
index_1.userModel.hasMany(index_1.Reply, {
    foreignKey: "user_id",
    as: "replies",
});
index_1.Reply.belongsTo(index_1.userModel, {
    foreignKey: "user_id",
    as: "user",
});
// Comment and Reply association
index_1.Comment.hasMany(index_1.Reply, {
    foreignKey: "comment_id",
    as: "replies",
});
index_1.Reply.belongsTo(index_1.Comment, {
    foreignKey: "comment_id",
    as: "comment",
});
// User and Like association
index_1.userModel.hasOne(index_1.Like, {
    foreignKey: "user_id",
    as: "like",
});
index_1.Like.belongsTo(index_1.userModel, {
    foreignKey: "user_id",
    as: "user",
});
// Post and Like association
index_1.Post.hasMany(index_1.Like, {
    foreignKey: "post_id",
    as: "likes",
});
index_1.Like.belongsTo(index_1.Post, {
    foreignKey: "post_id",
    as: "post",
});
//in userModel.js
index_1.userModel.belongsToMany(index_1.Comment, {
    through: index_1.Reply,
    foreignKey: "user_id",
    otherKey: "comment_id",
    as: "reply",
});
//# sourceMappingURL=index.js.map