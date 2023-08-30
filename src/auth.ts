import { Sequelize } from "@sequelize/core";

 export const sequelize = new Sequelize("dev", "postgres", "wuvwu", {
  dialect: "postgres",
  host: "localhost",
});
 sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
 
// import { AuthenticationError } from 'apollo-server-errors';
// const jwt =require('jsonwebtoken');
// module.exports = (context)=>{
//     const authHeader = context.req.headers.authorization;
//     if(authHeader){
//         const token = authHeader.split('Bearer')[1];//bearer 234423424444435345235235
//         if(token){
//             try{
//                 const user = jwt.verify(token, "UNSAFE_STRING");
//                 return user;

//             }catch(err){
//                 throw new AuthenticationError('Invalid token');

//             }

//         }
//         throw new Error("Authentication token must be 'bearer [token]");

//     }
//     throw new Error ('Authorize header must be provided');
// }
