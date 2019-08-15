import React, { Component } from "react";
import LineChartContainer from "./lineChartContainer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BarChartContainer from "./barChartContainer";

const client = new ApolloClient({
  uri: "http://localhost:3002/graphql"
});

export default class app extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <div id="chart-wrapper">
            <LineChartContainer />
            <BarChartContainer />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
