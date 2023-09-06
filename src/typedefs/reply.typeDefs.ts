export const replyTypeDefs = `#graphql

    type Reply {
        id: Int!
        description: String!
        userId: Int!
        comment: Comment
        user: User
        commentId: Int!
    }

    type Comment {
        description: String!
    }
    type User {
        fullname: String!,
    }

    type Response {
        status_code: Int!
        message: String!
    }

    input PostReplyInput {
        description: String!
        postId: Int!
    }

    input UpdateReplyInput {
        description: String!
        commentId: Int!
    }

    type Query {
        getReplies:[Reply]

    }

    type Mutation {
        createReply(input: PostReplyInput!) : Reply
        updateReply(input: UpdateReplyInput!) : Response
        deleteReply(id: Int!) : Response
    }



`;
