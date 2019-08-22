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

  submit = url => {
    this.setState({ loading: true });

    this.props
      .addArticlesMutation({
        variables: {
          url: url
        },
        refetchQueries: [{ query: getArticlesQuery }]
      })
      .then(res => {
        console.log(`Operation Successful!`);
        console.log(res);
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(`Operation Not Successful!`);
        this.setState({ loading: false, error: error.message });
      });
  };

  render() {
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
