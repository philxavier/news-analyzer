const functions = require("firebase-functions");
const express = require("express");
const app = express();
const PORT = process.env.port | 3002;
const db = require("../mongodb/index.js");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
// let articleLinks = require("../articleParser.js").articleLinks;
const articleModel = require("./models/article");
var schema = require("./schema/schema.js");
const { ApolloServer, gql } = require("apollo-server-express");

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    //HERE WE HAVE TO PASS A SCHEMA FOR OUR FUNCTION. THE SCHEMA WILL BE CREATED IN THE SCHEMA.JS FILE
    graphiql: true
  })
);

app.use(express.static("public"));

function configureServer() {
  // invoke express to create our server
  const app = express();
  //use the cors middleware
  app.use(cors());
  // Simple graphql schema

  const server = new ApolloServer({
    schema
  });

  server.applyMiddleware({ app });
  // finally return the application
  return app;
}

module.exports = configureServer;
