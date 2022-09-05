const { ApolloServer } = require("apollo-server-express");
const {typeDefs} = require("./Schema/TypeDefs");
const {resolvers} = require("./Schema/Resolvers");

const routes = require('./http/routes');
const express = require("express");
const app = express();

const server = new ApolloServer({typeDefs, resolvers});
app.use('/github_api', routes);

server.start().then(res => {
    server.applyMiddleware({ app });

    app.listen({ port: 3000 }, () =>
        console.log('Now browse to http://localhost:3000' + server.graphqlPath)
    )
})
