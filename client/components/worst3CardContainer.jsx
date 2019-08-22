import { getWorst3Query } from "../queries/queries";
import { graphql } from "react-apollo";
import React, { Component } from "react";
import Worst3Card from "./worst3Card";
import { Loader } from "semantic-ui-react";

class worst3CardContainer extends Component {
  displayData() {
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
