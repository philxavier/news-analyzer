var mongoose = require("mongoose");
var devCredentials = require("./mongo.config");
var credentials = process.env.MONGO_URI ? process.env.MONGO_URI : devCredentials


mongoose
  .connect(credentials, { dbName: "news-analyzer", useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongo db!");
  })
  .catch(err => {
    console.log("could not connect to mongo", err);
  });

mongoose.set("useFindAndModify", false);

let db = mongoose.connection;

module.exports = {
  db
};
