const express = require("express");
const PORT = process.env.PORT || 3002;
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
var schema = require("./schema/schema.js");
const { ApolloServer } = require("apollo-server-express");
const db = require("../mongodb/index");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    //HERE WE HAVE TO PASS A SCHEMA FOR OUR FUNCTION. THE SCHEMA WILL BE CREATED IN THE SCHEMA.JS FILE
    graphiql: true
  })
);

const server = new ApolloServer({ schema });

// console.log(server);
app.use(express.static("public"));

server.applyMiddleware({ app });

app.listen({ port: PORT }, err => {
  if (err) {
    console.log("there was an error", err);
  } else {
    console.log(`server ready at http://localhost:3002${server.graphqlPath}`);
  }
});
