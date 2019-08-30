const express = require("express");
const PORT = process.env.port | 3002;
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
var schema = require("./schema/schema.js");
const { ApolloServer, gql } = require("apollo-server-express");
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

app.listen(PORT, err => {
  if (err) {
    console.log("there was an error", err);
  } else {
    console.log("connected do sever on Port", PORT);
  }
});

app.use(express.static("public"));
