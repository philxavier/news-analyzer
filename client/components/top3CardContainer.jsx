import { getTop3Query } from "../queries/queries";
import { graphql } from "react-apollo";
import React, { Component } from "react";
import Top3Card from "./top3Card";
import { Loader } from "semantic-ui-react";

class Top3CardContainer extends Component {
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
      //get url pass to the component and call get queries in the component;
      return (
        <div>
          <div>
            <Top3Card data={this.props.data} />
          </div>
        </div>
      );
    }
  }

  render() {
    return this.displayData();
  }
}

export default graphql(getTop3Query)(Top3CardContainer);
