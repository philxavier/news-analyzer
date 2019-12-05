var mongoose = require("mongoose");
// var credentials = require("./mongo.config");
//UNCOMMENT THE ABOVE LINE OF CODE AND USE IT IN THE .CONNECT METHOD TO WORK ON DEVELOPMENT
var credentials = process.env.MONGO_URI;

//MONGO_URI HAS BEEN SET MANUALLY. SEE HOW TO SET ENVIRONMENT VARIABLES IN HEROKU FOR MORE INFO

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
