"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeResolver = void 0;
const models_1 = require("../../models");
const validator_1 = require("../../validator");
const helpers_1 = require("../../helpers");
const models_2 = require("../../models");
exports.likeResolver = {
    Query: {
    // getLikedPosts: async (
    //   parent: ParentNode,
    //   args: { input: LikeInterface },
    //   context: MyContext
    // ) => {
    //   try {
    //     if (!context.user) {
    //       throw new Error("Authorization Header Mising");
    //     }
    //     let allLikedPosts = await Like.findAll({
    //       where: { userId: context.user?.id },
    //     });
    //     if (!allLikedPosts || allLikedPosts.length === 0) {
    //       throw new Error("User has not liked any posts yet");
    //     }
    //     return allLikedPosts;
    //   } catch (error) {
    //     throw new Error(`Sorry, Couldnt like the post ${error}`);
    //   }
    // },
    },
    Like: {
        user: async (Like) => await models_2.userModel.findByPk(Like.userId),
        post: async (Like) => await models_2.Post.findByPk(Like.postId),
    },
    Mutation: {
        postToggleLike: async (parent, args, context) => {
            console.log(args.input);
            try {
                if (!context.token) {
                    throw new Error("Authorization Header Missing");
                }
                validator_1.idValidator.validate(args.input.postId);
                const likeExists = await models_1.Like.findOne({
                    where: { postId: args.input.postId, userId: context.user?.id },
                });
                if (likeExists) {
                    if (likeExists.dataValues.isLiked === true) {
                        await likeExists.update({ isLiked: false });
                        // Find the  post by its primary key (postId)
                        const joinedPost = await models_2.Post.findByPk(args.input.postId);
                        // Decrement the 'likeCount' of the joined post by 1 (if joined Post exists)
                        await joinedPost?.decrement("likeCount", { by: 1 });
                        return {
                            status_code: helpers_1.status.success.okay,
                            isLiked: false,
                            message: `Like is deleted from Post ${args.input.postId} `,
                        };
                    }
                    await likeExists.update({ isLiked: true });
                    const joinedPost = await models_2.Post.findByPk(args.input.postId);
                    await joinedPost?.increment("likeCount", { by: 1 });
                    return {
                        status_code: helpers_1.status.success.okay,
                        isLiked: true,
                        message: `Like is added to Post ${args.input.postId} `,
                    };
                }
                const joinedPost = await models_2.Post.findByPk(args.input.postId);
                if (!joinedPost)
                    throw new Error(`No post available of ${args.input.postId} id`);
                await models_1.Like.create({
                    //saves the likes
                    postId: args.input.postId,
                    userId: context.user?.id,
                });
                await joinedPost?.increment("likeCount", { by: 1 });
                return {
                    status_code: helpers_1.status.success.okay,
                    isLiked: true,
                    message: `Like is added to Post ${args.input.postId} id`,
                };
            }
            catch (error) {
                return {
                    status_code: helpers_1.status.errors.internalServerError,
                    isLiked: false,
                    message: `An error occurred: ${error}`,
                };
            }
        },
    },
};
//# sourceMappingURL=likeResolver.js.map