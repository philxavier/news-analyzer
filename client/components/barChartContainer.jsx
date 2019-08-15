import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTagsQuery } from "../queries/queries";
import { Spinner } from "react-bootstrap";

class barChartContainer extends Component {
  constructor(props) {
    super(props);
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
          <div>working</div>
          {/* <barChart data={this.props.data} /> */}
        </div>
      );
    }
  }

  render() {
    console.log("props tags query", this.props);
    return <div>{this.displaydata()}</div>;
  }
}

export default graphql(getTagsQuery)(barChartContainer);
