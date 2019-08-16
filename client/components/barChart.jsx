import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

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
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                min: 0
              },
              gridLines: {
                display: false,
                color: "teal"
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "teal"
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
      <div>
        <Bar
          data={this.state.chartData}
          width={550}
          height={300}
          options={this.state.options}
        />
      </div>
    );
  }
}
