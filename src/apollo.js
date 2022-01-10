const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const app = require("./app");
const { userAuth, adminAuth } = require("./middlewares/auth");

const resolvers = require("./Resolvers/main");
const typeDefs = require("./TypeDefs/main");

const httpServer = createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: "/graphql" }
);

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    const authFunctions = { userAuth, adminAuth };
    if (req.headers.token) {
      return { ctx: req.headers.token, ...authFunctions };
    }
    return authFunctions;
  },
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

module.exports = { apolloServer, httpServer };
