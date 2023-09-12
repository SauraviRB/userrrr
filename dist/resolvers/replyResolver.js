"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyResolver = void 0;
const service_1 = require("../service");
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const validator_1 = require("../validator");
exports.replyResolver = {
    Query: {
        getReplies: async (parent, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authorization header missing");
                }
                let allReplies = await new service_1.ReplyService(models_1.Reply).findAll();
                return allReplies;
            }
            catch (error) {
                throw new Error(`error whille recieving ${error}`);
            }
        },
        getReplyById: async (parents, args, context) => {
            try {
                const { id } = args;
                const reply = await models_1.Reply.findOne({ where: { id } });
                return reply;
            }
            catch (error) {
                console.log(`User not found ${error}`);
            }
        }
    },
    Reply: {
    // user: async (Reply: ReplyInterface) => await userModel.findByPk(Reply.userId),
    // comment: async (Reply: ReplyInterface) => await Comment.findByPk(Reply.commentId),
    },
    Mutation: {
        createReply: async (parent, args, context) => {
            try {
                if (!context.token || !context.user)
                    throw new Error("Authorization header is missing");
                validator_1.postReplyValidator.validate(args.input);
                const comment = await models_1.Comment.findByPk(args.input.commentId);
                if (!comment)
                    throw new Error(`No post with id: ${args.input.commentId} exists`);
                const newReply = await new service_1.ReplyService(models_1.Reply).create({
                    description: args.input.description,
                    commentId: args.input.commentId,
                    userId: context.user.id,
                });
                console.log("New reply created");
                return newReply;
            }
            catch (error) {
                throw new Error(`Error adding new reply: ${error}`);
            }
        },
        updateReply: async (parent, args, context) => {
            try {
                if (!context.token || !context.user)
                    throw new Error("Authorization header is missng");
                validator_1.updateReplyValidator.validate(args.input);
                const { replyId, description } = args.input;
                const reply = await new service_1.ReplyService(models_1.Reply).findByPk(replyId);
                const updatedReply = await new service_1.ReplyService(models_1.Reply).update({ replyId: args.input.replyId }, { description: args.input.description });
                if (updatedReply) {
                    return {
                        status_code: helpers_1.status.success.okay,
                        message: `Comment with id ${replyId} is updated successfully`,
                    };
                }
                else {
                    return {
                        status_code: helpers_1.status.errors.badRequest,
                        message: `Comment with id ${replyId} is updated successfully`,
                    };
                }
            }
            catch (error) {
                throw new Error(`Error adding new comment: ${error}`);
            }
        },
        deleteReply: async (parent, args, context) => {
            try {
                if (!context.user)
                    throw new Error("Authorization header is required");
                const { id } = args;
                const { error } = validator_1.deleteReplyValidator.validate({ id });
                if (error)
                    throw error;
                // const post = await new PostService(Post).findOne({id})
                // console.log(post)
                const deletedPost = await new service_1.ReplyService(models_1.Reply).delete({
                    id,
                    userId: context.user.id,
                });
                console.log(deletedPost);
                if (!deletedPost)
                    throw new Error(` you cannot delete this post or it doesnt belongs to you
                  : ${id}`);
                return {
                    status_code: helpers_1.status.success.okay,
                    message: `Post with id ${id} is deleted successfully`,
                };
            }
            catch (error) {
                console.log(error.message);
                throw new Error(`Error while deleting the post: ${error}`);
            }
        }
    },
};
//# sourceMappingURL=replyResolver.js.map