const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const mongoDBConnection = require("./Utils/db");

//connect to mongodB
mongoDBConnection();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req }) => ({ req }),
});

server.listen( 3001, () => {
    console.log("GraphQL server started on port 3001");
});
