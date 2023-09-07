export const commentTypeDefs = `#graphql

    type Comment {
        id: Int!
        description: String!
        userId: Int!
        post: Post
        user: User
        postId: Int!
    }

    type Post {
        description: String!
    }
    type User {
        fullname: String!,
    }

    type Response {
        status_code: Int!
        message: String!
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
        getComments:[Comment]

    }

    type Mutation {
        createComment(input: PostCommentInput!) : Comment
        updateComment(input: UpdateCommentInput!) : Response
        deleteComment(id: Int!) : Response
    }



`;
