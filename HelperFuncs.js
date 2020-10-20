const Moment = require("moment");
const Tags = require("./server/models/tag");
var db = require("./mongodb/index");
const axios = require("axios");
const request = require("request");
const Article = require("./server/models/article");

// useArticleApi = async (url) => {
//   axios({
//     method: "POST",
//     url: "https://news-extract1.p.rapidapi.com/",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       "x-rapidapi-host": "news-extract1.p.rapidapi.com",
//       "x-rapidapi-key": "bb8f1b64d6mshd1a86ad218ac1f6p1a2fd6jsn36e774a891f8",
//       url: url,
//       useQueryString: true,
//     },
//     params: {
//       url:
//         "https%3A%2F%2Fnypost.com%2F2020%2F07%2F28%2Frevel-shuts-down-service-in-nyc-following-series-of-crashes%2F",
//     },
//     data: {},
//   })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
// };

// useArticleApi(
//   "https://www.foxnews.com/world/brazil-bolsonaro-biggest-threat-coronavirus-response"
// );
var fixDate = (date) => {
  date = date.trim();
  date = date.split(" ");
  date[date.length - 2] = date[date.length - 2].split("");
  var index = date[date.length - 2].indexOf(",");
  date[date.length - 2].splice(index, 1);
  date[date.length - 2] = date[date.length - 2].join("");
  date = date.slice(-3).join(" ");
  var finalDate = Moment(new Date(date)).toISOString();
  // console.log("this is date=====================", finalDate.slice(0, 10));
  // return;

  return finalDate.slice(0, 10);
};

module.exports = {
  fixDate,
};
