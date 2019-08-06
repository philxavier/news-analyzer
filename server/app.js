let express = require("express");
var app = express();
var PORT = 3002;
let db = require("../mongodb/index.js");
const buildArticle = require("../articleParser.js").buildArticle;
let articleModel = require("../mongodb/index").articleModel;

app.listen(PORT, err => {
  if (err) {
    console.log("there was an error connecting to server", err);
  }
  console.log("CONNECTION TO SERVER SUCCESSFULL!!");
  buildArticle().then(res => {
    var newArticle = new articleModel({
      summary: res.summary,
      sentiment: res.sentiment[0].sentiment,
      tags: res.tags,
      fullText: res.sentiment[0].document,
      date: res.date,
      title: res.articleTitle
    });
    newArticle.save((err, res) => {
      if (err) console.log("there was an error saving record", err);
      else console.log("saved record successfully", res);
    });
  });
});
