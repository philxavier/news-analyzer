"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const PORT = process.env.PORT || 3002;
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
var schema = require("./schema/schema.js");
const { ApolloServer } = require("apollo-server-express");
const app = express_1.default();
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));
const server = new ApolloServer({ schema });
app.use(express_1.default.static("public"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, (err) => {
    if (err) {
        console.log("there was an error", err);
    }
    else {
        console.log(`server ready ${server.graphqlPath}`);
    }
});
