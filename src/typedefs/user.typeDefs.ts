export const userTypedefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: Int
    fullname: String
    email: String
    password: String
   
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  input RegisterInput{
    fullname: String
    email: String
    password: String
  }
  input LoginInput{
    email:String
    password:String
  }
  input EmailVerify{
    email: String
  }
  type Query {
  getAllusers: [User]
    
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