import React, { Component } from "react";
import LineChartContainer from "./lineChartContainer";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BarChartContainer from "./barChartContainer";
import InputButton from "./InputButton";
import Top3CardContainer from "./top3CardContainer";
import Statistic from "./statistic";
import { Grid } from "semantic-ui-react";
import Worst3CardContainer from "./worst3CardContainer";
import MenuTop from "./menuTop";
import MenuTop2 from "./menuTop2";
import MenuTopContainer from "./menuTopContainer";

const client = new ApolloClient({
  uri: "http://localhost:3002/graphql"
});

export default class app extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          {/* <div className="input-button-container">
            <InputButton />
          </div> */}
          <MenuTopContainer />

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
        </div>
      </ApolloProvider>
    );
  }
}
