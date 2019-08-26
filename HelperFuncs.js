const Moment = require("moment");
const Tags = require("./server/models/tag");
var db = require("./mongodb/index");
const Article = require("./server/models/article");

var fixDate = date => {
  date = date.trim();
  date = date.split(" ");
  date[date.length - 2] = date[date.length - 2].split("");
  var index = date[date.length - 2].indexOf(",");
  date[date.length - 2].splice(index, 1);
  date[date.length - 2] = date[date.length - 2].join("");
  date = date.slice(-3).join(" ");
  var finalDate = Moment(new Date(date)).toISOString();
  return finalDate.slice(0, 10);
};

module.exports = {
  fixDate
};
