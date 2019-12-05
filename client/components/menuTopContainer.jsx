import React, { Component } from "react";
import { addArticlesMutation, getArticlesQuery } from "../queries/queries";
import { graphql, Mutation } from "react-apollo";
import { flowRight as compose } from "lodash";
import MenuTop from "./menuTop";

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
        }
        // refetchQueries: [{ query: await getArticlesQuery }]
      });
    } catch (err) {
      console.log("this is the error", err);
    }

    this.setState({ loading: false });
    this.props.stopSpinner();
  };

  render() {
    return (
      <div style={{ marginBottom: "2%", width: "100%" }}>
        <MenuTop
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
