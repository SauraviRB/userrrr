import { Model } from "sequelize";

export interface ReplyInterface extends Model{
    commentId:number,
    description:string,
    userId:number,
}

export interface UpdateReplyInterface {
    description: string,
    userId: number
}