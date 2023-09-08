"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentTypeDefs = void 0;
exports.commentTypeDefs = `#graphql

    type Comment {
        id: Int
        description: String
        userId: Int
        post(id:Int!): [Post]
        user(id:Int!): User
        reply(id:Int!): [Reply]
        postId: Int
    }

    type Reply{
        description: String
    }
    type Post {
        description: String
    }
    type User {
        fullname: String,
    }

    type Response {
        status_code: Int
        message: String
    }

    input PostCommentInput {
        description: String!
        postId: Int!
    }

    input UpdateCommentInput {
        description: String!
        commentId: Int!
    }

    type Query {
        getComments(id:Int!):[Comment]

    }

    type Mutation {
        createComment(input: PostCommentInput!) : Comment
        updateComment(input: UpdateCommentInput!) : Response
        deleteComment(id: Int!) : Response
    }



`;
//# sourceMappingURL=comments.typeDefs.js.map