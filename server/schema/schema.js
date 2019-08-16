var graphql = require("graphql");
const Article = require("../models/article.js");
const Tags = require("../models/tag.js");
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} = require("graphql-iso-date");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
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
      }
    }
  })
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
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({});
      }
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
              length: { $size: "$urls" }
            }
          },
          { $sort: { length: -1 } },
          { $limit: 5 }
        ])
          .then(res => {
            return res;
          })
          .catch(err => {
            console.log("there was an error fetching data", err);
          });
      }
    },
    top3: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({})
          .sort({ finalSentiment: -1 })
          .limit(3);
      }
    },
    worst3: {
      type: new GraphQLList(ArticleType),
      resolve(parent, args) {
        return Article.find({})
          .sort({ finalSentiment: 1 })
          .limit(3);
      }
    }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     add: {
//       type: AuthorType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: new GraphQLNonNull(GraphQLInt) }
//       },
//       resolve(parent, args) {
//         let author = new Author({
//           name: args.name,
//           age: args.age
//         });
//         return author.save();
//       }
//     },
//     addBook: {
//       type: BookType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         genre: { type: new GraphQLNonNull(GraphQLString) },
//         authorId: { type: new GraphQLNonNull(GraphQLID) }
//       },
//       resolve(parent, args) {
//         let book = new Book({
//           name: args.name,
//           genre: args.genre,
//           authorId: args.authorId
//         });
//         return book.save();
//       }
//     }
//   }
// });

var schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = schema;
