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
      <div style={{ width: "35%", height: "100%" }}>
        {this.props.data.loading ? (
          <div>
            <Loader active inline="centered" />
          </div>
        ) : (
          <div>
            <div>
              <BarChart data={this.props.data.tags} />
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return this.displaydata();
  }
}

export default graphql(getTagsQuery)(barChartContainer);
