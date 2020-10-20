"use strict";
exports.__esModule = true;
const express = require("express");
const PORT = process.env.PORT || 3002;
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");
const ApolloServer = require("apollo-server-express").ApolloServer;
const app = express();
const Axios = require("axios");
const GoogleTrends = require("google-trends-api");
const request = require("request");
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    //HERE WE HAVE TO PASS A SCHEMA FOR OUR FUNCTION. THE SCHEMA WILL BE CREATED IN THE SCHEMA.JS FILE
    graphiql: true,
  })
);

app.get("/test", (req, res) => {
  Axios.get(
    "https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=240&geo=BR&ns=15"
  )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

var server = new ApolloServer({ schema: schema });
app.use(express.static("public"));
server.applyMiddleware({ app: app });
app.listen({ port: PORT }, function (err) {
  if (err) {
    console.log("there was an error", err);
  } else {
    console.log("server ready " + server.graphqlPath);
  }
});
