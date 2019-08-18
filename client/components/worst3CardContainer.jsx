import { getWorst3Query } from "../queries/queries";
import { graphql } from "react-apollo";
import React, { Component } from "react";
import Worst3Card from "./worst3Card";
import { Spinner } from "react-bootstrap";

class worst3CardContainer extends Component {
  displayData() {
    console.log(this.props.data);
    if (this.props.data.loading) {
      return (
        <div style={{ margin: "0 auto" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Worst3Card data={this.props.data} />
          </div>
        </div>
      );
    }
  }

  render() {
    return this.displayData();
  }
}

export default graphql(getWorst3Query)(worst3CardContainer);
