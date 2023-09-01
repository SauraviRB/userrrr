// import { User } from "../Users.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import UserModel from "../models/usermodel.js";
import sequalize, { Model } from "@sequelize/core";
import userModel from "../models/usermodel";

// const { bcrypt } = pkg;
export const userResolvers = {
  Query: {
    user: async (parent, args, context) => {
      const { id } = args;
      return await userModel.findOne(id);
    },
    users: async (parent, args, context) => {
      return await userModel.findAll();
    },
  },
  Mutation: {
    registerUser: async (parent, args, context) => {
      const { username, email, password } = args.registerInput;
      return await userModel.create({  username, email, password });
    },
  },
};

// Mutation: {
//   registerUser: async (_: any, args: any, { UserModel }: any) => {
//     const {
//       registerInput: { username, email, password },
//     } = args;

//     // create : async ( args)=>{
//     //   function registerUser ({registerInput:{username,email,password,token}}){
//     const existingUser = User.find(
//       (User) => User.username === username || User.email === email
//     );
//     if (existingUser) {
//       throw new ApolloError(" nota new user" + email + "exists");
//     } else {
//       try {
//         var encryptedPassword = await bcrypt.hash(password, 10);
//         // const newUser = await userModel.create({
//         //   username: username,
//         //   email: email,
//         //   password: encryptedPassword,
//         //   // token :token,
//         // });
//         const newUser = { username, email, password };
//         return newUser;
//         //  User.push(newUser);
//       } catch (error) {
//         console.log(error);
//         throw new ApolloError("unsucessful register", error);
//       }
//     }
//   },
// },
// registerUser: async (parent,args) =>{
//   const result = await userModel.findAll(args);
//   return result;
// },

//   const newUser = new User({
//   username:username,
//   email: email.toLowercase(),
//   password: encryptedPassword,
// });

//         //create our JWT
// const token = jwt.sign(
//   {user_id:newUser._id,email},
//   "UNSAFE_STRING",
//   {
//     expiresIn:'2h'
//   }

// );
//         newUser.token = token;
// },

//   //save user
//   const res = await newUser.save();
// return {
//  id:res.id,
//  ...res._doc
//   };
// },

// async loginUser(_,{loginInput:{email,password}}){
//   //see if the user exits
//   const oldUser = await User.findOne((email));

//   //check if the entered password equals to encrypted password
// if(user &&(await bcrypt.compare(password,user.password))){

// }
//   //create a new Token
//   const token = jwt.sign(
//               {user_id:newUser._id,email},
//               "UNSAFE_STRING",
//               {
//                 expiresIn:'2h'
//               }

//             );
//             user.token=token;

//             return { //pass to frontend
//               id:user.id,
//               ...user._doc
//             }
//             else{
//               throw new ApolloError('incorrect password','INCORRECT_PASSWORD')
//             }

//attach token to user model that we found above

// }
