const { ApolloServer } = require("apollo-server-express");
const { userAuth, adminAuth } = require("./middlewares/auth");

const resolvers = require("./Resolvers/main");
const typeDefs = require("./TypeDefs/main");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authFunctions = { userAuth, adminAuth };
    if (req.headers.token) {
      return { ctx: req.headers.token, ...authFunctions };
    }
    return authFunctions;
  },
});

module.exports = apolloServer;
