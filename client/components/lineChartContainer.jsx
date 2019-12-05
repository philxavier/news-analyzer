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
      <div className="lineChart-container">
        {this.props.data.loading ? (
          <Loader active inline="centered" />
        ) : (
          <LineChart data={this.props.data} />
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
