"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeResolver = void 0;
const models_1 = require("../../models");
const validator_1 = require("../../validator");
const helpers_1 = require("../../helpers");
const models_2 = require("../../models");
const Enum_1 = require("../../Enum");
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
                const { postId, reaction } = args.input;
                console.log(postId, reaction);
                validator_1.idValidator.validate(postId);
                const joinedPost = await models_2.Post.findByPk(postId);
                if (!joinedPost) {
                    throw new Error(`No post available of ${postId} id`);
                }
                const likeExists = await models_1.Like.findOne({
                    where: { postId: postId, userId: context.user?.id },
                });
                if (likeExists) {
                    console.log(likeExists);
                    if (likeExists.dataValues.reactionEnum === "LIKE") {
                        await models_1.Like.destroy({ where: { id: likeExists.dataValues.id } });
                        await joinedPost.decrement("like_count", { by: 1 });
                        return {
                            status_code: helpers_1.status.success.okay,
                            reaction: Enum_1.ReactionEnum.LOVE,
                            message: `Changed reaction to "love" for Post ${postId} `,
                        };
                    }
                    else if (likeExists.dataValues.reactionEnum === "LOVE") {
                        await models_1.Like.destroy({ where: { id: likeExists.dataValues.id } });
                        // console.log("Deleted existing LIKE reaction record");
                        await joinedPost.decrement("like_count", { by: 1 });
                        return {
                            status_code: helpers_1.status.success.okay,
                            reaction: null,
                            message: `Removed reaction for Post ${postId}`,
                        };
                    }
                }
                else {
                    await models_1.Like.create({
                        postId,
                        userId: context.user?.id,
                        reaction_enum: reaction,
                    });
                    await joinedPost?.increment("like_count", { by: 1 });
                    return {
                        status_code: helpers_1.status.success.okay,
                        reaction,
                        message: `Added reaction "${reaction}" for Post ${postId}`,
                    };
                }
            }
            catch (error) {
                return {
                    status_code: helpers_1.status.errors.internalServerError,
                    raction: null,
                    message: `An error occurred: ${error}`,
                };
            }
        },
    },
};
//# sourceMappingURL=likeResolver.js.map