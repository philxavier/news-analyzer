import React from "react";
import { Bar } from "react-chartjs-2";

interface IProps {
  urls: [];
  chartData: any;
  options: any;
  toolTips: any;
  data: any;
}

const barChart = (props: IProps) => {
  const [chartConfig, setChartConfig] = React.useState({
    urls: [],
    chartData: null,
    options: {},
    tooltips: {},
  });

  React.useEffect(() => {
    var data = props.data;
    var namesOfTags = [];
    var frequencyOfTag = [];
    data.forEach((ele) => {
      namesOfTags.push(ele.name);
      frequencyOfTag.push(ele.urls.length);
    });
    setChartConfig({
      ...chartConfig,
      chartData: {
        labels: namesOfTags,
        datasets: [
          {
            label: "Frequency",
            data: frequencyOfTag,
            backgroundColor: "teal",
          },
        ],
      },
      options: {
        maintainAspectRation: true,
        responsive: true,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                fontColor: "lightgray",

                beginAtZero: true,
                min: 0,
              },

              gridLines: {
                borderDash: [3, 3],
                display: true,
                color: "lightgray",
              },
            },
          ],
          xAxes: [
            {
              barThickness: 40,

              ticks: {
                fontColor: "lightgray",
              },
              gridLines: {
                display: false,
                color: "teal",
              },
            },
          ],
        },
      },
    });
  }, []);

  return (
    <div className="barChart">
      <h2>Most Frequent Tags</h2>
      <p>what are the key words</p>
      <Bar
        data={chartConfig.chartData}
        options={chartConfig.options}
        width={120}
        height={115}
      />
    </div>
  );
};

export default barChart;
