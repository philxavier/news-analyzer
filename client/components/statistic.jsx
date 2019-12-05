import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getArticlesQuery } from "../queries/queries";
import { Loader } from "semantic-ui-react";
import { Statistic, Card, Icon } from "semantic-ui-react";

class statistic extends Component {
  constructor(props) {
    super(props);
  }

  displayData() {
    var data = this.props.data;

    if (data.loading) {
      return (
        <div>
          <Loader active inline="centered" />
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
        <div className="statistics-container">
          <div
            style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}
          >
            <Card
              style={{
                height: "100%",
                width: "100%"
              }}
            >
              <Card.Content textAlign="center">
                <Card.Header>Average Evaluation</Card.Header>
                <Card.Description>
                  The average evaluation is...
                </Card.Description>
                <div className="statistic-wrapper">
                  <Statistic color="teal">
                    <Statistic.Value>{average}</Statistic.Value>
                  </Statistic>
                </div>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="newspaper outline" />
                  {data.articles.length} Articles
                </a>
              </Card.Content>
            </Card>
          </div>
        </div>
      );
    }
  }

  render() {
    return this.displayData();
  }
}

export default graphql(getArticlesQuery)(statistic);
