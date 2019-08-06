var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/news-analyzer",
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.log("there was an error in mongoose", err);
    } else {
      console.log("CONNECTED TO MONGO");
    }
  }
);

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  fullText: String,
  summary: String,
  sentiment: Array,
  tags: [],
  date: Date,
  title: String
});

var articleModel = mongoose.model("Article", articleSchema);

let db = mongoose.connection;

module.exports = {
  db,
  articleModel
};
