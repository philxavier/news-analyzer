import React, { Component } from "react";
import { addArticlesMutation, getArticlesQuery } from "../queries/queries";
import { graphql, Mutation } from "react-apollo";
import { flowRight as compose } from "lodash";
import MenuTop2 from "./menuTop2";

class MenuTopContainer extends Component {
  state = {
    loading: false,
    error: null
  };

  submit = async url => {
    this.props.startSpinner();
    this.setState({ loading: true });
    try {
      await this.props.addArticlesMutation({
        variables: {
          url: url
        },
        refetchQueries: [{ query: await getArticlesQuery }]
      });
    } catch (err) {
      console.log("this is the error", err);
    }

    this.setState({ loading: false });
    this.props.stopSpinner();
  };

  render() {
    console.log("menuTopContainer ok");

    return (
      <div style={{ marginBottom: "2%" }}>
        <MenuTop2
          submit={this.submit}
          loading={this.state.loading}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default compose(
  graphql(getArticlesQuery, { name: "getArticlesQuery" }),
  graphql(addArticlesMutation, { name: "addArticlesMutation" })
)(MenuTopContainer);
