import { development } from "./config/dbConfig.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typedefs/typedef.js";
import { resolvers } from "./resolvers/resolver.js";
// import { sequelize } from "./auth.js";
import { Sequelize } from "@sequelize/core";
// import { config } from "./config/index";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
async function connectToPostgres() {
    const sequelize = new Sequelize(development.database, development.username, development.password, {
        dialect: "postgres",
        host: "localhost",
    });
    try {
        await sequelize.authenticate().then(() => {
            console.log("Connection has been established successfully.");
        });
    }
    catch (err) {
        console.log("there is an erorr");
    }
}
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });
const init = async () => {
    connectToPostgres();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // context: ({ req }) => {
        //   return {
        //     sequelize,
        //   };
        // },
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
};
init();
