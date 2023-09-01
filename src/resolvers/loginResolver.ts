import { UserInterface, InputUserInterface } from './../interface/userInterface';
import userModel from '../models/usermodel' // Import your Sequelize User model
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

const loginResolvers = {
  Mutation: {
    login: async (parent: any, args: { email: string, password: string }) => {
      const { email, password } = args;
      const UserInterface = await userModel.findOne({ where: { email } });

      if (!UserInterface || UserInterface.password !== password) {
        throw new GraphQLError(

          "password doesnt match the given password.",
       
        );
      }

      // Generate and return a token
      const token = jwt.sign({ userId: UserInterface.id }, SECRET_KEY, { expiresIn: '1h' });
      return { token };
    },
  },
};

export default loginResolvers;
