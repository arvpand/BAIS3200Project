const express = require('express');
// require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
// const port = process.env.PORT || 4000;


async function startApolloServer()
{
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });
    // apolloServer.applyMiddleware({ app, path: '/graphql' });

    app.use((req, res) =>
    {
        res.status(200);
        res.send('Hello from express apollo server!');
        res.end();
    });

    await mongoose.connect('mongodb://localhost:27017/BAIS3200', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose Connected...')

    app.listen({ port: 4000 }, () =>
    {
        console.log(`Server is running on port 4000 🚀`);
    });
}

startApolloServer();