const { graphqlUploadExpress } = require("graphql-upload");
const app = require("./app");
const { apolloServer, httpServer } = require("./apollo");
const { PORT } = require("./config");

async function startServer() {
  app.use(graphqlUploadExpress());

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.use("/", require("./express/models/register/route"));
}

startServer();

httpServer.listen(PORT, () => {
  console.log(`Server has been started on: ${PORT}${apolloServer.graphqlPath}`);
});
