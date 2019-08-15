import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import Axios from "axios";
const moment = require("moment");

function mycustomtooltipfunction(tooltipModel) {
  var tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";
    document.body.appendChild(tooltipEl);
    console.log(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    var titleLines = tooltipModel.title || [];
    var bodyLines = tooltipModel.body.map(getBody);

    var innerHtml = "<thead>";

    titleLines.forEach(function(title) {
      innerHtml += "<tr><th>" + title + "</th></tr>";
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function(body, i) {
      var colors = tooltipModel.labelColors[i];
      var style = "background:" + colors.backgroundColor;
      style += "; border-color:" + colors.borderColor;
      style += "; border-width: 2px";
      var span = '<span style="' + style + '"></span>';
      innerHtml += "<tr><td>" + span + body + "</td></tr>";
    });
    innerHtml += "</tbody>";

    var tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  // `this` will be the overall tooltip
  var position = this._chart.canvas.getBoundingClientRect();

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = "absolute";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + "px";
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY + "px";
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  tooltipEl.style.padding =
    tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
  tooltipEl.style.pointerEvents = "none";
}

export default class lineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Population",
            fill: false,
            backgroundColor: "rgb(22, 181, 149)",
            borderColor: "rgb(22, 181, 149)",
            data: [],
            data1: []
          }
        ]
      },
      options: {
        maintainAspectRation: false,
        tooltips: {
          callbacks: {
            title: function() {
              return null;
            },

            label: function() {
              return null;
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    Axios.get("/articles").then(res => {
      var articles = res.data;
      var dates = [];
      var ratings = [];
      var generalInfo = [];

      //filter by dates so we can have the articles in order;
      articles = articles
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
          ratings.push(ele.sentiment[0]);
          generalInfo.push(ele.title);
          return ele;
        });

      this.setState({
        chartData: {
          labels: dates,
          datasets: [
            {
              label: "Period",
              fill: false,
              backgroundColor: "rgb(22, 181, 149)",
              borderColor: "rgb(22, 181, 149)",
              data: ratings,
              data1: generalInfo
            }
          ]
        },
        options: {
          maintainAspectRation: false,
          tooltips: {
            enabled: true,
            custom: mycustomtooltipfunction
          }
        }
      });
    });
  }

  render() {
    return (
      <div className="chart" style={{ height: "500px", width: "800px" }}>
        <Line data={this.state.chartData} options={this.state.options} />
      </div>
    );
  }
}
