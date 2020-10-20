import React, { Component } from "react";
import LineChartContainer from "./lineChartContainer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BarChartContainer from "./barChartContainer";
import Top3CardContainer from "./top3CardContainer";
import Statistic from "./statistic";
import { Loader } from "semantic-ui-react";
import Worst3CardContainer from "./worst3CardContainer";
import MenuTopContainer from "./menuTopContainer";
import { Box, Row } from "./components-library/Index";

const client = new ApolloClient({
  uri: "/graphql",
});

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
    };
    this.stopSpinner = this.stopSpinner.bind(this);
    this.startSpinner = this.startSpinner.bind(this);
  }

  stopSpinner() {
    this.setState({
      update: false,
    });
  }

  startSpinner() {
    this.setState({
      update: true,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <MenuTopContainer
            startSpinner={this.startSpinner}
            stopSpinner={this.stopSpinner}
          />
          <div>
            {!this.state.update ? (
              <Box background="red" width="90%" height="100%" margin="0 auto">
                <Row
                  display="flex"
                  justifyContent="space-between"
                  width="90%"
                  margin="0 auto"
                >
                  <LineChartContainer />
                  <BarChartContainer />
                </Row>
                <Row
                  display="flex"
                  justifyContent="space-between"
                  width="90%"
                  margin="0 auto"
                  marginTop="3em"
                  marginBottom="3em"
                >
                  <Top3CardContainer />
                  <Worst3CardContainer />
                  <Statistic />
                </Row>
                <Row
                  display="flex"
                  justifyContent="space-between"
                  width="90%"
                  margin="0 auto"
                  marginTop="3em"
                  marginBottom="3em"
                >
                  <GoogleTrendingSearches />
                </Row>
              </Box>
            ) : (
              <div>
                <Loader size="massive" active inline="centered">
                  Loading
                </Loader>
              </div>
            )}
          </div>
        </div>
      </ApolloProvider>
    );
  }
}
