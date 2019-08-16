import React, { Component } from "react";
import LineChartContainer from "./lineChartContainer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BarChartContainer from "./barChartContainer";
import InputButton from "./InputButton";
import Top3 from "./top3";
import Worst3 from "./worst3";
import Statistic from "./statistic";

const client = new ApolloClient({
  uri: "http://localhost:3002/graphql"
});

export default class app extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <div className="input-button-container">
            <InputButton />
          </div>
          <div id="chart-wrapper">
            <LineChartContainer />
            <BarChartContainer />
          </div>
          <div className="stats-container">
            <Top3 />
            <Worst3 />
            <Statistic />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
