const { graphqlUploadExpress } = require("graphql-upload");
const app = require("./app");
const apolloServer = require("./apollo");
const { PORT } = require("./config");

async function startServer() {
  app.use(graphqlUploadExpress());
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use("/", (_, res) => {
    res.send({ message: "Assalomu Alaykum" });
  });
}

startServer();

app.listen(PORT, () => {
  console.log(`Server has been started on: ${PORT}${apolloServer.graphqlPath}`);
});
