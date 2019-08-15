import React, { Component } from "react";
import { graphql } from "react-apollo";
import LineChart from "./lineChart";
import InputButton from "./InputButton";
import { Spinner } from "react-bootstrap";
import { getArticlesQuery } from "../queries/queries";

class lineChartContainer extends Component {
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
          <LineChart data={this.props.data} />
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <InputButton />
        {this.displaydata()}
      </div>
    );
  }
}

export default graphql(getArticlesQuery)(lineChartContainer);
