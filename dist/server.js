"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typedefs_1 = require("./typedefs");
const database_js_1 = __importDefault(require("./config/database.js"));
const resolvers_1 = require("./resolvers");
const helpers_1 = require("./helpers");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
async function connectToPostgres() {
    try {
        await database_js_1.default.authenticate().then(() => {
            console.log("Connection has been established successfully.");
        });
    }
    catch (err) {
        console.log(err);
        console.log("there is an erorr");
    }
}
const init = async () => {
    connectToPostgres();
    console.log("Connected to postgres database");
    const server = new server_1.ApolloServer({
        typeDefs: [typedefs_1.postTypeDefs, typedefs_1.userTypedefs, typedefs_1.commentTypeDefs, typedefs_1.replyTypeDefs, typedefs_1.likeTypeDefs],
        resolvers: [resolvers_1.postResolver, resolvers_1.authResolver, resolvers_1.commentResolver, resolvers_1.replyResolver, resolvers_1.authResolver],
        introspection: true,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: helpers_1.Context,
    });
    console.log(`🚀  Server ready at: ${url}`);
};
init();
//# sourceMappingURL=server.js.map