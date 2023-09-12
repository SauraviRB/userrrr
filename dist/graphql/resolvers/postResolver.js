"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const models_1 = require("../../models");
const validator_1 = require("../../validator");
const status_code_1 = require("../../helpers/status_code");
const service_1 = require("../../service");
const validatorInput_1 = require("../../validator/validatorInput");
exports.postResolver = {
    Query: {
        getAllPosts: async (parent, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authorization header Missing");
                }
                const allPost = await new service_1.PostService(models_1.Post).findAll({ user_id: context.user.id });
                return allPost;
            }
            catch (error) {
                throw new Error(`Error while retrieving all posts: ${error}`);
            }
        },
        getPostById: async (parent, args, context) => {
            try {
                const { id } = args;
                const post = await models_1.Post.findOne({ where: { id } });
                return post;
            }
            catch (error) {
                console.log(`User not found ${error}`);
            }
        },
    },
    Post: {
        // user: async (Post: PostInterface) => await userModel.findByPk(Post.userId),
        comments: async (post) => await models_1.Comment.findAll({ where: { postId: post.id } }),
    },
    Mutation: {
        createPost: async (parent, args, context) => {
            try {
                if (!context.user) {
                    throw new Error("Authorization header Misiing");
                }
                const { error } = validator_1.createPostValidator.validate(args.input);
                if (error)
                    throw error;
                const { description } = args.input;
                const newPost = await new service_1.PostService(models_1.Post).create({
                    description,
                    userId: context.user.id,
                    isLiked: true,
                });
                // if (newPost) {
                //   newPost.dataValues.isLiked = true;
                //   dataValue.push(newPost.dataValues);
                // } else {
                //   id[i].dataValues.is_liked = false;
                //   dataValue.push(id[i].dataValues);
                // }
                // return dataValue;
                return newPost;
            }
            catch (error) {
                console.error("Error adding new post: ", error);
                return error;
            }
        },
        updatePost: async (parent, args, context) => {
            try {
                if (!context.user)
                    throw new Error("Authorization header is required");
                const { error } = validator_1.UpdatePostValidator.validate(args.input);
                if (error)
                    throw error;
                const { description, postId } = args.input;
                // await Post.update(
                //   { description },
                //   {
                //     where: {
                //       id: postId,
                //     },
                //   }
                // );
                let updatePost = await new service_1.PostService(models_1.Post).update({ id: postId }, // Condition for which post to update
                { description } // Updated values
                );
                return {
                    status_code: status_code_1.status.success.okay,
                    message: `Post with id ${postId} is updated successfully`,
                };
            }
            catch (error) {
                console.log(`Error while updating post: ${error}`);
                throw new Error(`Error while updating the post: ${error}`);
            }
        },
        deletePost: async (parent, args, context) => {
            try {
                if (!context.user)
                    throw new Error("Authorization header is required");
                const { id } = args;
                const { error } = validatorInput_1.idValidator.validate({ id });
                if (error)
                    throw error;
                // const post = await new PostService(Post).findOne({id})
                // console.log(post)
                const deletedPost = await new service_1.PostService(models_1.Post).delete({
                    id,
                    userId: context.user.id,
                });
                console.log(deletedPost);
                if (!deletedPost)
                    throw new Error(` you cannot delete this post
              : ${id}`);
                return {
                    status_code: status_code_1.status.success.okay,
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
//# sourceMappingURL=postResolver.js.map