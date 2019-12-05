import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTagsQuery } from "../queries/queries";
import { Loader } from "semantic-ui-react";
import BarChart from "./barChart";

class barChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displaydata() {
    return (
      <div className="barChart-container">
        {this.props.data.loading ? (
          <Loader active inline="centered" />
        ) : (
          <BarChart data={this.props.data.tags} />
        )}
      </div>
    );
  }

  render() {
    return this.displaydata();
  }
}

export default graphql(getTagsQuery)(barChartContainer);
