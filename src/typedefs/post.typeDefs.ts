export const postTypeDefs = `#graphql

type Post{
    id:Int!
    userId: Int
   description: String!
   user(id:Int!):[User]
   comment(id:Int!):[Comment]


}
type Comment{
    description:String
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
