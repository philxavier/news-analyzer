const mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  name: String,
  urls: Array
});

tagSchema.plugin(findOrCreate);

var tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
