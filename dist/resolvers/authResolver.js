"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const validatorInput_1 = require("../validator/validatorInput");
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_1 = require("graphql");
const helpers_1 = require("../helpers");
const helpers_2 = require("../helpers");
const models_1 = require("../models");
exports.authResolver = {
    Query: {
        getAllusers: async (parent, args, context) => {
            try {
                const allUsers = await models_1.userModel.findAll();
                return allUsers;
            }
            catch (error) {
                console.log(`Error while retrieving all users: ${error}`);
            }
        }
    },
    User: {
        post: async (user) => await models_1.Post.findAll({ where: { userId: user.id } }),
        reply: async (user) => await models_1.Reply.findAll({ where: { userId: user.id } }),
    },
    Mutation: {
        registerUser: async (_, args) => {
            const { registerInput: { fullname, email, password }, } = args;
            const { error } = validatorInput_1.registerValidate.validate(args.registerInput);
            if (error)
                throw error;
            const user = await models_1.userModel.findOne({ where: { email } });
            if (user) {
                throw new graphql_1.GraphQLError("the user already exist");
            }
            else {
                try {
                    const otp = Math.floor(100000 + Math.random() * 900000); //generating random otp of 6 digits
                    const encryptedPassword = await bcrypt_1.default.hash(password, 10); //hash the users password with salt factor 10
                    const newUser = await models_1.userModel.create({
                        fullname,
                        email,
                        password: encryptedPassword,
                    });
                    return newUser;
                }
                catch (error) {
                    throw new graphql_1.GraphQLError("no new user");
                }
            }
        },
        loginUser: async (parent, args) => {
            try {
                const { error } = validatorInput_1.LoginSchema.validate(args.loginInput);
                if (error)
                    throw error;
                const { email, password } = args.loginInput;
                const user = await models_1.userModel.findOne({ where: { email } });
                if (!user) {
                    throw new graphql_1.GraphQLError("no user found with provided email");
                }
                const isAuthorized = await bcrypt_1.default.compare(password, user?.dataValues.password);
                if (!isAuthorized) {
                    return {
                        status_code: helpers_1.status.errors.badRequest,
                        message: `Incorrect password`,
                    };
                }
                const { token, expiresIn } = (0, helpers_2.getJwtToken)(user?.dataValues.id, user?.dataValues.email);
                const status_code = 200;
                const message = "Login Successful";
                // const email = user.dataValues.email;
                return { token, status_code, message, expiresIn, email };
            }
            catch (error) {
                return {
                    status_code: helpers_1.status.errors.internalServerError,
                    message: `error ${error}`,
                };
            }
        },
    },
};
//# sourceMappingURL=authResolver.js.map