import React, { Component } from "react";
import LineChartContainer from "./lineChartContainer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BarChartContainer from "./barChartContainer";
import Top3CardContainer from "./top3CardContainer";
import Statistic from "./statistic";
import { Grid, Loader, Segment, Dimmer } from "semantic-ui-react";
import Worst3CardContainer from "./worst3CardContainer";
import MenuTopContainer from "./menuTopContainer";

const client = new ApolloClient({
  uri: "/graphql"
});

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false
    };
    this.stopSpinner = this.stopSpinner.bind(this);
    this.startSpinner = this.startSpinner.bind(this);
  }

  stopSpinner() {
    this.setState({
      update: false
    });
  }

  startSpinner() {
    this.setState({
      update: true
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          {/* <div className="input-button-container">
            <InputButton />
          </div> */}
          <MenuTopContainer
            startSpinner={this.startSpinner}
            stopSpinner={this.stopSpinner}
          />
          <div>
            {!this.state.update ? (
              <div className="main-container">
                <div className="first-row">
                  <LineChartContainer />
                  <BarChartContainer />
                </div>
                <div className="second-row">
                  <Top3CardContainer />
                  <Worst3CardContainer />
                  <Statistic />
                </div>
              </div>
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
