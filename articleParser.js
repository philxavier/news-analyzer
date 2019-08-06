const puppeteer = require("puppeteer");
const Algorithmia = require("algorithmia");
const AlgorithmiaConfig = require("./algorithmia.config");

async function getText() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.nytimes.com/2019/07/12/world/americas/jair-bolsonaro-son-ambassador.html"
  );
  var textContent = await page.evaluate(
    () => document.querySelector(".meteredContent").textContent
  );

  var articleTitle = await page.evaluate(
    () => document.querySelector(".balancedHeadline").textContent
  );

  var date = await page.evaluate(
    () => document.querySelector(".css-rs1psd").textContent
  );

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

const buildArticle = async () => {
  const articleInfo = await getText();
  var summary = await Summarizer(articleInfo.textContent);
  var sentiment = await getSentiment(articleInfo.textContent);
  var tags = await addTags(articleInfo.textContent);
  let { articleTitle, date } = articleInfo;
  var obj = { summary, sentiment, tags, articleTitle, date };
  return obj;
};

module.exports = {
  buildArticle
};
