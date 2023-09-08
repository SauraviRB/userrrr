import { Post, Comment, Reply } from "../models";
export const userTypedefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: Int
    fullname: String
    email: String
    password: String
    post(id:Int!):[Post]
    reply(id:Int!):[Reply]

   
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Reply{
    description:String
  }
  input RegisterInput{
    fullname: String
    email: String
    password: String
  }
  input LoginInput{
    email:String
    password:String
  }
  type Query {
    getAllUsers(id:Int!): [User]
    
  }
 
  type LoginResponse{
        email: String
        status_code: Int
        token: String
        message: String
        expiresIn:String
  }
  type registrationResponse{
    fullname: String
    email: String
  }
  type Mutation{
    registerUser(registerInput:RegisterInput):registrationResponse
    loginUser(loginInput:LoginInput):LoginResponse
  }
  # type Mutation {
  # logout: LogoutResponse!
  # }

  # type LogoutResponse {
  # success: Boolean!
  # message: String
  # }

`;
