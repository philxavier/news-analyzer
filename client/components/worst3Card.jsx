import React, { Component } from "react";
import { Card, Feed, Icon } from "semantic-ui-react";

class worst3Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      articleTitles: [],
      urls: []
    };
  }

  componentDidMount() {
    var data = this.props.data;
    this.setState({
      ratings: [
        Number(data.worst3[0].finalSentiment).toFixed(2),
        Number(data.worst3[1].finalSentiment).toFixed(2),
        Number(data.worst3[2].finalSentiment).toFixed(2)
      ],
      articleTitles: [
        data.worst3[0].articleTitle,
        data.worst3[1].articleTitle,
        data.worst3[2].articleTitle
      ],
      urls: [data.worst3[0].url, data.worst3[1].url, data.worst3[2].url]
    });
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            Top 3 Negative Articles
            <div style={{ float: "right" }}>
              <Icon name="thumbs down outline" />
            </div>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label
                image="https://news-analyzer.s3-us-west-2.amazonaws.com/gold+medal.png
"
              />
              <Feed.Content>
                <Feed.Date content={this.state.ratings[0]} />
                <Feed.Summary>
                  <a href={this.state.urls[0]}>{this.state.articleTitles[0]}</a>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label
                image="https://news-analyzer.s3-us-west-2.amazonaws.com/silver+medal.png
"
              />
              <Feed.Content>
                <Feed.Date content={this.state.ratings[1]} />
                <Feed.Summary>
                  <a href={this.state.urls[1]}>{this.state.articleTitles[1]}</a>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label
                image="https://news-analyzer.s3-us-west-2.amazonaws.com/bronze+medal.png
"
              />
              <Feed.Content>
                <Feed.Date content={this.state.ratings[2]} />
                <Feed.Summary>
                  <a href={this.state.urls[2]}>{this.state.articleTitles[2]}</a>
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

export default worst3Card;
