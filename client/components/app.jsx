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
  uri: "https://news-analyzer-325b2.firebaseapp.com"
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
              <Grid centered>
                <Grid.Row columns={2}>
                  <Grid.Column
                    style={
                      {
                        // display: "flex",
                        // justifyContent: "center",
                        // background: "purple"
                      }
                    }
                    width={8}
                  >
                    <LineChartContainer />
                  </Grid.Column>
                  <Grid.Column
                    style={{
                      display: "flex",
                      justifyContent: "flex-end"
                    }}
                    width={4}
                  >
                    <BarChartContainer />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column
                    width={4}
                    style={
                      {
                        // display: "flex",
                        // justifyContent: "center",
                        // background: "green"
                      }
                    }
                  >
                    <Top3CardContainer />
                  </Grid.Column>
                  <Grid.Column
                    width={4}
                    style={{
                      display: "flex",
                      justifyContent: "center"
                      // background: "red"
                    }}
                  >
                    <Worst3CardContainer />
                  </Grid.Column>
                  <Grid.Column
                    width={4}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end"
                      // background: "blue"
                    }}
                  >
                    <Statistic />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
