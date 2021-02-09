var mongoose = require("mongoose");
var credentials = process.env.MONGO_URI;

mongoose
  .connect(credentials, { dbName: "news-analyzer", useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongo db!");
  })
  .catch((err) => {
    console.log("could not connect to mongo", err);
  });

mongoose.set("useFindAndModify", false);

let db = mongoose.connection;

module.exports = {
  db,
};
