import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getArticlesQuery } from "../queries/queries";
import { Spinner } from "react-bootstrap";
import { Statistic } from "semantic-ui-react";

class statistic extends Component {
  constructor(props) {
    super(props);
  }

  displayData() {
    var data = this.props.data;
    console.log("data here", data);
    if (data.loading) {
      return (
        <div style={{ margin: "0 auto" }}>
          <Spinner animation="border" variant="light" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      var average = data.articles.reduce((accum, ele) => {
        var num = Number(ele.finalSentiment);
        accum += num;
        return accum;
      }, 0);

      average = (average / data.articles.length).toFixed(2);

      return (
        <div className="statistic-wrapper">
          <Statistic color="teal">
            <Statistic.Value>{average}</Statistic.Value>
            <span style={{ color: "teal", fontWeight: "bold" }}>
              <Statistic.Label>Evaluation Average</Statistic.Label>
            </span>
          </Statistic>
        </div>
      );
    }
  }

  render() {
    return this.displayData();
  }
}

export default graphql(getArticlesQuery)(statistic);
