export const postTypeDefs = `#graphql

type Post{
    id:Int!
    userId: Int
   description: String!

}
type User{
    fullname: String!
    email: String!

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
    getAllPosts:[Post]
#     getPostById(post_id:Int!):Post
#     getMyPosts: [Post]
}

type Mutation{
    createPost(input: UploadPostInput): Post
    updatePost(input: UpdatePostInput): Response
    deletePost(postId:Int!):Response
}
 `;