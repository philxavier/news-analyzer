import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class lineChart extends Component {
  constructor(props) {
    super(props);
    this.getURlandRedirect = this.getURlandRedirect.bind(this);
    this.state = {
      urls: [],
      chartData: null,
      options: {},
      tooltips: {}
    };
  }

  componentDidMount() {
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
    console.log(summaries);

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
                hold.push(words.join(" "));
              }
              return hold;
            }
          }
        }
      }
    });
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
        <Line
          data={this.state.chartData}
          getElementAtEvent={e => {
            this.getURlandRedirect(e);
          }}
          options={this.state.options}
        />
      </div>
    );
  }
}

export default lineChart;
