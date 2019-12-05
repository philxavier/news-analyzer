import { getTop3Query } from "../queries/queries";
import { graphql } from "react-apollo";
import React, { Component } from "react";
import Top3Card from "./top3Card";
import { Loader } from "semantic-ui-react";

class Top3CardContainer extends Component {
  displayData() {
    return (
      <div style={{ width: "25%", display: "flex", flexDirection: "column" }}>
        {this.props.data.loading ? (
          <Loader active inline="centered" />
        ) : (
          <Top3Card data={this.props.data} />
        )}
      </div>
    );
  }

  render() {
    return this.displayData();
  }
}

export default graphql(getTop3Query)(Top3CardContainer);
