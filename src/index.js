import { ApolloServer } from 'apollo-server-express'
//const { ApolloServer} = apollo
import { typeDefs, resolvers } from './schema.js'
import express from 'express'

const PORT = 4000;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization;

        if (token) {
            const user = await User.getUser(token);
            return { user };
        }
    }
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)