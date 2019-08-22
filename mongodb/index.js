var mongoose = require("mongoose");
// process.env.MONGO_URI

mongoose
  .connect(
    "mongodb+srv://fsxl:Secreta1@cluster0-vmxgf.mongodb.net/test?retryWrites=true&w=majority",
    { dbName: "news-analyzer", useNewUrlParser: true }
  )
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
