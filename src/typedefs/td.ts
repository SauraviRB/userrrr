import { User } from "./../Users.js";
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    username: String
    email: String
    password: String
   
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  input RegisterInput{
    username: String
    email: String
    password: String
  }
  input LoginInput{
    email:String
    password:String
  }
  type Query {
    users: [User]
    
  }
  type Mutation{
    registerUser(registerInput:RegisterInput):User
    # loginUser(loginInput:LoginInput):User
  }
`;
