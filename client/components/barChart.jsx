import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class barChart extends Component {
  render() {
    return (
      <div>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}
