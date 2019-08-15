import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Axios from "axios";
import InputButton from "./InputButton.jsx";
import { Button, InputGroup, FormControl, Spinner } from "react-bootstrap";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import { valueToObjectRepresentation } from "apollo-utilities";

const getArticlesQuery = gql`
  {
    articles {
      summary
      finalSentiment
      articleTitle
      date
    }
  }
`;

class lineChart extends Component {
  constructor(props) {
    super(props);
    this.displayData = this.displayData.bind(this);
    this.getURlandRedirect = this.getURlandRedirect.bind(this);

    this.state = {
      urls: []
    };
  }

  displayData() {
    if (this.props.data.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      var dates = [];
      var ratings = [];
      var titles = [];
      var urls = [];
      var summaries = [];
      var data = this.props.data.articles;
      data
        .map(ele => {
          return Object.assign({}, ele, {
            date: ele.date.slice(0, 10)
          });
        })
        .sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
        .map(ele => {
          dates.push(ele.date);
          ratings.push(ele.finalSentiment);
          titles.push(ele.articleTitle);
          urls.push(ele.url);
          summaries.push(ele.summary);
          return ele;
        });
      this.setState({
        urls: urls,
        chartData: {
          labels: dates,
          datasets: [
            {
              label: "CNN",
              fill: false,
              backgroundColor: "rgb(39, 189, 221)",
              borderColor: "rgb(39, 189, 221)",
              data: ratings,
              articleTitles: titles,
              summaries: summaries
            }
          ]
        },
        options: {
          hover: {
            onHover: function(e) {
              var point = this.getElementAtEvent(e);
              if (point.length) e.target.style.cursor = "pointer";
              else e.target.style.cursor = "default";
            }
          },
          maintainAspectRation: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white"
                },
                gridLines: {
                  display: false,
                  color: "white"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "white"
                },
                gridLines: {
                  display: false,
                  color: "white"
                }
              }
            ]
          },
          tooltips: {
            callbacks: {
              title: function(tooltipItem, data) {
                var index = tooltipItem[0].index;
                var info = data.datasets[0].articleTitles[index];
                return info;
              },

              label: function(tooltipItem, data) {
                return tooltipItem.value + " / " + tooltipItem.label;
              },
              afterLabel: function(tooltipItem, data) {
                var index = tooltipItem.index;
                var info = data.datasets[0].summaries[index];
                info = info.split(" ");
                var hold = [];
                while (info.length) {
                  var words = info.splice(0, 13);
                  console.log(words);
                  hold.push(words.join(" "));
                }
                return hold;
              }
            }
          }
        }
      });
    }

    return (
      <Line
        data={this.state.chartData}
        getElementAtEvent={this.getURlandRedirect}
        options={this.state.options}
      />
    );
  }

  getURlandRedirect(e) {
    if (e) {
      var index = e[0]._index;
      var url = this.state.urls[index];
      window.open(url, "_blank");
    }
  }

  render() {
    return (
      <div className="chart" style={{ height: "500px", width: "700px" }}>
        <InputButton />
        {this.displayData()}
      </div>
    );
  }
}

export default graphql(getArticlesQuery)(lineChart);
