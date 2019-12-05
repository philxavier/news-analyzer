import React, { Component } from "react";
import { graphql } from "react-apollo";
import LineChart from "./lineChart";
import { Loader } from "semantic-ui-react";
import { getArticlesQuery } from "../queries/queries";

class lineChartContainer extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //   }
  // }

  displaydata() {
    return (
      <div style={{ width: "60%" }}>
        {this.props.data.loading ? (
          <div>
            <Loader active inline="centered" />
          </div>
        ) : (
          <div style={{ height: "100%" }}>
            <LineChart data={this.props.data} />
          </div>
        )}
      </div>
    );
  }

  render() {
    console.log("lineChartContainer ok");

    return this.displaydata();
  }
}

export default graphql(getArticlesQuery)(lineChartContainer);
