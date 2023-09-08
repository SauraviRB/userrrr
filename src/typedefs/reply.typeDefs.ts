export const replyTypeDefs = `#graphql

    type Reply {
        id: Int!
        description: String!
        userId: Int!
        comment(id:Int!): [Comment]
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
        commentId: Int!
    }

    input UpdateReplyInput {
        description: String!
        replyId: Int!
    }

    type Query {
        getReplies(id:Int!):[Reply]

    }

    type Mutation {
        createReply(input: PostReplyInput!) : Reply
        updateReply(input: UpdateReplyInput!) : Response
        deleteReply(id: Int!) : Response
    }



`;
