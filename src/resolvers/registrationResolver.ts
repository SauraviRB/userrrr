import { bcrypt } from 'bcrypt';
import usermodel from "../models/usermodel";
import { GraphQLError } from "graphql";
import { UserInterface } from './../interface/userInterface';


// const { bcrypt } = pkg;
export const registerResolvers = {
  Mutation: {
    registerUser: async (_: any, args: any, { UserInterface }: any) => {
      const {
        registerInput: { username, email, password },
      } = args;

      // create : async ( args)=>{
      //   function registerUser ({registerInput:{username,email,password,token}}){
      const existingUser = UserInterface.find(
        (UserInterface) => UserInterface.username === username || UserInterface.email === email
      );
      if (existingUser) {
        throw new GraphQLError("the password didnt match");
      } else {
        try {
          var encryptedPassword = await bcrypt.hash(password, 10);
          
          const registerUser = { username, email, password };
          return registerUser;
          //  User.push(newUser);
        } catch (error) {
          console.log(error);
          throw new GraphQLError("no new user");
        }

      }
      //  async (parent, args, context) => {
      //   const { username, email, password } = args.registerInput;
      //   return await userModel.create({  username, email, password });
      // },
    },
  },
};
