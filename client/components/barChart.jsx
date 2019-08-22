import React, { Component } from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";

export default class barChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urls: [],
      chartData: null,
      options: {},
      tooltips: {}
    };
  }

  componentDidMount() {
    var data = this.props.data;
    var namesOfTags = [];
    var frequencyOfTag = [];
    data.forEach(ele => {
      namesOfTags.push(ele.name);
      frequencyOfTag.push(ele.urls.length);
    });
    this.setState({
      chartData: {
        labels: namesOfTags,
        datasets: [
          {
            label: "Frequency",
            data: frequencyOfTag,
            backgroundColor: "teal"
          }
        ]
      },
      options: {
        maintainAspectRation: false,
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                fontColor: "lightgray",

                beginAtZero: true,
                min: 0
              },

              gridLines: {
                borderDash: [3, 3],
                display: true,
                color: "lightgray"
              }
            }
          ],
          xAxes: [
            {
              barThickness: 40,

              ticks: {
                fontColor: "lightgray"
              },
              gridLines: {
                display: false,
                color: "teal"
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return (
      <div className="barChart" style={{ height: "420px", width: "356px" }}>
        <h2>Most Frequent Tags</h2>
        <p>what are the key words</p>
        <Bar
          data={this.state.chartData}
          options={this.state.options}
          width={120}
          height={115}
        />
      </div>
    );
  }
}
