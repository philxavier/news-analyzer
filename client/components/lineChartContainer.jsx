import React, { Component } from "react";
import { graphql } from "react-apollo";
import LineChart from "./lineChart";
import { Loader } from "semantic-ui-react";
import { getArticlesQuery } from "../queries/queries";

class lineChartContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log(
        "props in linechart container component did update ",
        this.props
      );
    }
  }

  displaydata() {
    console.log("props in linechart container displaydata ", this.props);

    return (
      <div>
        {this.props.data.loading ? (
          <div>
            <Loader active inline="centered" />
          </div>
        ) : (
          <div>
            <div>
              <LineChart data={this.props.data} />
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return <div>{this.displaydata()}</div>;
  }
}

export default graphql(getArticlesQuery)(lineChartContainer);
