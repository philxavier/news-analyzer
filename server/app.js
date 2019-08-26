const express = require("express");
const app = express();
const PORT = 3002;
const db = require("../mongodb/index.js");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
// let articleLinks = require("../articleParser.js").articleLinks;
const articleModel = require("./models/article");
var schema = require("./schema/schema.js");

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
    console.log("there was an error connecting to server", err);
  }
  console.log("CONNECTION TO SERVER SUCCESSFULL ON PORT", PORT);
  // var test = createArrayOfLinks;
  // console.log(test);
});

app.use(express.static("public"));

app.get("/articles", (req, res) => {
  articleModel
    .find({})
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      console.log("there was an error retrieving the data", err);
    });
});
