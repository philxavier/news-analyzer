import React, { Component } from "react";
import { Card, Feed, Icon } from "semantic-ui-react";

class Top3Card extends Component {
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
    var urls = [];
    data.top3.forEach(ele => {
      urls.push(ele.url);
    });

    if (data.top3.length === 1) {
      this.setState({
        ratings: [Number(data.top3[0].finalSentiment).toFixed(2)],
        articleTitles: [data.top3[0].articleTitle],
        urls: [data.top3[0].url]
      });
    } else if (data.top3.length === 2) {
      this.setState({
        ratings: [
          Number(data.top3[0].finalSentiment).toFixed(2),
          Number(data.top3[1].finalSentiment).toFixed(2)
        ],
        articleTitles: [data.top3[0].articleTitle, data.top3[1].articleTitle],
        urls: [data.top3[0].url, data.top3[1].url]
      });
    } else if (data.top3.length === 3) {
      this.setState({
        ratings: [
          Number(data.top3[0].finalSentiment).toFixed(2),
          Number(data.top3[1].finalSentiment).toFixed(2),
          Number(data.top3[2].finalSentiment).toFixed(2)
        ],
        articleTitles: [
          data.top3[0].articleTitle,
          data.top3[1].articleTitle,
          data.top3[2].articleTitle
        ],
        urls: [data.top3[0].url, data.top3[1].url, data.top3[2].url]
      });
    }
  }

  render() {
    return (
      <div style={{ flex: "1 " }}>
        <Card style={{ height: "100%" }}>
          <Card.Content>
            <Card.Header>
              Top 3 Positive Articles
              <div style={{ float: "right" }}>
                <Icon name="thumbs up outline" />
              </div>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label image="https://news-analyzer.s3-us-west-2.amazonaws.com/gold+medal.png" />
                <Feed.Content>
                  <Feed.Date content={this.state.ratings[0]} />
                  <Feed.Summary>
                    <a href={this.state.urls[0]}>
                      {this.state.articleTitles[0]}
                    </a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label image="https://news-analyzer.s3-us-west-2.amazonaws.com/silver+medal.png" />
                <Feed.Content>
                  <Feed.Date content={this.state.ratings[1]} />
                  <Feed.Summary>
                    <a href={this.state.urls[1]}>
                      {this.state.articleTitles[1]}
                    </a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Label image="https://news-analyzer.s3-us-west-2.amazonaws.com/bronze+medal.png" />
                <Feed.Content>
                  <Feed.Date content={this.state.ratings[2]} />
                  <Feed.Summary>
                    <a href={this.state.urls[2]}>
                      {this.state.articleTitles[2]}
                    </a>
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Top3Card;
