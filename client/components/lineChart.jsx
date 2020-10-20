import React from "react";
import { Line } from "react-chartjs-2";

const lineChart = (props) => {
  const [chartConfig, setChartConfigs] = React.useState({
    urls: [],
    chartData: null,
    options: {},
    tooltips: {},
  });

  React.useEffect(() => {
    var dates = [];
    var ratings = [];
    var titles = [];
    var urls = [];
    var summaries = [];
    var manipulatedData = props.data.articles.slice();
    manipulatedData
      .map((ele) => {
        return Object.assign({}, ele, {
          date: ele.date.slice(0, 10),
        });
      })
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })
      .map((ele) => {
        dates.push(ele.date);
        ratings.push(ele.finalSentiment);
        titles.push(ele.articleTitle);
        urls.push(ele.url);
        summaries.push(ele.summary);
        return ele;
      });

    setChartConfigs({
      ...chartConfig,
      urls: urls,
      chartData: {
        labels: dates,
        datasets: [
          {
            label: "CNN",
            fill: false,
            backgroundColor: "teal",
            borderColor: "teal",
            data: ratings,
            articleTitles: titles,
            summaries: summaries,
          },
        ],
      },
      options: {
        hover: {
          onHover: function (e) {
            var point = this.getElementAtEvent(e);
            if (point.length) e.target.style.cursor = "pointer";
            else e.target.style.cursor = "default";
          },
        },
        maintainAspectRation: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "lightgray",
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
        tooltips: {
          callbacks: {
            title: function (tooltipItem, manipulatedData) {
              var index = tooltipItem[0].index;
              var info = manipulatedData.datasets[0].articleTitles[index];
              return info;
            },

            label: function (tooltipItem, manipulatedData) {
              return tooltipItem.value + " / " + tooltipItem.label;
            },
            afterLabel: function (tooltipItem, manipulatedData) {
              var index = tooltipItem.index;
              var info = manipulatedData.datasets[0].summaries[index];
              info = info.split(" ");
              var hold = [];
              while (info.length) {
                var words = info.splice(0, 13);
                hold.push(words.join(" "));
              }
              return hold;
            },
          },
        },
      },
    });
  }, []);

  const getURlandRedirect = (e) => {
    if (e) {
      var index = e[0]._index;
      var url = chartConfig.urls[index];
      window.open(url, "_blank");
    }
  };

  return (
    <div className="chart" style={{ height: " 100%", width: "100%" }}>
      <h2>Articles about Brazil x Dates</h2>
      <p>Numbers oscillate from -1 to 1</p>
      <Line
        data={chartConfig.chartData}
        getElementAtEvent={(e) => {
          getURlandRedirect(e);
        }}
        options={chartConfig.options}
      />
    </div>
  );
};

export default lineChart;
