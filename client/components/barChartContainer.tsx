import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getTagsQuery } from "../queries/queries";
import { Loader } from "semantic-ui-react";
import BarChart from "./barChart";

const barChartContainer = (props) => {
  const displaydata = () => {
    return (
      <div className="barChart-container">
        {props.data.loading ? (
          <Loader active inline="centered" />
        ) : (
          <BarChart data={props.data.tags} />
        )}
      </div>
    );
  };

  return displaydata();
};

export default graphql(getTagsQuery)(barChartContainer);
