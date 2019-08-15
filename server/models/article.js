const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  articleTitle: String,
  url: String,
  fullText: String,
  summary: String,
  date: Date,
  finalSentiment: Number
});

var articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;
