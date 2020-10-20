var graphql = require("graphql");
const buildArticle = require("../../articleParser").buildArticle;
const Article = require("../models/article.js");
const Tags = require("../models/tag.js");
const Axios = require("axios");
const { GraphQLDate } = require("graphql-iso-date");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const_ = require("lodash");

//THE SCHEMA DESCRIBES THE DATA IN THE GRAPH

const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: () => ({
    id: { type: GraphQLID },
    articleTitle: { type: GraphQLString },
    url: { type: GraphQLString },
    date: { type: GraphQLDate },
    summary: { type: GraphQLString },
    finalSentiment: { type: GraphQLString },
    fulltext: { type: GraphQLString },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return Tags.find({ urls: parent.url });
      },
    },
  }),
});

const TrendingType = new GraphQLObjectType({
  name: "Trending",
  fields: () => ({
    featuredStoryIds: { type: new GraphQLList(GraphQLString) },
    trendingStoryIds: { type: GraphQLString }, // 300 trending story IDs
    storySummaries: { type: GraphQLString },
    featuredStories: { type: GraphQLString }, // Empty
    date: { type: GraphQLString },
    hideAllImages: { type: GraphQLString },
    trendingStories: { type: GraphQLString },
  }),
});

const TagType = new GraphQLObjectType({
  name: "Tag",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    urls: { type: new GraphQLList(GraphQLString) },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({ url: { $in: parent.urls } });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({});
      },
    },
    tags: {
      type: new GraphQLList(TagType),
      // args: { url: { type: GraphQLString } },
      resolve(parent, args) {
        return Tags.aggregate([
          {
            $project: {
              name: 1,
              urls: 1,
              length: { $size: "$urls" },
            },
          },
          { $sort: { length: -1 } },
          { $limit: 5 },
        ])
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log("there was an error fetching data", err);
          });
      },
    },
    top3: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({}).sort({ finalSentiment: -1 }).limit(3);
      },
    },
    worst3: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({}).sort({ finalSentiment: 1 }).limit(3);
      },
    },
    trending: {
      type: new GraphQLList(TrendingType),
      resolve(parent, args) {
        const getJoke = async () => {
          const resp = await Axios.get(
            "https://api.chucknorris.io/jokes/random"
          );
          console.log(resp);
          return resp;
        };

        return getJoke();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        url: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return buildArticle(args.url).then((res) => {
          console.log("this is res-----------------------", res);
          Article.create(res, (err) => {
            if (err) {
              console.log("there was an error in articles", err);
            } else {
              var hold = [];
              for (let j = 0; j < res.tags.length; j++) {
                hold.push({ name: res.tags[j], url: args.url });
              }

              for (let i = 0; i < hold.length; i++) {
                Tags.update(
                  { name: hold[i].name },
                  { $push: { urls: hold[i].url } },
                  { upsert: true, setDefaultsOnInsert: true },
                  (err, response) => {
                    if (err) {
                      console.log("there was an error in tags", err);
                    } else {
                      console.log("found the thing", response);
                    }
                  }
                );
              }
            }
          });
        });
      },
    },
  },
});

var schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = schema;
