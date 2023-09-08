"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = exports.Reply = exports.Comment = exports.Post = exports.userModel = void 0;
const like_1 = require("./like");
Object.defineProperty(exports, "Like", { enumerable: true, get: function () { return like_1.Like; } });
const reply_1 = require("./reply");
Object.defineProperty(exports, "Reply", { enumerable: true, get: function () { return reply_1.Reply; } });
const comment_1 = require("./comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return comment_1.Comment; } });
const user_1 = __importDefault(require("./user"));
exports.userModel = user_1.default;
const post_1 = require("./post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return post_1.Post; } });
//# sourceMappingURL=index.js.map