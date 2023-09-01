import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typedefs/schema";
// import { resolvers } from "./resolvers/userResolver";
import sequelize from "./config/database";
import { userResolvers } from "./resolvers/userResolver";
import loginResolvers from "./resolvers/loginResolver";
import { registerResolvers } from "./resolvers/registrationResolver";
import logoutResolvers from "./resolvers/logoutResolver";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
async function connectToPostgres() {
    try {
        await sequelize.authenticate().then(() => {
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
    const server = new ApolloServer({
        typeDefs,
        resolvers: [userResolvers, loginResolvers, registerResolvers, logoutResolvers],
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
init();
