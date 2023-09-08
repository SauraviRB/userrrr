"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReplyValidator = exports.updateReplyValidator = exports.postReplyValidator = exports.deleteCommentValidator = exports.updateCommentValidator = exports.postCommentValidator = exports.idValidator = exports.UpdatePostValidator = exports.createPostValidator = exports.getPostByIdValidate = exports.LoginSchema = exports.registerValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidate = joi_1.default.object({
    fullname: joi_1.default
        .string()
        .label("FULLNAME")
        .min(3)
        .max(30)
        .required()
        .regex(/^[A-Za-z\s]+$/)
        .messages({
        "string.pattern.base": "{{#label}} must contain alphabetic characters only",
    }),
    email: joi_1.default.string().label("EMAIL").email().required(),
    password: joi_1.default
        .string()
        .label("PASSWORD")
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(4)
        .max(8)
        .required(),
});
exports.LoginSchema = joi_1.default.object({
    email: joi_1.default.string().label("Email").email().required(),
    password: joi_1.default.string().label("Password").required(),
});
exports.getPostByIdValidate = joi_1.default.object().keys({
    postId: joi_1.default.number().label("post_id").required(),
});
exports.createPostValidator = joi_1.default.object({
    description: joi_1.default.string().min(3).max(500),
});
exports.UpdatePostValidator = joi_1.default.object({
    postId: joi_1.default.number().required().label("post id"),
    description: joi_1.default.string().min(3).max(500),
});
exports.idValidator = joi_1.default.object({
    id: joi_1.default.number().required().label("post id"),
});
exports.postCommentValidator = joi_1.default.object({
    postId: joi_1.default.number().required().label("post id"),
    description: joi_1.default.string().min(3).max(500),
});
exports.updateCommentValidator = joi_1.default.object({
    commentId: joi_1.default.number().required().label("comment id"),
    description: joi_1.default.string().min(3).max(500),
});
exports.deleteCommentValidator = joi_1.default.object({
    id: joi_1.default.number().label("comment id").required(),
});
exports.postReplyValidator = joi_1.default.object({
    postId: joi_1.default.number().required().label("reply id"),
    description: joi_1.default.string().min(3).max(500),
});
exports.updateReplyValidator = joi_1.default.object({
    replyId: joi_1.default.number().required().label("reply id"),
    description: joi_1.default.string().min(3).max(500),
});
exports.deleteReplyValidator = joi_1.default.object({
    id: joi_1.default.number().label("reply id").required(),
});
//# sourceMappingURL=validatorInput.js.map