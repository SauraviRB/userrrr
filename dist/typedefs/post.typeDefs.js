"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTypeDefs = void 0;
exports.postTypeDefs = `#graphql

type Post{
    id:Int!
    userId: Int
   description: String!
   comment(id:Int!): [Comment]
   user: User
   reply:[Reply]

}
type User{
    fullname: String!
    email: String!

}
type Comment{
    description: String
}
type Reply{
    description: String
}
input GetAllPostInput{
    user: Int!
    token: String!
}
input UpdatePostInput{
    description: String!,
    postId: Int!,
}
input UploadPostInput{
    description: String!,
}

type Response{
    status_code:Int
    message: String
}

type Query{
    getAllPosts(id:Int!):[Post]
#     getPostById(post_id:Int!):Post
#     getMyPosts: [Post]
}

type Mutation{
    createPost(input: UploadPostInput): Post
    updatePost(input: UpdatePostInput): Response
    deletePost(id:Int!):Response
}
 `;
//# sourceMappingURL=post.typeDefs.js.map