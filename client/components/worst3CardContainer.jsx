import { getWorst3Query } from "../queries/queries";
import { graphql } from "react-apollo";
import React, { Component } from "react";
import Worst3Card from "./worst3Card";
import { Loader } from "semantic-ui-react";

class worst3CardContainer extends Component {
  displayData() {
    return (
      <div style={{ width: "25%", display: "flex", flexDirection: "column" }}>
        {this.props.data.loading ? (
          <div>
            <Loader active inline="centered" />
          </div>
        ) : (
          <div>
            <Worst3Card data={this.props.data} />
          </div>
        )}
      </div>
    );
  }

  render() {
    console.log("worst3CardContainer ok");

    return this.displayData();
  }
}

export default graphql(getWorst3Query)(worst3CardContainer);
