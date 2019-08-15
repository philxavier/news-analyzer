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

mongoose.set("useFindAndModify", false);

let db = mongoose.connection;

module.exports = {
  db
};
