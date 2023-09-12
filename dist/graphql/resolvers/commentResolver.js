"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResolver = void 0;
const validator_1 = require("../../validator");
const models_1 = require("../../models");
const service_1 = require("../../service");
const helpers_1 = require("../../helpers");
exports.commentResolver = {
    Query: {
        getComments: async (parent, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authorization header missing");
                }
                let allComment = await new service_1.CommentService(models_1.Comment).findAll();
                return allComment;
            }
            catch (error) {
                throw new Error(`error whille recieving ${error}`);
            }
        },
        getCommentById: async (parents, args, context) => {
            try {
                const { id } = args;
                const comment = await models_1.Comment.findOne({ where: { id } });
                return comment;
            }
            catch (error) {
                console.log(`User not found ${error}`);
            }
        },
    },
    Comment: {
        // user: async (comment: CommentInterface) =>
        //   await userModel.findByPk(comment.userId),
        // post: async (comment: CommentInterface) =>
        //   await Post.findByPk(comment.postId),
        replies: async (comment) => await models_1.Reply.findAll({ where: { commentId: comment.id } }),
    },
    Mutation: {
        createComment: async (parent, args, context) => {
            try {
                if (!context.token || !context.user)
                    throw new Error("Authorization header is missing");
                validator_1.postCommentValidator.validate(args.input);
                const post = await models_1.Post.findByPk(args.input.postId);
                if (!post)
                    throw new Error(`No post with id: ${args.input.postId} exists`);
                const newComment = await new service_1.CommentService(models_1.Comment).create({
                    description: args.input.description,
                    postId: args.input.postId,
                    userId: context.user.id,
                });
                console.log("New comment created");
                return newComment;
            }
            catch (error) {
                throw new Error(`Error adding new comment: ${error}`);
            }
        },
        updateComment: async (parent, args, context) => {
            try {
                if (!context.token || !context.user)
                    throw new Error("Authorization header is missng");
                validator_1.updateCommentValidator.validate(args.input);
                const { commentId, description } = args.input;
                const comment = await new service_1.CommentService(models_1.Comment).findByPk(commentId);
                const updatedComment = await new service_1.CommentService(models_1.Comment).update({ commentId: args.input.commentId }, { description: args.input.description });
                if (updatedComment) {
                    return {
                        status_code: helpers_1.status.success.okay,
                        message: `Comment with id ${commentId} is updated successfully`,
                    };
                }
                else {
                    return {
                        status_code: helpers_1.status.errors.badRequest,
                        message: `Comment with id ${commentId} is updated successfully`,
                    };
                }
            }
            catch (error) {
                throw new Error(`Error adding new comment: ${error}`);
            }
        },
        deleteComment: async (parent, args, context) => {
            try {
                if (!context.user)
                    throw new Error("Authorization header is required");
                const { id } = args;
                const { error } = validator_1.deleteCommentValidator.validate({ id });
                if (error)
                    throw error;
                // const post = await new PostService(Post).findOne({id})
                // console.log(post)
                const deletedPost = await new service_1.CommentService(models_1.Comment).delete({
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
        },
    },
};
//# sourceMappingURL=commentResolver.js.map