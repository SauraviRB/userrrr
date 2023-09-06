import { LoginSchema, registerValidate } from "../validator/validatorInput";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { UserInterface } from "../interface/userInterface.js";
import { userModel } from "../models";
import { UserLoginInterface } from "../interface/userInterface.js";
import { status } from "../helpers";
import { getJwtToken } from "../helpers";

export const authResolver = {
  Mutation: {
    registerUser: async (_: any, args: { registerInput: UserInterface }) => {
      const {
        registerInput: { fullname, email, password },
      } = args;
      const { error } = registerValidate.validate(args.registerInput);
      if (error) throw error;
      const user = await userModel.findOne({ where: { email } });
      if (user) {
        throw new GraphQLError("the user already exist");
      } else {
        try {
          const otp = Math.floor(100000 + Math.random() * 900000); //generating random otp of 6 digits
          const encryptedPassword = await bcrypt.hash(password, 10); //hash the users password with salt factor 10

          const newUser = await userModel.create({
            fullname,
            email,
            password: encryptedPassword,
          });

          return newUser;
        } catch (error) {
          throw new GraphQLError("no new user");
        }
      }
    },
    loginUser: async (
      parent: any,
      args: { loginInput: UserLoginInterface }
    ) => {
      try {
        const { error } = LoginSchema.validate(args.loginInput);
        if (error) throw error;

        const { email, password } = args.loginInput;
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
          throw new GraphQLError("no user found with provided email");
        }
        const isAuthorized = await bcrypt.compare(
          password,
          user?.dataValues.password
        );

        if (!isAuthorized) {
          return {
            status_code: status.errors.badRequest,
            message: `Incorrect password`,
          };
        }

        const { token, expiresIn } = getJwtToken(
          user?.dataValues.id,
          user?.dataValues.email
        );
        const status_code = 200;
        const message = "Login Successful";
        // const email = user.dataValues.email;

        return { token, status_code, message, expiresIn, email };
      } catch (error) {
        return {
          status_code: status.errors.internalServerError,
          message: `error ${error}`,
        };
      }
    },
  },
};
