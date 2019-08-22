var mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { dbName: "news-analyzer" })
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
