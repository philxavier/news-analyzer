const puppeteer = require("puppeteer");
const Algorithmia = require("algorithmia");
const AlgorithmiaConfig = require("./algorithmia.config");
const articleModel = require("./server/models/article.js");
const tagModel = require("./server/models/tag.js");
const FixDate = require("./HelperFuncs").fixDate;

var articleLinks2 = [
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
  "https://www.cnn.com/2019/04/25/health/male-infertility-food-drayer/index.html"
];

var articleLinks3 = [
  "https://www.cnn.com/2019/07/17/us/peru-former-president-arrested-us/index.html",
  "https://www.cnn.com/2019/07/12/americas/jair-bolsonaro-son-us-ambassador-intl/index.html",
  "https://www.cnn.com/2019/07/09/middleeast/brazil-israeli-embassy-scli-intl/index.html",
  "https://www.cnn.com/2019/07/08/football/copa-america-final-brazil-peru-spt-intl/index.html",
  "https://www.cnn.com/travel/article/brazil-lifts-visa-requirement/index.html",
  "https://www.cnn.com/travel/gallery/beautiful-brazil/index.htmlhttps://www.cnn.com/2019/06/08/football/neymar-rape-allegations-lawyer-spt-intl/index.html",
  "https://www.cnn.com/style/article/brazil-fashion-diversity/index.html"
];

var articleLinks = [
  "https://www.nytimes.com/2019/08/01/sports/mario-gonzalez-dead.html?searchResultPosition=1",
  "https://www.nytimes.com/2019/07/29/world/americas/brazil-prison-dead.html?searchResultPosition=2"
  // "https://www.nytimes.com/2019/08/02/world/americas/bolsonaro-amazon-deforestation-galvao.html?searchResultPosition=3",
  // "https://www.nytimes.com/2019/08/06/world/americas/brazil-prison-escape-dead.html?searchResultPosition=4",
  // "https://www.nytimes.com/2019/07/31/world/americas/4-more-inmates-die-in-brazil-following-deadly-prison-clash.html?searchResultPosition=5",
  // "https://www.nytimes.com/2019/07/25/world/americas/bolsonaro-brazil-phone-hack-corruption.html?searchResultPosition=6",
  // "https://www.nytimes.com/2019/07/27/world/americas/brazil-miners-amapa.html?searchResultPosition=7",
  // "https://www.nytimes.com/2019/07/29/science/math-weaving-bamboo.html?searchResultPosition=8",
  // "https://www.nytimes.com/2019/07/20/world/americas/brazil-bolsonaro-greenwald.html?searchResultPosition=9",
  // "https://www.nytimes.com/2019/07/28/world/americas/brazil-deforestation-amazon-bolsonaro.html?searchResultPosition=10"
  //   "https://www.nytimes.com/2019/07/22/opinion/maria-lourdes-afiuni-chomsky-venezuela.html?searchResultPosition=19",
  //   "https://www.nytimes.com/2019/07/04/travel/brazil-eases-visa-requirements-for-us-travelers.html?searchResultPosition=20",
  //   "https://www.nytimes.com/2019/07/06/arts/music/joao-gilberto-dead-bossa-nova.html?searchResultPosition=22",
  //   "https://www.nytimes.com/2019/06/26/world/americas/bolsonaro-staff-cocaine-bust.html?searchResultPosition=23",
  //   "https://www.nytimes.com/2019/07/05/sports/2016-olympics-rio-bribery.html?searchResultPosition=25",
  //   "https://www.nytimes.com/2019/07/05/opinion/lula-moro-brazil.html?searchResultPosition=26",
  //   "https://www.nytimes.com/2019/06/23/sports/soccer/france-brazil-world-cup.html?searchResultPosition=29",
  //   "https://www.nytimes.com/2019/06/18/movies/edge-of-democracy-review.html?searchResultPosition=31"
];

async function getText2(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    var textContent = await page.evaluate(
      () => document.querySelector(".pg-rail-tall__body").innerText
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
  var date = FixDate(date);

  await browser.close();

  return {
    textContent,
    articleTitle,
    date
  };
}

async function getText(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    var textContent = await page.evaluate(
      () => document.querySelector(".meteredContent").textContent
    );
  } catch (err) {
    console.log("There is an error in text content", err);
  }

  try {
    var articleTitle = await page.evaluate(
      () => document.querySelector(".balancedHeadline").textContent
    );
  } catch (err) {
    console.log("there was an error in article tittle", err);
  }

  try {
    var date = await page.evaluate(
      () => document.querySelector(".css-rs1psd").textContent
    );
  } catch (err) {
    console.log("there was an error in date", err);
  }

  // console.log(
  //   "this is text content===============================",
  //   textContent
  // );

  await browser.close();

  return {
    textContent,
    articleTitle,
    date
  };
}

async function Summarizer(textContent) {
  algorithmiaAuthenticated = Algorithmia(AlgorithmiaConfig);
  var summarizerAlgo = await algorithmiaAuthenticated.algo(
    "nlp/Summarizer/0.1.8?timeout=300"
  );
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

const buildArticle = async url => {
  try {
    var articleInfo = await getText2(url);
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

  console.log();

  let { articleTitle, date } = articleInfo;
  var obj = {
    url,
    summary,
    finalSentiment,
    fullText,
    tags,
    articleTitle,
    date
  };
  return obj;
};

var test = async () => {
  var container = [];
  for (let i = 0; i < articleLinks2.length; i++) {
    const element = await buildArticle(articleLinks2[i]);
    element.url = articleLinks2[i];
    console.log(element);
    container.push(element);
  }
  return container;
};

// getText2(
//   "https://www.cnn.com/2019/05/01/motorsport/ayrton-senna-25-year-anniversary-chris-smith-photography-formula-one-motorsport-spt-intl/index.html"
// ).then(res => {
//   console.log("this is res", res);
// });

var saveToDatabase = () => {
  test()
    .then(res => {
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
    .catch(err => {
      console.log("there was an error", err);
    });
};

// saveToDatabase();

module.exports = {
  // createArrayOfLinks,
  buildArticle,
  getText2,
  articleLinks2
};
