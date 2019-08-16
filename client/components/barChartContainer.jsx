import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTagsQuery } from "../queries/queries";
import { Spinner } from "react-bootstrap";
import BarChart from "./barChart";

class barChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displaydata() {
    if (this.props.data.loading) {
      return (
        <div style={{ margin: "0 auto" }}>
          <Spinner animation="border" variant="light" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
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
