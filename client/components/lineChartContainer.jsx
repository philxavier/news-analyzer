import React, { Component } from "react";
import { graphql } from "react-apollo";
import LineChart from "./lineChart";
import { Loader } from "semantic-ui-react";
import { getArticlesQuery } from "../queries/queries";

const lineChartContainer = (props) => {
  const displaydata = () => {
    return (
      <div className="lineChart-container">
        {props.data.loading ? (
          <Loader active inline="centered" />
        ) : (
          <LineChart data={props.data} />
        )}
      </div>
    );
  };

  return displaydata();
};

export default graphql(getArticlesQuery)(lineChartContainer);
