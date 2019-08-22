import React, { Component } from "react";
import { addArticlesMutation, getArticlesQuery } from "../queries/queries";
import { graphql, Mutation } from "react-apollo";
import { flowRight as compose } from "lodash";
import { Menu, Header, Loader, Input } from "semantic-ui-react";

class MenuTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // <Mutation mutation={ADD_TODO}>
    //   {(mutation, { data }) => (
    //     <div>
    //       <form
    //         onSubmit={e => {
    //           e.preventDefault();
    //           mutation({ variables: { type: input.value } });
    //           input.value = "";
    //         }}
    //       >
    //         <input
    //           ref={node => {
    //             input = node;
    //           }}
    //         />
    //         <button type="submit">Add Todo</button>
    //       </form>
    //     </div>
    //   )}
    // </Mutation>;

    var url = this.state.searchTerm;
    this.props
      .addArticlesMutation({
        variables: {
          url: url
        },
        refetchQueries: [{ query: getArticlesQuery }]
      })
      .then(() => {
        console.log("uouuuuuuuuuuuu");
        this.setState({
          searchTerm: ""
        });
      });
  }

  handleChange(e) {
    var url = e.target.value;
    console.log(url);
    this.setState({
      searchTerm: url
    });
  }

  render() {
    console.log(this.props);
    return (
      <Menu>
        <div style={{ top: "50%", marginTop: "5px" }}>
          <Header as="h2" floated="right">
            Brazil according to
          </Header>
        </div>
        <div style={{ marginTop: "3px" }}>
          <img
            src="https://news-analyzer.s3-us-west-2.amazonaws.com/cnn+logo.png"
            alt=""
            width="80px"
            height="40px"
          />
        </div>

        <Menu.Item position="right">
          {this.props.addArticlesMutationResult.loading ? (
            "hello there"
          ) : (
            <Input
              value={this.state.searchTerm}
              action={{
                onClick: this.handleClick,
                content: "Add Article"
              }}
              placeholder="insert URL"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

export default compose(
  graphql(getArticlesQuery, { name: "getArticlesQuery" }),
  graphql(addArticlesMutation, { name: "addArticlesMutation" })
)(MenuTop);
