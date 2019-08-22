import React, { Component } from "react";
import { graphql } from "react-apollo";
import LineChart from "./lineChart";
import { Loader } from "semantic-ui-react";
import { getArticlesQuery } from "../queries/queries";

class lineChartContainer extends Component {
  constructor(props) {
    super(props);
  }

  displaydata() {
    if (this.props.data.loading) {
      return (
        <div style={{ margin: "0 auto" }}>
          <Loader inverted>Loading</Loader>
        </div>
      );
    } else {
      return (
        <div>
          <LineChart data={this.props.data} />
        </div>
      );
    }
  }

  render() {
    return <div>{this.displaydata()}</div>;
  }
}

export default graphql(getArticlesQuery)(lineChartContainer);
