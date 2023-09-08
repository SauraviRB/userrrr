import { PostLikeInterface, LikeInterface } from "../interface";
import { MyContext } from "../helpers";
import { Like } from "../models";
import { idValidator } from "../validator";
import { status } from "../helpers";
import { Post ,userModel} from "../models";
export const likeResolver = {
  Query: {
    getLikedPosts: async (
      parent: ParentNode,
      args: { input: LikeInterface },
      context: MyContext
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authorization Header Mising");
        }
        let allLikedPosts = await Like.findAll({
          where: { userId: context.user?.id },
        });

        if (!allLikedPosts || allLikedPosts.length === 0) {
          throw new Error("User has not liked any posts yet");
        }

        return allLikedPosts;
      } catch (error) {
        throw new Error(`Sorry, Couldnt like the post ${error}`);
      }
    },
  },
  Like: {
    user: async (Like: LikeInterface) => await userModel.findByPk(Like.userId),
    post: async (Like: LikeInterface) => await Post.findByPk(Like.postId),
},
  Mutation: {
    postToggleLike: async (
      parent: ParentNode,
      args: { input: PostLikeInterface },
      context: MyContext
    ) => {
      console.log(args.input)
      try {
        if (!context.token) {
          throw new Error("Authorization Header Missing");
        }
        idValidator.validate(args.input.postId);
        const likeExists = await Like.findOne({
          where: { postId: args.input.postId, userId: context.user?.id },
        });
        if (likeExists) {
          if (likeExists.dataValues.isLiked === true) {
            await likeExists.update({ isLiked: false });
            // Find the  post by its primary key (postId)
            const joinedPost = await Post.findByPk(args.input.postId);
            // Decrement the 'likeCount' of the joined post by 1 (if joined Post exists)
            await joinedPost?.decrement("likeCount", { by: 1 });
            return {
              status_code: status.success.okay,
              isLiked: false,
              message: `Like is deleted from Post ${args.input.postId} `,
            };
          }

          await likeExists.update({ isLiked: true });
          const joinedPost = await Post.findByPk(args.input.postId);
          await joinedPost?.increment("likeCount", { by: 1 });
          return {
            status_code: status.success.okay,
            isLiked: true,
            message: `Like is added to Post ${args.input.postId} `,
          };
        }

        const joinedPost = await Post.findByPk(args.input.postId);
        if (!joinedPost)
          throw new Error(`No post available of ${args.input.postId} id`);

        await Like.create({ //saves the likes
          postId: args.input.postId,
          userId: context.user?.id,
        });
        await joinedPost?.increment('likeCount', { by: 1 }) 
            return{
            status_code: status.success.okay,
            isLiked: true,
            message: `Like is added to Post ${args.input.postId} id`,
            }

    } catch (error) {
       return{
            status_code: status.errors.internalServerError,
            isLiked: false,
            message: `An error occurred: ${error}`,    
       }

      }
    },
  },
};