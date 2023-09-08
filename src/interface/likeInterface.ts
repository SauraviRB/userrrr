import { ReactionEnum } from "../Enum";
import { Model } from "sequelize";

export interface LikeInterface extends Model {
  id: number;
  userId: number;
  postId: number;
}
export interface PostLikeInterface {
  postId: number;
  ReactionEnum: ReactionEnum;
}