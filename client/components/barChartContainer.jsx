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
    if (this.props.data.loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Loader inverted>Loading</Loader>
        </div>
      );
    } else {
      return (
        <div>
          {/* <div>working</div> */}
          <BarChart data={this.props.data.tags} />
        </div>
      );
    }
  }

  render() {
    return <div>{this.displaydata()}</div>;
  }
}

export default graphql(getTagsQuery)(barChartContainer);
