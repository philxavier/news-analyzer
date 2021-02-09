const puppeteer = require("puppeteer");
const Algorithmia = require("algorithmia");
const AlgorithmiaConfig = process.env.AlgorithmiaConfig;
const articleModel = require("./server/models/article.js");
const tagModel = require("./server/models/tag.js");
const FixDate = require("./HelperFuncs").fixDate;

var articleLinks = [
  "https://www.cnn.com/2019/08/06/us/brazilian-inmate-death-trnd/index.html",
  "https://www.cnn.com/2019/07/08/football/copa-america-final-brazil-peru-spt-intl/index.html",
  "https://www.cnn.com/2013/10/22/world/international-space-station-fast-facts/index.html",
  "https://www.cnn.com/2019/08/03/americas/brazil-space-institute-director-fired-amazon-deforestation-intl/index.html",
  "https://www.cnn.com/2019/08/03/football/real-madrid-gareth-bale-neymar-coutinho-spt-intl/index.html",
  "https://www.cnn.com/2019/07/31/americas/brazil-prison-riot-inmates-killed-in-transit-intl/index.html",
  "https://www.cnn.com/2019/07/29/americas/brazil-prison-riots-intl/index.html",
  "https://www.cnn.com/2019/07/26/us/anderson-silva-us-citizen-trnd/index.html",
  "https://www.cnn.com/2019/07/17/us/peru-former-president-arrested-us/index.html",
  "https://www.cnn.com/2019/07/12/americas/jair-bolsonaro-son-us-ambassador-intl/index.html",
  "https://www.cnn.com/2019/05/27/americas/brazil-prison-deaths-intl/index.html",
  "https://www.cnn.com/2013/08/05/world/americas/luiz-inacio-lula-da-silva-fast-facts/index.html",
  "https://www.cnn.com/2019/05/01/motorsport/ayrton-senna-25-year-anniversary-chris-smith-photography-formula-one-motorsport-spt-intl/index.html",
  "https://www.cnn.com/2019/04/25/health/male-infertility-food-drayer/index.html",
];

async function getTextFinal(url) {
  console.log("inside getTextFinal getting text");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);

  try {
    var textContent = await page.evaluate(
      () => document.querySelector("#body-text > div.l-container ").textContent
    );
  } catch (err) {
    console.log("There is an error in text content", err);
  }

  textContent = textContent.replace(/[\n\r]+/g, "").trim();

  try {
    var articleTitle = await page.evaluate(
      () => document.querySelector(".pg-headline").textContent
    );
  } catch (err) {
    console.log("there was an error in article tittle", err);
  }

  try {
    var date = await page.evaluate(
      () => document.querySelector(".update-time").textContent
    );
  } catch (err) {
    console.log("there was an error in date", err);
  }

  date = FixDate(date);

  await browser.close();

  return {
    textContent,
    articleTitle,
    date,
  };
}

async function Summarizer(textContent) {
  algorithmiaAuthenticated = Algorithmia(AlgorithmiaConfig);
  try {
    var summarizerAlgo = await algorithmiaAuthenticated.algo(
      "nlp/Summarizer/0.1.8?timeout=300"
    );
  } catch (err) {
    console.log("this is summary error", err);
  }

  var summarizerPipe = await summarizerAlgo.pipe(textContent);
  var content = await summarizerPipe.get();

  return content;
}

async function getSentiment(textContent) {
  var input = { document: textContent };
  algorithmiaAuthenticated = Algorithmia(AlgorithmiaConfig);
  var sentiment = await algorithmiaAuthenticated.algo(
    "nlp/SentimentAnalysis/1.0.5?timeout=300"
  );
  var sentimentPipe = await sentiment.pipe(input);
  var finalSentiment = await sentimentPipe.get();
  return finalSentiment;
}

async function addTags(textContent) {
  algorithmiaAuthenticated = Algorithmia(AlgorithmiaConfig);
  var tagAlgo = await algorithmiaAuthenticated.algo(
    "nlp/AutoTag/1.0.1?timeout=300"
  ); // timeout is optional
  var tagPipe = await tagAlgo.pipe(textContent);
  var finalTags = await tagPipe.get();
  return finalTags;
}

const buildArticle = async (url) => {
  try {
    var articleInfo = await getTextFinal(url);
  } catch (err) {
    console.log("there was an error in info", err);
  }

  try {
    var summary = await Summarizer(articleInfo.textContent);
  } catch (err) {
    console.log("there was an error in summary", err);
  }

  try {
    var sentiment = await getSentiment(articleInfo.textContent);
  } catch (err) {
    console.log("there was an error in sentiment", err);
  }

  var finalSentiment = sentiment[0].sentiment;
  var fullText = sentiment[0].document;

  try {
    var tags = await addTags(articleInfo.textContent);
  } catch (err) {
    console.log("there was an error in tags", err);
  }

  let { articleTitle, date } = articleInfo;
  var obj = {
    url,
    summary,
    finalSentiment,
    fullText,
    tags,
    articleTitle,
    date,
  };
  return obj;
};

var test = async () => {
  var container = [];
  for (let i = 0; i < articleLinks.length; i++) {
    const element = await buildArticle(articleLinks[i]);
    element.url = articleLinks[i];
    console.log(element);
    container.push(element);
  }
  return container;
};

var saveToDatabase = () => {
  test()
    .then((res) => {
      articleModel.insertMany(res, (err, resp) => {
        if (err) {
          console.log("erro inserting into db", err);
        } else {
          console.log("documents saved ok");
        }
      });

      var hold = [];

      for (let i = 0; i < res.length; i++) {
        var tags = res[i].tags;
        for (let j = 0; j < tags.length; j++) {
          hold.push({ name: tags[j], url: res[i].url });
          console.log(hold);
        }
      }

      for (let i = 0; i < hold.length; i++) {
        tagModel.update(
          { name: hold[i].name },
          { $push: { urls: hold[i].url } },
          { upsert: true, setDefaultsOnInsert: true },
          (err, response) => {
            if (err) {
              console.log("there was an error", err);
            } else {
              console.log("found the thing", response);
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log("there was an error", err);
    });
};

// const buildStuff = async () => {
//   const result = await buildArticle(
//     "https://www.cnn.com/2020/07/31/americas/brazil-bolsonaro-mold-lungs-intl/index.html"
//   );
//   console.log("this is result", result);
// };

// buildStuff();

// return;

module.exports = {
  buildArticle,
  getTextFinal,
};
